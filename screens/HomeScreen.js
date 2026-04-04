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

export default function HomeScreen() {
  const [kiasi, setKiasi] = useState('1');
  const [kutoka, setKutoka] = useState('EUR');
  const [kwenda, setKwenda] = useState('TZS');

  function hesabu() {
    const nambari = parseFloat(kiasi) || 0;
    const katikaDola = nambari / viwango[kutoka];
    return (katikaDola * viwango[kwenda]).toFixed(2);
  }

  const kiwango = (viwango[kwenda] / viwango[kutoka]).toFixed(2);

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>SE</Text>
        </View>
        <TouchableOpacity style={styles.bonusKitufe}>
          <Text style={styles.bonusManeno}>€5 🎁</Text>
        </TouchableOpacity>
      </View>

      {/* Calculator */}
      <View style={styles.calculator}>

        {/* Sarafu */}
        <View style={styles.sarafu}>
          <View style={styles.sarafuMoja}>
            <Text style={styles.bendera}>🇩🇪</Text>
            <Text style={styles.sarafuJina}>{kutoka}</Text>
          </View>
          <Text style={styles.mshale}>⇄</Text>
          <View style={styles.sarafuMoja}>
            <Text style={styles.bendera}>🇹🇿</Text>
            <Text style={styles.sarafuJina}>{kwenda}</Text>
          </View>
        </View>

        {/* Ingizo */}
        <View style={styles.maingizo}>
          <TextInput
            style={styles.ingizo}
            value={kiasi}
            onChangeText={setKiasi}
            keyboardType="numeric"
            placeholder="0"
          />
          <Text style={styles.mshaleKati}>⇄</Text>
          <TextInput
            style={styles.ingizo}
            value={hesabu()}
            editable={false}
            placeholder="0"
          />
        </View>

        {/* Kiwango */}
        <Text style={styles.kiwango}>
          €1.00 = TZS {kiwango}
        </Text>

        {/* Send Button */}
        <TouchableOpacity style={styles.sendKitufe}>
          <Text style={styles.sendManeno}>SEND</Text>
        </TouchableOpacity>

      </View>

      {/* Wallet */}
      <View style={styles.sehemu}>
        <View style={styles.walletKichwa}>
          <Text style={styles.sehemuKichwa}>Wallet</Text>
          <Text style={styles.swali}>?</Text>
        </View>

        <TouchableOpacity style={styles.ongezaKitufe}>
          <Text style={styles.ongezaManeno}>+ Add money</Text>
        </TouchableOpacity>

        <View style={styles.walletKadi}>
          <View style={styles.walletMoja}>
            <Text style={styles.bendera}>🇪🇺</Text>
            <Text style={styles.walletSarafu}>EUR</Text>
            <Text style={styles.walletKiasi}>0.00</Text>
          </View>
          <TouchableOpacity style={styles.walletOngeza}>
            <Text style={styles.walletOngezaManeno}>+</Text>
            <Text style={styles.walletOngezaManeno}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Activity */}
      <View style={styles.sehemu}>
        <View style={styles.activityKichwa}>
          <Text style={styles.sehemuKichwa}>Activity</Text>
          <Text style={styles.hide}>Hide</Text>
        </View>
        <Text style={styles.tupu}>No recent activity</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#c2185b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bonusKitufe: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bonusManeno: {
    color: '#c2185b',
    fontWeight: '600',
  },
  calculator: {
    backgroundColor: '#f8cce2',
    margin: 16,
    borderRadius: 16,
    padding: 20,
  },
  sarafu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sarafuMoja: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bendera: {
    fontSize: 24,
  },
  sarafuJina: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  mshale: {
    fontSize: 20,
    color: '#c2185b',
  },
  maingizo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  ingizo: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    fontSize: 24,
    textAlign: 'center',
  },
  mshaleKati: {
    fontSize: 20,
    color: '#c2185b',
  },
  kiwango: {
    color: '#c2185b',
    fontWeight: '600',
    marginBottom: 16,
    fontSize: 15,
  },
  sendKitufe: {
    backgroundColor: '#c70347',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
  },
  sendManeno: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 2,
  },
  sehemu: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 16,
    padding: 20,
  },
  walletKichwa: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sehemuKichwa: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#c2185b',
  },
  swali: {
    backgroundColor: '#c2185b',
    color: 'white',
    width: 20,
    height: 20,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 12,
  },
  ongezaKitufe: {
    backgroundColor: '#f8c6d8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  ongezaManeno: {
    color: '#c2185b',
    fontWeight: '600',
  },
  walletKadi: {
    flexDirection: 'row',
    gap: 12,
  },
  walletMoja: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
  },
  walletSarafu: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  walletKiasi: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 8,
  },
  walletOngeza: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  walletOngezaManeno: {
    fontSize: 18,
    color: '#555',
  },
  activityKichwa: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  hide: {
    color: '#c2185b',
    fontWeight: '600',
  },
  tupu: {
    color: '#888',
    textAlign: 'center',
    padding: 20,
  },
});