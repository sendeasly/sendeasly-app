import * as Contacts from 'expo-contacts';
import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const wapokeajiDefault = [
  { id: '1', jina: 'John Doe', nchi: 'Tanzania', bendera: '🇹🇿', simu: '+255 712 345 678' },
  { id: '2', jina: 'Mary Smith', nchi: 'Kenya', bendera: '🇰🇪', simu: '+254 701 234 567' },
  { id: '3', jina: 'Ali Hassan', nchi: 'Uganda', bendera: '🇺🇬', simu: '+256 772 345 678' },
  { id: '4', jina: 'Fatima Omar', nchi: 'UK', bendera: '🇬🇧', simu: '+44 7911 123456' },
  { id: '5', jina: 'David Brown', nchi: 'USA', bendera: '🇺🇸', simu: '+1 555 234 5678' },
];

export default function RecipientScreen({ navigation, route }) {
  const [tafuta, setTafuta] = useState('');
  const [contacts, setContacts] = useState([]);
  const [inaLoad, setInaLoad] = useState(false);
  const { kiasi, kutoka, kwenda, mpokeaji } = route.params || {};

  useEffect(() => {
    pataContacts();
  }, []);

  async function pataContacts() {
    setInaLoad(true);
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });
        if (data.length > 0) {
          const formatted = data
            .filter(c => c.name && c.phoneNumbers && c.phoneNumbers.length > 0)
            .map((c, index) => ({
              id: 'contact_' + index,
              jina: c.name,
              nchi: 'Contact',
              bendera: '📱',
              simu: c.phoneNumbers[0].number,
            }));
          setContacts(formatted);
        } else {
          setContacts(wapokeajiDefault);
        }
      } else {
        Alert.alert('Permission denied', 'Using default recipients');
        setContacts(wapokeajiDefault);
      }
    } catch (e) {
      setContacts(wapokeajiDefault);
    }
    setInaLoad(false);
  }

  const wapokeaji = contacts.length > 0 ? contacts : wapokeajiDefault;

  const waliochujwa = wapokeaji.filter(
    (m) =>
      m.jina.toLowerCase().includes(tafuta.toLowerCase()) ||
      m.nchi.toLowerCase().includes(tafuta.toLowerCase()) ||
      m.simu.includes(tafuta)
  );

  function chagua(mtu) {
    navigation.navigate('Confirm', {
      kiasi,
      kutoka,
      kwenda,
      mpokeaji,
      mpokeajiJina: mtu.jina,
      mpokeajiNchi: mtu.nchi,
      mpokeajiBendera: mtu.bendera,
      mpokeajiSimu: mtu.simu,
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
        <Text style={styles.kichwa}>Choose recipient</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.tafutaSehemu}>
        <Text style={styles.tafutaIcon}>🔍</Text>
        <TextInput
          style={styles.tafutaIngizo}
          placeholder="Search by name or number..."
          placeholderTextColor="rgba(255,255,255,0.4)"
          value={tafuta}
          onChangeText={setTafuta}
          autoCapitalize="none"
        />
        {tafuta.length > 0 && (
          <TouchableOpacity onPress={() => setTafuta('')}>
            <Text style={styles.futa}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Ongeza Mpya */}
      <TouchableOpacity style={styles.ongezaKitufe}>
        <Text style={styles.ongezaIcon}>+</Text>
        <Text style={styles.ongezaManeno}>Add new recipient</Text>
      </TouchableOpacity>

      <Text style={styles.orodhaKichwa}>
        {inaLoad ? 'Loading contacts...' : 'Recent recipients'}
      </Text>

      <FlatList
        data={waliochujwa}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.orodha}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.mpokeajiKadi}
            onPress={() => chagua(item)}
          >
            <View style={styles.avatarSehemu}>
              <Text style={styles.bendera}>{item.bendera}</Text>
            </View>
            <View style={styles.maelezo}>
              <Text style={styles.jinaManeno}>{item.jina}</Text>
              <Text style={styles.nchiManeno}>{item.nchi} • {item.simu}</Text>
            </View>
            <Text style={styles.mshale}>›</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.tupu}>
            <Text style={styles.tupuManeno}>No recipients found</Text>
          </View>
        }
      />
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
  kichwa: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  tafutaSehemu: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginHorizontal: 16,
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  tafutaIcon: { fontSize: 16, marginRight: 8 },
  tafutaIngizo: { flex: 1, fontSize: 16, color: 'white' },
  futa: { fontSize: 16, color: 'rgba(255,255,255,0.6)', padding: 4 },
  ongezaKitufe: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderStyle: 'dashed',
  },
  ongezaIcon: { fontSize: 24, color: 'white', marginRight: 12, fontWeight: 'bold' },
  ongezaManeno: { fontSize: 16, color: 'white', fontWeight: '600' },
  orodhaKichwa: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
    marginHorizontal: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  orodha: { paddingHorizontal: 16, paddingBottom: 20 },
  mpokeajiKadi: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  avatarSehemu: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
    marginRight: 12,
  },
  bendera: { fontSize: 24 },
  maelezo: { flex: 1 },
  jinaManeno: { fontSize: 16, fontWeight: '600', color: 'white', marginBottom: 4 },
  nchiManeno: { fontSize: 14, color: 'rgba(255,255,255,0.6)' },
  mshale: { fontSize: 24, color: 'rgba(255,255,255,0.5)' },
  tupu: { alignItems: 'center', padding: 40 },
  tupuManeno: { fontSize: 16, color: 'rgba(255,255,255,0.5)' },
});