import { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const wapokeaji = [
  { id: '1', jina: 'John Doe', nchi: 'Tanzania', bendera: '🇹🇿', simu: '+255 712 345 678' },
  { id: '2', jina: 'Mary Smith', nchi: 'Kenya', bendera: '🇰🇪', simu: '+254 701 234 567' },
  { id: '3', jina: 'Ali Hassan', nchi: 'Uganda', bendera: '🇺🇬', simu: '+256 772 345 678' },
  { id: '4', jina: 'Fatima Omar', nchi: 'UK', bendera: '🇬🇧', simu: '+44 7911 123456' },
  { id: '5', jina: 'David Brown', nchi: 'USA', bendera: '🇺🇸', simu: '+1 555 234 5678' },
  { id: '6', jina: 'Amina Said', nchi: 'UAE', bendera: '🇦🇪', simu: '+971 50 123 4567' },
];

export default function RecipientScreen({ navigation, route }) {
  const [tafuta, setTafuta] = useState('');
  const { kiasi, kutoka, kwenda, mpokeaji } = route.params || {};

  const waliochujwa = wapokeaji.filter(
    (m) =>
      m.jina.toLowerCase().includes(tafuta.toLowerCase()) ||
      m.nchi.toLowerCase().includes(tafuta.toLowerCase())
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

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.rudi}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.kichwa}>Choose recipient</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.tafutaSehemu}>
        <Text style={styles.tafutaIcon}>🔍</Text>
        <TextInput
          style={styles.tafutaIngizo}
          placeholder="Search by name or country..."
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

      {/* Orodha ya Wapokeaji */}
      <Text style={styles.orodhaKichwa}>Recent recipients</Text>

      <FlatList
        data={waliochujwa}
        keyExtractor={(item) => item.id}
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
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 50,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rudi: {
    color: '#c2185b',
    fontSize: 16,
    fontWeight: '600',
    width: 60,
  },
  kichwa: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  tafutaSehemu: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#f8bbd0',
  },
  tafutaIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  tafutaIngizo: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
  },
  futa: {
    fontSize: 16,
    color: '#888',
    padding: 4,
  },
  ongezaKitufe: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fce4ec',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f8bbd0',
    borderStyle: 'dashed',
  },
  ongezaIcon: {
    fontSize: 24,
    color: '#c2185b',
    marginRight: 12,
    fontWeight: 'bold',
  },
  ongezaManeno: {
    fontSize: 16,
    color: '#c2185b',
    fontWeight: '600',
  },
  orodhaKichwa: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    marginHorizontal: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  mpokeajiKadi: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    padding: 16,
  },
  avatarSehemu: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fce4ec',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bendera: {
    fontSize: 24,
  },
  maelezo: {
    flex: 1,
  },
  jinaManeno: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  nchiManeno: {
    fontSize: 14,
    color: '#888',
  },
  mshale: {
    fontSize: 24,
    color: '#c2185b',
  },
  tupu: {
    alignItems: 'center',
    padding: 40,
  },
  tupuManeno: {
    fontSize: 16,
    color: '#888',
  },
});