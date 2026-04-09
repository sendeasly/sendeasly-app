import { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const mifumo = [
  {
    id: 1,
    jina: 'M-Pesa',
    maelezo: 'Safaricom mobile money',
    nchi: '🇰🇪 Kenya',
    rangi: '#00a651',
    icon: '📱',
  },
  {
    id: 2,
    jina: 'Tigo Pesa',
    maelezo: 'Tigo mobile money',
    nchi: '🇹🇿 Tanzania',
    rangi: '#0066cc',
    icon: '📱',
  },
  {
    id: 3,
    jina: 'Airtel Money',
    maelezo: 'Airtel mobile money',
    nchi: '🇹🇿 Tanzania / 🇰🇪 Kenya',
    rangi: '#ff0000',
    icon: '📱',
  },
  {
    id: 4,
    jina: 'MTN Mobile Money',
    maelezo: 'MTN mobile money',
    nchi: '🇺🇬 Uganda / 🇬🇭 Ghana',
    rangi: '#ffcc00',
    icon: '📱',
  },
  {
    id: 5,
    jina: 'Bank Transfer',
    maelezo: 'Direct bank transfer',
    nchi: '🌍 Worldwide',
    rangi: '#4f46e5',
    icon: '🏦',
  },
  {
    id: 6,
    jina: 'Visa / Mastercard',
    maelezo: 'Debit or credit card',
    nchi: '🌍 Worldwide',
    rangi: '#1a1a2e',
    icon: '💳',
  },
  {
    id: 7,
    jina: 'Vodacom M-Pesa',
    maelezo: 'Vodacom mobile money',
    nchi: '🇹🇿 Tanzania',
    rangi: '#e60000',
    icon: '📱',
  },
  {
    id: 8,
    jina: 'Halopesa',
    maelezo: 'Halotel mobile money',
    nchi: '🇹🇿 Tanzania',
    rangi: '#ff6600',
    icon: '📱',
  },
];

export default function PaymentMethodScreen({ navigation, route }) {
  const [chaguliwa, setChaguliwa] = useState(null);
  const { kiasi, kutoka, kwenda, mpokeaji, mpokeajiJina, mpokeajiNchi, mpokeajiBendera, mpokeajiSimu } = route.params || {};

  function endelea() {
    if (!chaguliwa) return;
    navigation.navigate('TransferStatus', {
      kiasi,
      kutoka,
      kwenda,
      mpokeaji,
      mpokeajiJina,
      mpokeajiNchi,
      mpokeajiBendera,
      mpokeajiSimu,
      mfumo: chaguliwa.jina,
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#880e4f" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.rudiKitufe}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.rudiManeno}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Method</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>

        <Text style={styles.maelezo}>
          Choose how you want to send money
        </Text>

        {/* Mifumo ya Malipo */}
        {mifumo.map((mfumo) => (
          <TouchableOpacity
            key={mfumo.id}
            style={[
              styles.mfumoKadi,
              chaguliwa?.id === mfumo.id && styles.mfumoChaguliwa,
            ]}
            onPress={() => setChaguliwa(mfumo)}
          >
            <View style={[styles.mfumoIcon, {backgroundColor: mfumo.rangi + '30'}]}>
              <Text style={styles.mfumoEmoji}>{mfumo.icon}</Text>
            </View>
            <View style={styles.mfumoMaelezo}>
              <Text style={styles.mfumoJina}>{mfumo.jina}</Text>
              <Text style={styles.mfumoMaelezoText}>{mfumo.maelezo}</Text>
              <Text style={styles.mfumoNchi}>{mfumo.nchi}</Text>
            </View>
            <View style={[
              styles.chaguoIcon,
              chaguliwa?.id === mfumo.id && styles.chaguoIconChaguliwa,
            ]}>
              {chaguliwa?.id === mfumo.id && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>

      {/* Continue Button */}
      <View style={styles.chiniSehemu}>
        <TouchableOpacity
          style={[styles.endelea, !chaguliwa && styles.endelearDisabled]}
          onPress={endelea}
          disabled={!chaguliwa}
        >
          <Text style={styles.endelezaManeno}>
            {chaguliwa ? `Pay with ${chaguliwa.jina}` : 'Select payment method'}
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#880e4f',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 50,
  },
  rudiKitufe: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rudiManeno: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scroll: {
    padding: 16,
    paddingBottom: 100,
  },
  maelezo: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  mfumoKadi: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    gap: 12,
  },
  mfumoChaguliwa: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderColor: 'white',
  },
  mfumoIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mfumoEmoji: {
    fontSize: 24,
  },
  mfumoMaelezo: {
    flex: 1,
  },
  mfumoJina: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  mfumoMaelezoText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    marginBottom: 2,
  },
  mfumoNchi: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11,
  },
  chaguoIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chaguoIconChaguliwa: {
    backgroundColor: 'white',
    borderColor: 'white',
  },
  checkmark: {
    color: '#880e4f',
    fontSize: 14,
    fontWeight: 'bold',
  },
  chiniSehemu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#880e4f',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  endelea: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
  },
  endelearDisabled: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  endelezaManeno: {
    color: '#880e4f',
    fontWeight: 'bold',
    fontSize: 16,
  },
});