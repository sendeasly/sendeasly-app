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

export default function RegisterScreen({ navigation }) {
  const [jina, setJina] = useState('');
  const [email, setEmail] = useState('');
  const [nywila, setNywila] = useState('');
  const [nywila2, setNywila2] = useState('');
  const [inapakia, setInapakia] = useState(false);

  async function sajili() {
    if (!jina || !email || !nywila || !nywila2) {
      Alert.alert('Kosa', 'Please fill all fields!');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Kosa', 'Email is not valid!');
      return;
    }
    if (nywila.length < 6) {
      Alert.alert('Kosa', 'Password must be at least 6 characters!');
      return;
    }
    if (nywila !== nywila2) {
      Alert.alert('Kosa', 'Passwords do not match!');
      return;
    }

    setInapakia(true);

    try {
      const jibu = await fetch('https://money-transfer-backend-production.up.railway.app/sajili', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jina, email, nywila }),
      });

      const data = await jibu.json();

      if (jibu.ok) {
        Alert.alert('Success!', 'Welcome ' + data.mtumiaji.jina + '!');
        navigation.replace('Main');
      } else {
        Alert.alert('Kosa', data.kosa);
      }
    } catch (e) {
      Alert.alert('Kosa', 'Network error!');
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
        <Text style={styles.kichwa}>Create account</Text>
        <Text style={styles.maelezo}>Sign up for free today</Text>

        <Text style={styles.lebo}>Full name</Text>
        <TextInput
          style={styles.ingizo}
          placeholder="Enter your full name..."
          value={jina}
          onChangeText={setJina}
        />

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
          placeholder="At least 6 characters..."
          value={nywila}
          onChangeText={setNywila}
          secureTextEntry
        />

        <Text style={styles.lebo}>Confirm password</Text>
        <TextInput
          style={styles.ingizo}
          placeholder="Repeat your password..."
          value={nywila2}
          onChangeText={setNywila2}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.kitufe, inapakia && styles.kitufeDisabled]}
          onPress={sajili}
          disabled={inapakia}
        >
          <Text style={styles.kitufeManeno}>
            {inapakia ? 'Creating account...' : 'Sign up'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.ingiaKitufe}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.ingiaManeno}>
            Already have an account?{' '}
            <Text style={styles.ingiaLink}>Login</Text>
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
    minHeight: 600,
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
  ingiaKitufe: {
    alignItems: 'center',
    marginTop: 20,
  },
  ingiaManeno: {
    color: '#888',
    fontSize: 15,
  },
  ingiaLink: {
    color: '#c2185b',
    fontWeight: 'bold',
  },
});