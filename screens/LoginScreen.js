import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const eaCountries = [
  { jina: 'Tanzania', code: '+255', bendera: '🇹🇿' },
  { jina: 'Kenya', code: '+254', bendera: '🇰🇪' },
  { jina: 'Uganda', code: '+256', bendera: '🇺🇬' },
  { jina: 'Rwanda', code: '+250', bendera: '🇷🇼' },
  { jina: 'Ethiopia', code: '+251', bendera: '🇪🇹' },
  { jina: 'Somalia', code: '+252', bendera: '🇸🇴' },
  { jina: 'Burundi', code: '+257', bendera: '🇧🇮' },
  { jina: 'South Sudan', code: '+211', bendera: '🇸🇸' },
  { jina: 'Eritrea', code: '+291', bendera: '🇪🇷' },
  { jina: 'Djibouti', code: '+253', bendera: '🇩🇯' },
];

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [simu, setSimu] = useState('');
  const [nywila, setNywila] = useState('');
  const [inapakia, setInapakia] = useState(false);
  const [onyeshaNywila, setOnyeshaNywila] = useState(false);
  const [tab, setTab] = useState('email');
  const [nchi, setNchi] = useState(eaCountries[0]);
  const [modalWazi, setModalWazi] = useState(false);

  async function ingia() {
    if (tab === 'email' && (!email || !nywila)) {
      Alert.alert('Error', 'Please fill all fields!');
      return;
    }
    setInapakia(true);
    try {
      const jibu = await fetch('http://100.115.92.203:5001/ingia', {
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

      {/* Country Modal */}
      <Modal
        visible={modalWazi}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalWazi(false)}
      >
        <View style={styles.modalBg}>
          <View style={styles.modalKadi}>
            <Text style={styles.modalKichwa}>Select Country</Text>
            <FlatList
              data={eaCountries}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => { setNchi(item); setModalWazi(false); }}
                >
                  <Text style={styles.modalBendera}>{item.bendera}</Text>
                  <Text style={styles.modalJina}>{item.jina}</Text>
                  <Text style={styles.modalCode}>{item.code}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalFunga}
              onPress={() => setModalWazi(false)}
            >
              <Text style={styles.modalFungaManeno}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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

          {/* Phone Tab */}
          {tab === 'phone' && (
            <View style={styles.simuWrapper}>
              <TouchableOpacity
                style={styles.countryCode}
                onPress={() => setModalWazi(true)}
              >
                <Text style={styles.bendera}>{nchi.bendera}</Text>
                <Text style={styles.codeManeno}>{nchi.code}</Text>
                <Text style={styles.chevron}>▾</Text>
              </TouchableOpacity>
              <View style={styles.simuSeparator} />
              <TextInput
                style={styles.simuIngizo}
                placeholder="Phone number"
                placeholderTextColor="rgba(255,255,255,0.4)"
                value={simu}
                onChangeText={setSimu}
                keyboardType="phone-pad"
              />
            </View>
          )}

          {/* Email Tab */}
          {tab === 'email' && (
            <View style={styles.ingizoWrapper}>
              <TextInput
                style={styles.ingizo}
                placeholder="Email"
                placeholderTextColor="rgba(255,255,255,0.4)"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          )}

          {/* Password */}
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
    marginTop: 16, gap: 24,
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
  simuWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 30,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 16,
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  bendera: { fontSize: 20 },
  codeManeno: { color: 'white', fontSize: 15, fontWeight: '600' },
  chevron: { color: 'rgba(255,255,255,0.6)', fontSize: 12 },
  simuSeparator: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.2)' },
  simuIngizo: {
    flex: 1, color: 'white', fontSize: 16,
    paddingHorizontal: 14, paddingVertical: 16,
  },
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
  ingizo: { flex: 1, fontSize: 16, color: 'white', paddingVertical: 16 },
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
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalKadi: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  modalKichwa: {
    fontSize: 18, fontWeight: 'bold',
    color: '#880e4f', marginBottom: 16,
    textAlign: 'center',
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    gap: 12,
  },
  modalBendera: { fontSize: 24 },
  modalJina: { flex: 1, fontSize: 16, color: '#1a1a1a', fontWeight: '500' },
  modalCode: { fontSize: 14, color: '#888' },
  modalFunga: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12, padding: 14,
    alignItems: 'center', marginTop: 12,
  },
  modalFungaManeno: { color: '#880e4f', fontWeight: 'bold', fontSize: 16 },
});