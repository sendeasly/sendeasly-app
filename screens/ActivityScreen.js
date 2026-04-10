import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ActivityScreen() {
  const [historia, setHistoria] = useState([]);

  useEffect(() => {
    pataHistoria();
  }, []);

  async function pataHistoria() {
    try {
      const data = await AsyncStorage.getItem('historia');
      if (data) setHistoria(JSON.parse(data));
    } catch (e) {
      console.log(e);
    }
  }

  async function futaHistoria() {
    await AsyncStorage.removeItem('historia');
    setHistoria([]);
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#880e4f" />

      <ScrollView contentContainerStyle={styles.scroll}>

        <View style={styles.header}>
          <Text style={styles.kichwa}>Activity</Text>
          {historia.length > 0 && (
            <TouchableOpacity onPress={futaHistoria}>
              <Text style={styles.futa}>Clear all</Text>
            </TouchableOpacity>
          )}
        </View>

        {historia.length === 0 ? (
          <View style={styles.tupu}>
            <Text style={styles.tupuEmoji}>📭</Text>
            <Text style={styles.tupuManeno}>No transactions yet</Text>
            <Text style={styles.tupuMaelezo}>
              Your transfer history will appear here
            </Text>
          </View>
        ) : (
          historia.map((m, index) => (
            <View key={index} style={styles.muamala}>
              <View style={styles.muamalaIcon}>
                <Text style={styles.muamalaEmoji}>{m.mpokeajiBendera || '💸'}</Text>
              </View>
              <View style={styles.muamalaMaelezo}>
                <Text style={styles.muamalaJina}>{m.mpokeajiJina || 'Transfer'}</Text>
                <Text style={styles.muamalaTarehe}>{m.tarehe}</Text>
              </View>
              <View style={styles.muamalaKiasi}>
                <Text style={styles.muamalaKiasiManeno}>
                  -{m.kiasi} {m.kutoka}
                </Text>
                <Text style={styles.muamalaMatokeo}>
                  +{m.mpokeaji} {m.kwenda}
                </Text>
                <View style={styles.haliBadge}>
                  <Text style={styles.haliManeno}>✅ Done</Text>
                </View>
              </View>
            </View>
          ))
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#880e4f' },
  scroll: { flexGrow: 1, padding: 20, paddingTop: 50 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  kichwa: { fontSize: 28, fontWeight: 'bold', color: 'white' },
  futa: { color: 'rgba(255,255,255,0.6)', fontSize: 14 },
  tupu: { alignItems: 'center', marginTop: 80 },
  tupuEmoji: { fontSize: 60, marginBottom: 16 },
  tupuManeno: { fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 8 },
  tupuMaelezo: { fontSize: 15, color: 'rgba(255,255,255,0.6)', textAlign: 'center' },
  muamala: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    gap: 12,
  },
  muamalaIcon: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  muamalaEmoji: { fontSize: 24 },
  muamalaMaelezo: { flex: 1 },
  muamalaJina: { color: 'white', fontSize: 16, fontWeight: '600', marginBottom: 4 },
  muamalaTarehe: { color: 'rgba(255,255,255,0.5)', fontSize: 12 },
  muamalaKiasi: { alignItems: 'flex-end' },
  muamalaKiasiManeno: { color: '#ff6b6b', fontSize: 14, fontWeight: '600' },
  muamalaMatokeo: { color: '#6bff6b', fontSize: 13, marginBottom: 4 },
  haliBadge: {
    backgroundColor: 'rgba(107,255,107,0.2)',
    paddingHorizontal: 8, paddingVertical: 2,
    borderRadius: 10,
  },
  haliManeno: { color: '#6bff6b', fontSize: 11, fontWeight: '600' },
});