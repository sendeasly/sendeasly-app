import { useState } from 'react';
import {
  Image,
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

export default function LandingScreen({ navigation }) {
  const [kiasi, setKiasi] = useState('1000');
  const [kutoka, setKutoka] = useState('EUR');
  const [kwenda, setKwenda] = useState('TZS');

  function hesabu() {
    const nambari = parseFloat(kiasi) || 0;
    const katikaDola = nambari / viwango[kutoka];
    return (katikaDola * viwango[kwenda]).toLocaleString('en-US', {maximumFractionDigits: 0});
  }

  const kiwango = (viwango[kwenda] / viwango[kutoka]).toFixed(2);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#880e4f" />

      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Logo */}
        <View style={styles.logoSehemu}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Text style={styles.tagline}>Send Easly, Spend Less.</Text>
          <Text style={styles.maelezo}>
            Join 1,000,000+ customers sending money globally.
          </Text>
        </View>

        {/* Calculator */}
        <View style={styles.calculator}>

          <Text style={styles.lebo}>You send</Text>
          <View style={styles.inputSafu}>
            <View style={styles.sarafuBox}>
              <Text style={styles.bendera}>{bendera[kutoka]}</Text>
              <Text style={styles.sarafuJina}>{kutoka}</Text>
            </View>
            <TextInput
              style={styles.ingizo}
              value={kiasi}
              onChangeText={setKiasi}
              keyboardType="numeric"
              placeholderTextColor="rgba(255,255,255,0.5)"
            />
          </View>

          <View style={styles.kiwangoSafu}>
            <Text style={styles.kiwangoManeno}>
              1 {kutoka} = {kiwango} {kwenda}
            </Text>
          </View>

          <Text style={styles.lebo}>They receive</Text>
          <View style={styles.inputSafu}>
            <View style={styles.sarafuBox}>
              <Text style={styles.bendera}>{bendera[kwenda]}</Text>
              <Text style={styles.sarafuJina}>{kwenda}</Text>
            </View>
            <TextInput
              style={[styles.ingizo, styles.ingizoMatokeo]}
              value={hesabu()}
              editable={false}
            />
          </View>

        </View>

        {/* Vitufe */}
        <View style={styles.vitufe}>
          <TouchableOpacity
            style={styles.loginKitufe}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginManeno}>LOG IN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signupKitufe}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.signupManeno}>SIGN UP</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.au}>Or continue with</Text>

        <TouchableOpacity style={styles.socialKitufe}>
          <Text style={styles.socialManeno}>G  Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialKitufe}>
          <Text style={styles.socialManeno}>  Continue with Apple</Text>
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
  logoSehemu: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  tagline: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  maelezo: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 20,
  },
  calculator: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
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
    fontWeight: 'bold',
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
  vitufe: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  loginKitufe: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: 30,
    padding: 14,
    alignItems: 'center',
  },
  loginManeno: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  signupKitufe: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 14,
    alignItems: 'center',
  },
  signupManeno: {
    color: '#880e4f',
    fontWeight: 'bold',
    fontSize: 15,
  },
  au: {
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 14,
  },
  socialKitufe: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 30,
    padding: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  socialManeno: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
});