import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const countryCode = {
  TZS: { code: '+255', bendera: '🇹🇿', jina: 'Tanzania' },
  KES: { code: '+254', bendera: '🇰🇪', jina: 'Kenya' },
  UGX: { code: '+256', bendera: '🇺🇬', jina: 'Uganda' },
  GHS: { code: '+233', bendera: '🇬🇭', jina: 'Ghana' },
  NGN: { code: '+234', bendera: '🇳🇬', jina: 'Nigeria' },
  ZAR: { code: '+27', bendera: '🇿🇦', jina: 'South Africa' },
  USD: { code: '+1', bendera: '🇺🇸', jina: 'USA' },
  EUR: { code: '+49', bendera: '🇪🇺', jina: 'Europe' },
  GBP: { code: '+44', bendera: '🇬🇧', jina: 'UK' },
  CAD: { code: '+1', bendera: '🇨🇦', jina: 'Canada' },
  AED: { code: '+971', bendera: '🇦🇪', jina: 'UAE' },
};

export default function RecipientDetailsScreen({ navigation, route }) {
  const { kiasi, kutoka, kwenda, mpokeaji, mfumo } = route.params || {};
  const [simu, setSimu] = useState('');
  const [inaCheck, setInaCheck] = useState(false);
  const [details, setDetails] = useState(null);

  const nchiInfo = countryCode[kwenda] || { code: '+255', bendera: '🌍', jina: 'Unknown' };

  async function checkDetails() {
    if (!simu || simu.length < 6) {
      Alert.alert('Error', 'Please enter a valid phone number!');
      return;
    }

    setInaCheck(true);
    setDetails(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      setDetails({
        jina: 'John ' + simu.slice(-3),
        simu: nchiInfo.code + ' ' + simu,
        mtandao: mfumo.jina,
        nchi: nchiInfo.jina,
        bendera: nchiInfo.bendera,
        hali: 'Active',
      });
    } catch (e) {
      Alert.alert('Error', 'Could not verify number!');
    }

    setInaCheck(false);
  }

  function endelea() {
    if (!details) return;
    navigation.navigate('ConfirmTransfer', {
      kiasi,
      kutoka,
      kwenda,
      mpokeaji,
      mfumo,
      mpokeajiJina: details.jina,
      mpokeajiSimu: details.simu,
      mpokeajiNchi: details.nchi,
      mpokeajiBendera: details.bendera,
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#880e4f" />

      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.rudiKitufe} onPress={() => navigation.goBack()}>
            <Text style={styles.rudiManeno}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Recipient Details</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Mfumo wa Malipo */}
        <View style={styles.mfumoKadi}>
          <Text style={styles.mfumoEmoji}>{mfumo?.icon}</Text>
          <View>
            <Text style={styles.mfumoJina}>{mfumo?.jina}</Text>
            <Text style={styles.mfumoMaelezo}>{mfumo?.maelezo}</Text>
          </View>
        </View>

        {/* Phone Number Input */}
        <Text style={styles.lebo}>Recipient phone number</Text>
        <View style={styles.simuWrapper}>
          <View style={styles.countryCode}>
            <Text style={styles.bendera}>{nchiInfo.bendera}</Text>
            <Text style={styles.codeManeno}>{nchiInfo.code}</Text>
          </View>
          <View style={styles.separator} />
          <TextInput
            style={styles.simuIngizo}
            placeholder="Phone number"
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={simu}
            onChangeText={setSimu}
            keyboardType="phone-pad"
            maxLength={12}
          />
        </View>

        {/* Check Button */}
        <TouchableOpacity
          style={[styles.checkKitufe, inaCheck && styles.kitufeDisabled]}
          onPress={checkDetails}
          disabled={inaCheck}
        >
          {inaCheck ? (
            <ActivityIndicator color="#880e4f" />
          ) : (
            <Text style={styles.checkManeno}>CHECK DETAILS</Text>
          )}
        </TouchableOpacity>

        {/* Details */}
        {details && (
          <View style={styles.detailsKadi}>
            <Text style={styles.detailsKichwa}>Recipient verified</Text>

            <View style={styles.recipientInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarEmoji}>{details.bendera}</Text>
              </View>
              <View>
                <Text style={styles.recipientJina}>{details.jina}</Text>
                <Text style={styles.recipientSimu}>{details.simu}</Text>
              </View>
              <View style={styles.haliBadge}>
                <Text style={styles.haliManeno}>✓ Active</Text>
              </View>
            </View>

            <View style={styles.detailsMstari}>
              <Text style={styles.detailsLebo}>Network</Text>
              <Text style={styles.detailsThamani}>{details.mtandao}</Text>
            </View>
            <View style={styles.detailsMstari}>
              <Text style={styles.detailsLebo}>Country</Text>
              <Text style={styles.detailsThamani}>{details.nchi}</Text>
            </View>

            <TouchableOpacity style={styles.endelea} onPress={endelea}>
              <Text style={styles.endelezaManeno}>Confirm & Continue</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#880e4f' },
  scroll: { flexGrow: 1, padding: 20, paddingTop: 0, paddingBottom: 40 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingTop: 50,
  },
  rudiKitufe: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  rudiManeno: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  mfumoKadi: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  mfumoEmoji: { fontSize: 28 },
  mfumoJina: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  mfumoMaelezo: { color: 'rgba(255,255,255,0.6)', fontSize: 13 },
  lebo: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  simuWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    marginBottom: 16,
    overflow: 'hidden',
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  bendera: { fontSize: 20 },
  codeManeno: { color: 'white', fontSize: 16, fontWeight: '600' },
  separator: { width: 1, height: '100%', backgroundColor: 'rgba(255,255,255,0.2)' },
  simuIngizo: {
    flex: 1,
    color: 'white',
    fontSize: 18,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontWeight: '600',
  },
  checkKitufe: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  kitufeDisabled: { opacity: 0.7 },
  checkManeno: { color: '#880e4f', fontWeight: 'bold', fontSize: 15, letterSpacing: 1 },
  detailsKadi: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  detailsKichwa: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  recipientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  avatar: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 26 },
  recipientJina: { color: 'white', fontSize: 17, fontWeight: 'bold', marginBottom: 4 },
  recipientSimu: { color: 'rgba(255,255,255,0.6)', fontSize: 13 },
  haliBadge: {
    marginLeft: 'auto',
    backgroundColor: 'rgba(107,255,107,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  haliManeno: { color: '#6bff6b', fontSize: 12, fontWeight: '600' },
  detailsMstari: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  detailsLebo: { color: 'rgba(255,255,255,0.6)', fontSize: 14 },
  detailsThamani: { color: 'white', fontSize: 14, fontWeight: '600' },
  endelea: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  endelezaManeno: { color: '#880e4f', fontWeight: 'bold', fontSize: 16 },
});