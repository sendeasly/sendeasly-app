import { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [nywila, setNywila] = useState('');
  const [inapakia, setInapakia] = useState(false);

  async function ingia() {
    if (!email || !nywila) {
      Alert.alert('Kosa', 'Tafadhali jaza email na nywila!');
      return;
    }

    setInapakia(true);

    try {
      const jibu = await fetch('https://money-transfer-backend-production.up.railway.app/ingia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, nywila }),
      });

      const data = await jibu.json();

      if (jibu.ok) {
        Alert.alert('', 'Karibu ' + data.mtumiaji.jina + '!');
        navigation.replace('Main');
      } else {
        Alert.alert('Kosa', data.kosa);
      }
    } catch (e) {
      Alert.alert('Kosa', 'Tatizo la mtandao!');
    }

    setInapakia(false);
  }

  return (
    <ScrollView style={styles.container}>

      {/* Logo sehemu */}
      <View style={styles.juu}>
        <Text style={styles.logo}>💸</Text>
        <Text style={styles.jina}>SendEasly</Text>
        <Text style={styles.kauli}>International Money Transfer</Text>
      </View>

      {/* Fomu */}
      <View style={styles.fomu}>
        <Text style={styles.kichwa}>Welcome back!</Text>
        <Text style={styles.maelezo}>Login to your account</Text>

        <Text style={styles.lebo}>Email</Text>
        <TextInput
          style={styles.ingizo}
          placeholder="Enter your email..."
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.lebo}>Password</Text>
        <TextInput
          style={styles.ingizo}
          placeholder="Enter your password..."
          value={nywila}
          onChangeText={setNywila}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.kitufe, inapakia && styles.kitufeDisabled]}
          onPress={ingia}
          disabled={inapakia}
        >
          <Text style={styles.kitufeManeno}>
            {inapakia ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sajiliKitufe}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.sajiliManeno}>
            Don't have an account?{' '}
            <Text style={styles.sajiliLink}>Sign up</Text>
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fce4ec',
  },
  juu: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
  },
  logo: {
    fontSize: 60,
    marginBottom: 8,
  },
  jina: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#c2185b',
    marginBottom: 4,
  },
  kauli: {
    fontSize: 14,
    color: '#e91e8c',
  },
  fomu: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    minHeight: 500,
  },
  kichwa: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#c2185b',
    marginBottom: 6,
  },
  maelezo: {
    fontSize: 15,
    color: '#888',
    marginBottom: 24,
  },
  lebo: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 6,
  },
  ingizo: {
    borderWidth: 1,
    borderColor: '#f8bbd0',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  kitufe: {
    backgroundColor: '#c2185b',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  kitufeDisabled: {
    opacity: 0.7,
  },
  kitufeManeno: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sajiliKitufe: {
    alignItems: 'center',
    marginTop: 20,
  },
  sajiliManeno: {
    color: '#888',
    fontSize: 15,
  },
  sajiliLink: {
    color: '#c2185b',
    fontWeight: 'bold',
  },
});