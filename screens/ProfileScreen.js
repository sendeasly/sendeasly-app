import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [mtumiaji, setMtumiaji] = useState(null);

  useEffect(() => {
    async function pataData() {
      try {
        const data = await AsyncStorage.getItem('mtumiaji');
        if (data) setMtumiaji(JSON.parse(data));
      } catch (e) {
        console.log(e);
      }
    }
    pataData();
  }, []);

  const menuItems = [
    { id: 1, icon: '👤', jina: 'Personal Details' },
    { id: 2, icon: '🏦', jina: 'Limits' },
    { id: 3, icon: '💳', jina: 'Manage cards' },
    { id: 4, icon: '⚙️', jina: 'Settings' },
    { id: 5, icon: '❓', jina: 'Support' },
    { id: 6, icon: 'ℹ️', jina: 'Legal Information' },
  ];

  async function toka() {
    await AsyncStorage.removeItem('mtumiaji');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Landing' }],
      })
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#880e4f" />

      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.rudiKitufe}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.rudiManeno}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Avatar */}
        <View style={styles.avatarSehemu}>
          <View style={styles.avatar}>
            <Text style={styles.avatarManeno}>
              {mtumiaji ? mtumiaji.jina.charAt(0).toUpperCase() : 'SE'}
            </Text>
          </View>
          <Text style={styles.jinaManeno}>
            {mtumiaji ? mtumiaji.jina : 'My Profile'}
          </Text>
          <Text style={styles.emailManeno}>
            {mtumiaji ? mtumiaji.email : ''}
          </Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuKadi}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                index < menuItems.length - 1 && styles.menuItemBorder,
              ]}
              onPress={() => Alert.alert(item.jina, 'Coming soon!')}
            >
              <View style={styles.menuIconSehemu}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
              </View>
              <Text style={styles.menuManeno}>{item.jina}</Text>
              <Text style={styles.menuMshale}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Log out */}
        <TouchableOpacity style={styles.tokaKitufe} onPress={toka}>
          <Text style={styles.tokaManeno}>Log out</Text>
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
  avatarSehemu: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  avatarManeno: { color: 'white', fontSize: 28, fontWeight: 'bold' },
  jinaManeno: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  emailManeno: { color: 'rgba(255,255,255,0.6)', fontSize: 14 },
  menuKadi: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginHorizontal: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  menuIconSehemu: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  menuIcon: { fontSize: 20 },
  menuManeno: { flex: 1, fontSize: 16, color: 'white', fontWeight: '500' },
  menuMshale: { fontSize: 22, color: 'rgba(255,255,255,0.6)' },
  tokaKitufe: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  tokaManeno: { color: '#ff6b6b', fontSize: 16, fontWeight: 'bold' },
});