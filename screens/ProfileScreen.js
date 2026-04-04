import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ProfileScreen({ navigation }) {
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

  function toka() {
    Alert.alert(
      'Log out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log out',
          style: 'destructive',
          onPress: () => navigation.replace('Landing'),
        },
      ]
    );
  }

  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.rudiKitufe}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.rudiManeno}>‹</Text>
        </TouchableOpacity>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    paddingTop: 50,
  },
  rudiKitufe: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rudiManeno: {
    fontSize: 24,
    color: '#1a1a1a',
  },
  avatarSehemu: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#c2185b',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarManeno: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  jinaManeno: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  menuKadi: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  menuIconSehemu: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    fontSize: 20,
  },
  menuManeno: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  menuMshale: {
    fontSize: 22,
    color: '#c2185b',
  },
  tokaKitufe: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  tokaManeno: {
    color: '#e53e3e',
    fontSize: 16,
    fontWeight: 'bold',
  },
});