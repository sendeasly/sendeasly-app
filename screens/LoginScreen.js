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
  const [tab, setTab] = useState('email');

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
        <View style={styles.header}>
          <TouchableOpacity style={styles.rudiKitufe} onPress={() => navigation.goBack()}>
            <Text style={styles.rudiManeno}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Log In</Text>
          <TouchableOpacity style={styles.helpKitufe}>
            <Text style={styles.helpManeno}>🎧</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity style={styles.tab} onPress={() => setTab('phone')}>
            <Text style={[styles.tabManeno, tab === 'phone' && styles.tabManenoAmilifu]}>
              Phone number
            </Text>
            {tab === 'phone' && <View style={styles.tabLine} />}
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => setTab('email')}>
            <Text style={[styles.tabManeno, tab === 'email' && styles.tabManenoAmilifu]}>
              Email
            </Text>
            {tab === 'email' && <View style={styles.tabLine} />}
          </TouchableOpacity>
        </View>
        <View style={styles.dividerLine} />

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.ingizoWrapper}>
            <TextInput
              style={styles.ingizo}
              placeholder={tab === 'email' ? 'Email' : 'Phone number'}
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={email}
              onChangeText={setEmail}
              keyboardType={tab === 'email' ? 'email-address' : 'phone-pad'}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.ingizoWrapper}>
            <TextInput
              style={styles.ingizo}
              placeholder="Password 8-16 characters"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={nywila}
              onChangeText={setNywila}
              secureTextEntry={!onyeshaNywila}
            />
            <TouchableOpacity onPress={() => setOnyeshaNywila(!onyeshaNywila)}>
              <Text style={styles.jicho}>{onyeshaNywila ? '👁' : '🙈'}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.maelezo}>
            After applying for a live account, you can login by email
          </Text>

          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginKitufe, inapakia && styles.kitufeDisabled]}
            onPress={ingia}
            disabled={inapakia}
          >
            <Text style={styles.loginManeno}>
              {inapakia ? 'Logging in...' : 'Log In'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.newUser}>
              New user? <Text style={styles.signUpLink}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Social */}
        <View style={styles.socialSehemu}>
          <Text style={styles.socialManeno}>or Log In with</Text>
          <View style={styles.socialVitufe}>
            <TouchableOpacity style={styles.appleKitufe}>
              <Text style={styles.appleIcon}></Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.googleKitufe}>
              <Text style={styles.googleIcon}>G</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#880e4f' },
  scroll: { flexGrow: 1 },
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
  rudiManeno: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  helpKitufe: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  helpManeno: { fontSize: 18 },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 16,
    gap: 24,
  },
  tab: { paddingBottom: 12, position: 'relative' },
  tabManeno: { color: 'rgba(255,255,255,0.5)', fontSize: 16, fontWeight: '500' },
  tabManenoAmilifu: { color: 'white', fontWeight: 'bold' },
  tabLine: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: 2, backgroundColor: 'white', borderRadius: 1,
  },
  dividerLine: { height: 1, backgroundColor: 'rgba(255,255,255,0.15)', marginBottom: 24 },
  form: { paddingHorizontal: 20 },
  ingizoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 30,
    paddingHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  ingizo: {
    flex: 1, fontSize: 16, color: 'white', paddingVertical: 16,
  },
  jicho: { fontSize: 18, padding: 4 },
  maelezo: {
    color: 'rgba(255,255,255,0.5)', fontSize: 13,
    marginBottom: 12, lineHeight: 18,
  },
  forgotPassword: {
    color: 'rgba(255,255,255,0.9)', fontSize: 14,
    fontWeight: '600', marginBottom: 24,
  },
  loginKitufe: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 30, padding: 18,
    alignItems: 'center', marginBottom: 20,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)',
  },
  kitufeDisabled: { opacity: 0.7 },
  loginManeno: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  newUser: {
    color: 'rgba(255,255,255,0.7)', fontSize: 15,
    textAlign: 'center', marginBottom: 40,
  },
  signUpLink: { color: 'white', fontWeight: 'bold' },
  socialSehemu: { alignItems: 'center', paddingBottom: 40 },
  socialManeno: { color: 'rgba(255,255,255,0.6)', fontSize: 14, marginBottom: 20 },
  socialVitufe: { flexDirection: 'row', gap: 16 },
  appleKitufe: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: 'white',
    alignItems: 'center', justifyContent: 'center',
  },
  appleIcon: { fontSize: 24, color: 'black' },
  googleKitufe: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)',
  },
  googleIcon: { fontSize: 22, fontWeight: 'bold', color: 'white' },
});