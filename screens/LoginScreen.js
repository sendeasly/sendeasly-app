import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
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
  const [onyeshaNywila, setOnyeshaNywila] = useState(false);

  async function ingia() {
    if (!email || !nywila) {
      Alert.alert('Error', 'Please fill all fields!');
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
        await AsyncStorage.setItem('mtumiaji', JSON.stringify(data.mtumiaji));
        navigation.replace('Main');
      } else {
        Alert.alert('Error', data.kosa);
      }
    } catch (e) {
      Alert.alert('Error', 'Network error!');
    }

    setInapakia(false);
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#880e4f" />

      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Header */}
        <TouchableOpacity
          style={styles.rudiKitufe}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.rudiManeno}>←</Text>
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.kichwa}>Log in</Text>
        <Text style={styles.maelezo}>Welcome back to SendEasly</Text>

        {/* Email Input */}
        <View style={styles.ingizoWrapper}>
          <Text style={styles.ingizoIcon}>✉</Text>
          <TextInput
            style={styles.ingizo}
            placeholder="Email address"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.ingizoWrapper}>
          <Text style={styles.ingizoIcon}>🔒</Text>
          <TextInput
            style={styles.ingizo}
            placeholder="Password"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={nywila}
            onChangeText={setNywila}
            secureTextEntry={!onyeshaNywila}
          />
          <TouchableOpacity onPress={() => setOnyeshaNywila(!onyeshaNywila)}>
            <Text style={styles.jicho}>
              {onyeshaNywila ? '🙉' : '👁'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Trouble logging in */}
        <TouchableOpacity style={styles.tatizo}>
          <Text style={styles.tatizoManeno}>Trouble logging in?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.loginKitufe, inapakia && styles.kitufeDisabled]}
          onPress={ingia}
          disabled={inapakia}
        >
          <Text style={styles.loginManeno}>
            {inapakia ? 'Logging in...' : 'LOGIN'}
          </Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerMstari} />
          <Text style={styles.dividerManeno}>OR LOGIN WITH</Text>
          <View style={styles.dividerMstari} />
        </View>

        {/* Google Button */}
        <TouchableOpacity style={styles.socialKitufe}>
          <Text style={styles.googleIcon}>G</Text>
          <Text style={styles.socialManeno}>GOOGLE</Text>
        </TouchableOpacity>

        {/* Apple Button */}
        <TouchableOpacity style={styles.socialKitufe}>
          <Text style={styles.appleIcon}></Text>
          <Text style={styles.socialManeno}>APPLE</Text>
        </TouchableOpacity>

        {/* Sign up link */}
        <TouchableOpacity
          style={styles.sajiliKitufe}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.sajiliManeno}>
            Don't have an account?{' '}
            <Text style={styles.sajiliLink}>Sign up</Text>
          </Text>
        </TouchableOpacity>

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
    padding: 24,
    paddingTop: 60,
  },
  rudiKitufe: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  rudiManeno: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  kichwa: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  maelezo: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 32,
  },
  ingizoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    gap: 12,
  },
  ingizoIcon: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.7)',
  },
  ingizo: {
    flex: 1,
    fontSize: 16,
    color: 'white',
    paddingVertical: 14,
  },
  jicho: {
    fontSize: 18,
    padding: 4,
  },
  tatizo: {
    marginBottom: 24,
  },
  tatizoManeno: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '600',
  },
  loginKitufe: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  kitufeDisabled: {
    opacity: 0.7,
  },
  loginManeno: {
    color: '#880e4f',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  dividerMstari: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  dividerManeno: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '600',
  },
  socialKitufe: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 30,
    padding: 14,
    marginBottom: 12,
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  appleIcon: {
    fontSize: 18,
    color: 'white',
  },
  socialManeno: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1,
  },
  sajiliKitufe: {
    alignItems: 'center',
    marginTop: 20,
  },
  sajiliManeno: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 15,
  },
  sajiliLink: {
    color: 'white',
    fontWeight: 'bold',
  },
});