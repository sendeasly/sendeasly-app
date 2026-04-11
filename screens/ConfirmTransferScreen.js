import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ConfirmTransferScreen({ navigation, route }) {
  const {
    kiasi,
    kutoka,
    kwenda,
    mpokeaji,
    mfumo,
    mpokeajiJina,
    mpokeajiSimu,
    mpokeajiNchi,
    mpokeajiBendera,
  } = route.params || {};

  const [inatuma, setInatuma] = useState(false);

  const ada = (parseFloat(kiasi) * 0.02).toFixed(2);
  const jumla = (parseFloat(kiasi) + parseFloat(ada)).toFixed(2);

  async function thibitisha() {
    setInatuma(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const existing = await AsyncStorage.getItem('historia');
      const historia = existing ? JSON.parse(existing) : [];
      const muamala = {
        kiasi,
        kutoka,
        kwenda,
        mpokeaji,
        mpokeajiJina,
        mpokeajiSimu,
        mpokeajiNchi,
        mpokeajiBendera,
        mfumo: mfumo?.jina,
        tarehe: new Date().toLocaleDateString('en-GB'),
      };
      historia.unshift(muamala);
      await AsyncStorage.setItem('historia', JSON.stringify(historia));

      navigation.navigate('TransferStatus', {
        kiasi,
        kutoka,
        kwenda,
        mpokeaji,
        mpokeajiJina,
        mpokeajiNchi,
        mpokeajiBendera,
        mpokeajiSimu,
        mfumo: mfumo?.jina,
      });
    } catch (e) {
      console.log(e);
    }

    setInatuma(false);
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
          <Text style={styles.headerTitle}>Confirm Transfer</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Mpokeaji */}
        <View style={styles.kadi}>
          <Text style={styles.sectionKichwa}>Sending to</Text>
          <View style={styles.mpokeajiInfo}>
            <View style={styles.avatar}>
              <Text style={styles.bendera}>{mpokeajiBendera}</Text>
            </View>
            <View style={styles.mpokeajiManeno}>
              <Text style={styles.jinaManeno}>{mpokeajiJina}</Text>
              <Text style={styles.nchiManeno}>{mpokeajiNchi} • {mpokeajiSimu}</Text>
            </View>
          </View>
        </View>

        {/* Amount */}
        <View style={styles.kadi}>
          <Text style={styles.sectionKichwa}>Transfer details</Text>

          <View style={styles.mstari}>
            <Text style={styles.mstariLebo}>You send</Text>
            <Text style={styles.mstariThamani}>{kiasi} {kutoka}</Text>
          </View>
          <View style={styles.mgawanyo} />

          <View style={styles.mstari}>
            <Text style={styles.mstariLebo}>Transfer fee (2%)</Text>
            <Text style={styles.mstariThamani}>{ada} {kutoka}</Text>
          </View>
          <View style={styles.mgawanyo} />

          <View style={styles.mstari}>
            <Text style={styles.mstariLebo}>Total you pay</Text>
            <Text style={styles.mstariThamani}>{jumla} {kutoka}</Text>
          </View>
          <View style={styles.mgawanyo} />

          <View style={styles.mstari}>
            <Text style={styles.mstariLebo}>They receive</Text>
            <Text style={[styles.mstariThamani, { color: '#f8bbd0', fontSize: 18 }]}>
              {mpokeaji} {kwenda}
            </Text>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.kadi}>
          <Text style={styles.sectionKichwa}>Payment method</Text>
          <View style={styles.mfumoInfo}>
            <Text style={styles.mfumoEmoji}>{mfumo?.icon}</Text>
            <View>
              <Text style={styles.mfumoJina}>{mfumo?.jina}</Text>
              <Text style={styles.mfumoMaelezo}>{mfumo?.maelezo}</Text>
            </View>
          </View>
        </View>

        {/* Fast */}
        <View style={styles.kasiKadi}>
          <Text style={styles.kasiIcon}>⚡</Text>
          <View>
            <Text style={styles.kasiKichwa}>Fast transfer</Text>
            <Text style={styles.kasiManeno}>Usually arrives within minutes</Text>
          </View>
        </View>

        {/* Buttons */}
        <TouchableOpacity
          style={[styles.kitufe, inatuma && styles.kitufeDisabled]}
          onPress={thibitisha}
          disabled={inatuma}
        >
          <Text style={styles.kitufeManeno}>
            {inatuma ? 'Processing...' : 'Confirm & Send'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelKitufe}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.cancelManeno}>Cancel</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#880e4f' },
  scroll: { flexGrow: 1, paddingBottom: 40 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 50,
  },
  rudiKitufe: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  rudiManeno: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  kadi: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  sectionKichwa: {
    fontSize: 13, fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  mpokeajiInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
    marginRight: 14,
  },
  bendera: { fontSize: 26 },
  mpokeajiManeno: { flex: 1 },
  jinaManeno: { fontSize: 17, fontWeight: '600', color: 'white', marginBottom: 4 },
  nchiManeno: { fontSize: 14, color: 'rgba(255,255,255,0.6)' },
  mstari: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  mstariLebo: { fontSize: 15, color: 'rgba(255,255,255,0.7)' },
  mstariThamani: { fontSize: 15, fontWeight: '600', color: 'white' },
  mgawanyo: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)' },
  mfumoInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  mfumoEmoji: { fontSize: 28 },
  mfumoJina: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  mfumoMaelezo: { color: 'rgba(255,255,255,0.6)', fontSize: 13 },
  kasiKadi: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  kasiIcon: { fontSize: 28 },
  kasiKichwa: { fontSize: 15, fontWeight: '600', color: 'white', marginBottom: 2 },
  kasiManeno: { fontSize: 13, color: 'rgba(255,255,255,0.6)' },
  kitufe: {
    backgroundColor: 'white',
    borderRadius: 30, padding: 18,
    alignItems: 'center',
    marginHorizontal: 16, marginBottom: 12,
  },
  kitufeDisabled: { opacity: 0.7 },
  kitufeManeno: { color: '#880e4f', fontWeight: 'bold', fontSize: 16 },
  cancelKitufe: { alignItems: 'center', padding: 16, marginBottom: 30 },
  cancelManeno: { color: 'rgba(255,255,255,0.6)', fontSize: 15 },
});