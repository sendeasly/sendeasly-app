import { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const viwango = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  TZS: 2578,
  KES: 129,
  UGX: 3780,
  ZAR: 18.5,
  CAD: 1.36,
  AED: 3.67,
};

const bendera = {
  USD: '🇺🇸',
  EUR: '🇪🇺',
  GBP: '🇬🇧',
  TZS: '🇹🇿',
  KES: '🇰🇪',
  UGX: '🇺🇬',
  ZAR: '🇿🇦',
  CAD: '🇨🇦',
  AED: '🇦🇪',
};

export default function HomeScreen({ navigation }) {
  const [kiasi, setKiasi] = useState('1000');
  const [kutoka, setKutoka] = useState('EUR');
  const [kwenda, setKwenda] = useState('TZS');

  function hesabu() {
    const nambari = parseFloat(kiasi) || 0;
    const katikaDola = nambari / viwango[kutoka];
    return (katikaDola * viwango[kwenda]).toLocaleString('en-US', {maximumFractionDigits: 0});
  }

  const kiwango = (viwango[kwenda] / viwango[kutoka]).toFixed(2);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#880e4f" />

      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.avatar}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.avatarText}>SE</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Send Money</Text>
          <TouchableOpacity style={styles.bonusKitufe}>
            <Text style={styles.bonusManeno}>€5 🎁</Text>
          </TouchableOpacity>
        </View>

        {/* Calculator */}
        <View style={styles.calculator}>

          <Text style={styles.lebo}>You send</Text>
          <View style={styles.inputSafu}>
            <View style={styles.sarafuBox}>
              <Text style={styles.bendera}>{bendera[kutoka]}</Text>
              <Text style={styles.sarafuJina}>{kutoka}</Text>
            </View>
            <TextInput
              style={styles.ingizo}
              value={kiasi}
              onChangeText={setKiasi}
              keyboardType="numeric"
              placeholderTextColor="rgba(255,255,255,0.5)"
            />
          </View>

          <View style={styles.kiwangoSafu}>
            <Text style={styles.kiwangoManeno}>
              1 {kutoka} = {kiwango} {kwenda}
            </Text>
          </View>

          <Text style={styles.lebo}>They receive</Text>
          <View style={styles.inputSafu}>
            <View style={styles.sarafuBox}>
              <Text style={styles.bendera}>{bendera[kwenda]}</Text>
              <Text style={styles.sarafuJina}>{kwenda}</Text>
            </View>
            <TextInput
              style={[styles.ingizo, styles.ingizoMatokeo]}
              value={hesabu()}
              editable={false}
            />
          </View>

          {/* Send Button */}
          <TouchableOpacity
            style={styles.sendKitufe}
            onPress={() => navigation.navigate('Recipient', {
              kiasi: kiasi,
              kutoka: kutoka,
              kwenda: kwenda,
              mpokeaji: hesabu(),
            })}
          >
            <Text style={styles.sendManeno}>SEND</Text>
          </TouchableOpacity>

        </View>

        {/* Wallet */}
        <View style={styles.sehemu}>
          <View style={styles.sehemuHeader}>
            <Text style={styles.sehemuKichwa}>Wallet</Text>
            <TouchableOpacity style={styles.ongezaKitufe}>
              <Text style={styles.ongezaManeno}>+ Add money</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.walletVitufe}>
            <View style={styles.walletKadi}>
              <Text style={styles.bendera}>🇪🇺</Text>
              <Text style={styles.walletSarafu}>EUR</Text>
              <Text style={styles.walletKiasi}>0.00</Text>
            </View>
            <TouchableOpacity style={styles.walletOngeza}>
              <Text style={styles.walletOngezaPlus}>+</Text>
              <Text style={styles.walletOngezaManeno}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Activity */}
        <View style={styles.sehemu}>
          <View style={styles.sehemuHeader}>
            <Text style={styles.sehemuKichwa}>Activity</Text>
            <Text style={styles.hide}>Hide</Text>
          </View>
          <Text style={styles.tupu}>No recent activity</Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#880e4f',
  },
  scroll: {
    flexGrow: 1,
    padding: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bonusKitufe: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  bonusManeno: {
    color: 'white',
    fontWeight: '600',
    fontSize: 13,
  },
  calculator: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  lebo: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputSafu: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  sarafuBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    padding: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  bendera: {
    fontSize: 20,
  },
  sarafuJina: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
  ingizo: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 10,
    padding: 12,
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'right',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  ingizoMatokeo: {
    color: '#f8bbd0',
  },
  kiwangoSafu: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  kiwangoManeno: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: '600',
  },
  sendKitufe: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
  },
  sendManeno: {
    color: '#880e4f',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 2,
  },
  sehemu: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  sehemuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sehemuKichwa: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  ongezaKitufe: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  ongezaManeno: {
    color: 'white',
    fontWeight: '600',
    fontSize: 13,
  },
  walletVitufe: {
    flexDirection: 'row',
    gap: 12,
  },
  walletKadi: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  walletSarafu: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    marginTop: 4,
  },
  walletKiasi: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  walletOngeza: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderStyle: 'dashed',
  },
  walletOngezaPlus: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  walletOngezaManeno: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  hide: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
  },
  tupu: {
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    padding: 20,
  },
});