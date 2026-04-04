import { useState } from 'react';
import {
  Image,
  ScrollView,
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

export default function LandingScreen({ navigation }) {
  const [kiasi, setKiasi] = useState('1');
  const [kutoka, setKutoka] = useState('EUR');
  const [kwenda, setKwenda] = useState('TZS');

  function hesabu() {
    const nambari = parseFloat(kiasi) || 0;
    const katikaDola = nambari / viwango[kutoka];
    return (katikaDola * viwango[kwenda]).toFixed(2);
  }

  const kiwango = (viwango[kwenda] / viwango[kutoka]).toFixed(2);

  return (
    <ScrollView style={styles.container}>

      {/* Juu — Logo */}
      <View style={styles.juu}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <View style={styles.offerBadge}>
          <Text style={styles.offerIcon}>❤️</Text>
          <Text style={styles.offerManeno}>No transfer fees on this transfer</Text>
        </View>
      </View>

      {/* Calculator Card */}
      <View style={styles.calculatorKadi}>

        {/* You send */}
        <Text style={styles.lebo}>You send:</Text>
        <View style={styles.safu}>
          <TextInput
            style={styles.ingizo}
            value={kiasi}
            onChangeText={setKiasi}
            keyboardType="numeric"
            placeholder="0"
          />
          <View style={styles.sarafuChaguo}>
            <Text style={styles.sarafuManeno}>{kutoka}</Text>
            <Text style={styles.chevron}>∨</Text>
          </View>
        </View>

        <View style={styles.mgawanyo} />

        {/* They receive */}
        <Text style={styles.lebo}>They receive:</Text>
        <View style={styles.safu}>
          <Text style={styles.mpokeajiKiasi}>{hesabu()}</Text>
          <View style={styles.sarafuChaguo}>
            <Text style={styles.sarafuManeno}>{kwenda}</Text>
            <Text style={styles.chevron}>∨</Text>
          </View>
        </View>

        <View style={styles.mgawanyo} />

        {/* Exchange rate */}
        <Text style={styles.kiwango}>
          Exchange rate: 1 {kutoka} = {kiwango} {kwenda}
        </Text>

      </View>

      {/* Vitufe vya Login na Signup */}
      <View style={styles.vitufeKadi}>

        <View style={styles.vitufeSafu}>
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

        <Text style={styles.au}>Or</Text>

        <TouchableOpacity style={styles.socialKitufe}>
          <Text style={styles.googleG}>G</Text>
          <Text style={styles.socialManeno}>CONTINUE WITH GOOGLE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialKitufe}>
          <Text style={styles.appleIcon}></Text>
          <Text style={styles.socialManeno}>CONTINUE WITH APPLE</Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff7da8',
  },
  juu: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 24,
  },
  
  logo: {
  width: 200,
  height: 200,
  resizeMode: 'contain',
  marginBottom: 8,
},
  jinaApp: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#c2185b',
    marginBottom: 16,
  },
  offerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  offerIcon: {
    fontSize: 20,
  },
  offerManeno: {
    fontSize: 19,
    color: '#000000',
    fontWeight: '600',
  },
  calculatorKadi: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  lebo: {
    fontSize: 15,
    color: '#555',
    marginBottom: 8,
  },
  safu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  ingizo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    flex: 1,
  },
  mpokeajiKiasi: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    flex: 1,
  },
  sarafuChaguo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  sarafuManeno: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  chevron: {
    fontSize: 12,
    color: '#888',
  },
  mgawanyo: {
    height: 1,
    backgroundColor: '#ff3b3b',
    marginBottom: 16,
  },
  kiwango: {
    fontSize: 14,
    color: '#c2185b',
    fontWeight: '600',
    textAlign: 'center',
  },
  vitufeKadi: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  vitufeSafu: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  loginKitufe: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#f8bbd0',
    borderRadius: 30,
    padding: 14,
    alignItems: 'center',
  },
  loginManeno: {
    color: '#c2185b',
    fontWeight: 'bold',
    fontSize: 15,
  },
  signupKitufe: {
    flex: 1,
    backgroundColor: '#e91861',
    borderRadius: 30,
    padding: 14,
    alignItems: 'center',
  },
  signupManeno: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  au: {
    textAlign: 'center',
    color: '#888',
    fontSize: 15,
    marginBottom: 16,
  },
  socialKitufe: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#f8bbd0',
    borderRadius: 30,
    padding: 14,
    marginBottom: 12,
    gap: 10,
  },
  googleG: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#c2185b',
  },
  appleIcon: {
    fontSize: 18,
    color: '#1a1a1a',
  },
  socialManeno: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
});