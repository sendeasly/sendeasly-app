import { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const mifumoKwaNchi = {
  TZS: [
    { id: 1, jina: 'M-Pesa', maelezo: 'Vodacom Tanzania', icon: '📱', rangi: '#e60000' },
    { id: 2, jina: 'Tigo Pesa', maelezo: 'Tigo Tanzania', icon: '📱', rangi: '#0066cc' },
    { id: 3, jina: 'Airtel Money', maelezo: 'Airtel Tanzania', icon: '📱', rangi: '#ff0000' },
    { id: 4, jina: 'Halopesa', maelezo: 'Halotel Tanzania', icon: '📱', rangi: '#ff6600' },
    { id: 5, jina: 'Bank Transfer', maelezo: 'Direct bank transfer', icon: '🏦', rangi: '#4f46e5' },
  ],
  KES: [
    { id: 1, jina: 'M-Pesa', maelezo: 'Safaricom Kenya', icon: '📱', rangi: '#00a651' },
    { id: 2, jina: 'Airtel Money', maelezo: 'Airtel Kenya', icon: '📱', rangi: '#ff0000' },
    { id: 3, jina: 'Bank Transfer', maelezo: 'Direct bank transfer', icon: '🏦', rangi: '#4f46e5' },
  ],
  UGX: [
    { id: 1, jina: 'MTN Mobile Money', maelezo: 'MTN Uganda', icon: '📱', rangi: '#ffcc00' },
    { id: 2, jina: 'Airtel Money', maelezo: 'Airtel Uganda', icon: '📱', rangi: '#ff0000' },
    { id: 3, jina: 'Bank Transfer', maelezo: 'Direct bank transfer', icon: '🏦', rangi: '#4f46e5' },
  ],
  GHS: [
    { id: 1, jina: 'MTN Mobile Money', maelezo: 'MTN Ghana', icon: '📱', rangi: '#ffcc00' },
    { id: 2, jina: 'Vodafone Cash', maelezo: 'Vodafone Ghana', icon: '📱', rangi: '#e60000' },
    { id: 3, jina: 'AirtelTigo Money', maelezo: 'AirtelTigo Ghana', icon: '📱', rangi: '#ff0000' },
    { id: 4, jina: 'Bank Transfer', maelezo: 'Direct bank transfer', icon: '🏦', rangi: '#4f46e5' },
  ],
  NGN: [
    { id: 1, jina: 'Bank Transfer', maelezo: 'Direct bank transfer', icon: '🏦', rangi: '#4f46e5' },
    { id: 2, jina: 'Opay', maelezo: 'Opay Nigeria', icon: '📱', rangi: '#00c853' },
    { id: 3, jina: 'PalmPay', maelezo: 'PalmPay Nigeria', icon: '📱', rangi: '#0066cc' },
  ],
  ZAR: [
    { id: 1, jina: 'Bank Transfer', maelezo: 'Direct bank transfer', icon: '🏦', rangi: '#4f46e5' },
    { id: 2, jina: 'FNB eWallet', maelezo: 'First National Bank', icon: '💳', rangi: '#00a651' },
  ],
  DEFAULT: [
    { id: 1, jina: 'Bank Transfer', maelezo: 'Direct bank transfer', icon: '🏦', rangi: '#4f46e5' },
    { id: 2, jina: 'Visa / Mastercard', maelezo: 'Debit or credit card', icon: '💳', rangi: '#1a1a2e' },
  ],
};

export default function PaymentMethodScreen({ navigation, route }) {
  const [chaguliwa, setChaguliwa] = useState(null);
  const { kiasi, kutoka, kwenda, mpokeaji } = route.params || {};

  const mifumo = mifumoKwaNchi[kwenda] || mifumoKwaNchi.DEFAULT;

  function endelea() {
    if (!chaguliwa) return;
    navigation.navigate('RecipientDetails', {
      kiasi,
      kutoka,
      kwenda,
      mpokeaji,
      mfumo: chaguliwa,
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#880e4f" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.rudiKitufe} onPress={() => navigation.goBack()}>
          <Text style={styles.rudiManeno}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Method</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>

        <Text style={styles.maelezo}>
          Sending to {kwenda} — choose payment method
        </Text>

        {mifumo.map((mfumo) => (
          <TouchableOpacity
            key={mfumo.id}
            style={[
              styles.mfumoKadi,
              chaguliwa?.id === mfumo.id && styles.mfumoChaguliwa,
            ]}
            onPress={() => setChaguliwa(mfumo)}
          >
            <View style={[styles.mfumoIcon, { backgroundColor: mfumo.rangi + '30' }]}>
              <Text style={styles.mfumoEmoji}>{mfumo.icon}</Text>
            </View>
            <View style={styles.mfumoMaelezo}>
              <Text style={styles.mfumoJina}>{mfumo.jina}</Text>
              <Text style={styles.mfumoMaelezoText}>{mfumo.maelezo}</Text>
            </View>
            <View style={[styles.chaguoIcon, chaguliwa?.id === mfumo.id && styles.chaguoIconChaguliwa]}>
              {chaguliwa?.id === mfumo.id && <Text style={styles.checkmark}>✓</Text>}
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>

      {/* Continue Button */}
      <View style={styles.chiniSehemu}>
        <TouchableOpacity
          style={[styles.endelea, !chaguliwa && styles.endelezaDisabled]}
          onPress={endelea}
          disabled={!chaguliwa}
        >
          <Text style={styles.endelezaManeno}>
            {chaguliwa ? `Continue with ${chaguliwa.jina}` : 'Select payment method'}
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#880e4f' },
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
  scroll: { padding: 16, paddingBottom: 100 },
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
    width: 50, height: 50, borderRadius: 25,
    alignItems: 'center', justifyContent: 'center',
  },
  mfumoEmoji: { fontSize: 24 },
  mfumoMaelezo: { flex: 1 },
  mfumoJina: { color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 2 },
  mfumoMaelezoText: { color: 'rgba(255,255,255,0.6)', fontSize: 12 },
  chaguoIcon: {
    width: 24, height: 24, borderRadius: 12,
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center', justifyContent: 'center',
  },
  chaguoIconChaguliwa: { backgroundColor: 'white', borderColor: 'white' },
  checkmark: { color: '#880e4f', fontSize: 14, fontWeight: 'bold' },
  chiniSehemu: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 20, backgroundColor: '#880e4f',
    borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)',
  },
  endelea: {
    backgroundColor: 'white',
    borderRadius: 30, padding: 16, alignItems: 'center',
  },
  endelezaDisabled: { backgroundColor: 'rgba(255,255,255,0.3)' },
  endelezaManeno: { color: '#880e4f', fontWeight: 'bold', fontSize: 16 },
});