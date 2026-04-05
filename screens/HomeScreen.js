import { useState } from 'react';
import {
  FlatList,
  Modal,
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
  const [mpokeajiKiasi, setMpokeajiKiasi] = useState('');
  const [kutoka, setKutoka] = useState('EUR');
  const [kwenda, setKwenda] = useState('TZS');
  const [modalWazi, setModalWazi] = useState(false);
  const [modalAina, setModalAina] = useState('kutoka');

  function hesabu(k) {
    const nambari = parseFloat(k) || 0;
    const katikaDola = nambari / viwango[kutoka];
    const matokeo = katikaDola * viwango[kwenda];
    return matokeo % 1 === 0 ? matokeo.toString() : matokeo.toFixed(2);
  }

  function hesabuKutoka(k) {
    const nambari = parseFloat(k) || 0;
    const katikaDola = nambari / viwango[kwenda];
    const matokeo = katikaDola * viwango[kutoka];
    return matokeo % 1 === 0 ? matokeo.toString() : matokeo.toFixed(2);
  }

  function badilishaKiasi(thamani) {
    setKiasi(thamani);
    setMpokeajiKiasi('');
  }

  function badilishaMpokeaji(thamani) {
    setMpokeajiKiasi(thamani);
    setKiasi('');
  }

  const kiwango = (viwango[kwenda] / viwango[kutoka]).toFixed(4);

  const inayoonyeshwa = mpokeajiKiasi ? mpokeajiKiasi : hesabu(kiasi);
  const inatumwa = kiasi ? kiasi : hesabuKutoka(mpokeajiKiasi);

  function fungaModal(aina) {
    setModalAina(aina);
    setModalWazi(true);
  }

  function chaguaSarafu(sarafu) {
    if (modalAina === 'kutoka') {
      setKutoka(sarafu);
    } else {
      setKwenda(sarafu);
    }
    setModalWazi(false);
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#880e4f" />

      {/* Currency Modal */}
      <Modal
        visible={modalWazi}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalWazi(false)}
      >
        <View style={styles.modalBg}>
          <View style={styles.modalKadi}>
            <Text style={styles.modalKichwa}>
              {modalAina === 'kutoka' ? 'Select send currency' : 'Select receive currency'}
            </Text>
            <FlatList
              data={Object.keys(viwango)}
              keyExtractor={(item) => item}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => chaguaSarafu(item)}
                >
                  <Text style={styles.modalBendera}>{bendera[item]}</Text>
                  <Text style={styles.modalSarafu}>{item}</Text>
                  <Text style={styles.modalKiwango}>
                    1 USD = {viwango[item]} {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalFunga}
              onPress={() => setModalWazi(false)}
            >
              <Text style={styles.modalFungaManeno}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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

          {/* You send */}
          <Text style={styles.lebo}>You send</Text>
          <View style={styles.inputSafu}>
            <TouchableOpacity
              style={styles.sarafuBox}
              onPress={() => fungaModal('kutoka')}
            >
              <Text style={styles.bendera}>{bendera[kutoka]}</Text>
              <Text style={styles.sarafuJina}>{kutoka}</Text>
              <Text style={styles.chevron}>▾</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.ingizo}
              value={inatumwa}
              onChangeText={badilishaKiasi}
              keyboardType="numeric"
              placeholderTextColor="rgba(255,255,255,0.5)"
              placeholder="0"
            />
          </View>

          {/* Exchange rate */}
          <View style={styles.kiwangoSafu}>
            <Text style={styles.kiwangoManeno}>
              1 {kutoka} = {kiwango} {kwenda}
            </Text>
          </View>

          {/* They receive */}
          <Text style={styles.lebo}>They receive</Text>
          <View style={styles.inputSafu}>
            <TouchableOpacity
              style={styles.sarafuBox}
              onPress={() => fungaModal('kwenda')}
            >
              <Text style={styles.bendera}>{bendera[kwenda]}</Text>
              <Text style={styles.sarafuJina}>{kwenda}</Text>
              <Text style={styles.chevron}>▾</Text>
            </TouchableOpacity>
            <TextInput
              style={[styles.ingizo, styles.ingizoMatokeo]}
              value={inayoonyeshwa}
              onChangeText={badilishaMpokeaji}
              keyboardType="numeric"
              placeholderTextColor="rgba(255,255,255,0.5)"
              placeholder="0"
            />
          </View>

          {/* Send Button */}
          <TouchableOpacity
            style={styles.sendKitufe}
            onPress={() => navigation.navigate('Recipient', {
              kiasi: kiasi || hesabuKutoka(mpokeajiKiasi),
              kutoka: kutoka,
              kwenda: kwenda,
              mpokeaji: inayoonyeshwa,
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
  chevron: {
    color: 'white',
    fontSize: 12,
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
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalKadi: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  modalKichwa: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#880e4f',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    gap: 12,
  },
  modalBendera: {
    fontSize: 24,
  },
  modalSarafu: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    flex: 1,
  },
  modalKiwango: {
    fontSize: 13,
    color: '#888',
  },
  modalFunga: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  modalFungaManeno: {
    color: '#880e4f',
    fontWeight: 'bold',
    fontSize: 16,
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