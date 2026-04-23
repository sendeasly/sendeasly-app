import { useState } from 'react';
import {
  ScrollView, StatusBar,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View,
} from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [nywila, setNywila] = useState('');
  const [nywila2, setNywila2] = useState('');
  const [onyeshaNywila, setOnyeshaNywila] = useState(false);
  const [onyeshaNywila2, setOnyeshaNywila2] = useState(false);
  const [kukubali, setKukubali] = useState(false);
  const [kosa, setKosa] = useState('');

  function endelea() {
    if (!email || !email.includes('@')) {
      setKosa('Please enter a valid email address');
      return;
    }
    if (nywila.length < 6) {
      setKosa('Password must be at least 6 characters');
      return;
    }
    if (nywila !== nywila2) {
      setKosa('Passwords do not match');
      return;
    }
    if (!kukubali) {
      setKosa('Please agree to Terms of Service');
      return;
    }
    setKosa('');
    navigation.navigate('SelectCountry', { email, nywila });
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#880e4f" />
      <ScrollView contentContainerStyle={styles.scroll}>

        <View style={styles.header}>
          <TouchableOpacity style={styles.rudiKitufe} onPress={() => navigation.goBack()}>
            <Text style={styles.rudiManeno}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.helpKitufe}>
            <Text style={styles.helpManeno}>?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.progressBar}>
          <View style={[styles.progressDot, styles.progressDotAmilifu]} />
          <View style={styles.progressLine} />
          <View style={styles.progressDot} />
          <View style={styles.progressLine} />
          <View style={styles.progressDot} />
          <View style={styles.progressLine} />
          <View style={styles.progressDot} />
          <View style={styles.progressLine} />
          <View style={styles.progressDot} />
        </View>

        <Text style={styles.kichwa}>Sign up it's free</Text>
        <Text style={styles.subKichwa}>Create account</Text>

        {kosa ? (
          <View style={styles.kosaBox}>
            <Text style={styles.kosaManeno}>{kosa}</Text>
          </View>
        ) : null}

        <View style={styles.form}>
          <View style={styles.ingizoWrapper}>
            <Text style={styles.ingizoIcon}>✉</Text>
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
          <View style={styles.separator} />

          <View style={styles.ingizoWrapper}>
            <Text style={styles.ingizoIcon}>🔒</Text>
            <TextInput
              style={styles.ingizo}
              placeholder="Password"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={nywila}
              onChangeText={setNywila}
              secureTextEntry={!onyeshaNywila}
            />
            <TouchableOpacity onPress={() => setOnyeshaNywila(!onyeshaNywila)}>
              <Text style={styles.jicho}>{onyeshaNywila ? '👁' : '🙈'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />

          <View style={styles.ingizoWrapper}>
            <Text style={styles.ingizoIcon}>🔒</Text>
            <TextInput
              style={styles.ingizo}
              placeholder="Confirm your new password"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={nywila2}
              onChangeText={setNywila2}
              secureTextEntry={!onyeshaNywila2}
            />
            <TouchableOpacity onPress={() => setOnyeshaNywila2(!onyeshaNywila2)}>
              <Text style={styles.jicho}>{onyeshaNywila2 ? '👁' : '🙈'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />

          <TouchableOpacity style={styles.termsWrapper} onPress={() => setKukubali(!kukubali)}>
            <View style={[styles.checkbox, kukubali && styles.checkboxAmilifu]}>
              {kukubali && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.termsManeno}>
              By continuing you agree to our{' '}
              <Text style={styles.termsLink}>Terms of Service</Text>
              {' '}and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.continueKitufe} onPress={endelea}>
          <Text style={styles.continueManeno}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>
            Already have an account?{' '}
            <Text style={styles.loginLinkBold}>Log in</Text>
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#880e4f' },
  scroll: { flexGrow: 1, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingTop: 50 },
  rudiKitufe: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  rudiManeno: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  helpKitufe: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  helpManeno: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  progressBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 32 },
  progressDot: { width: 14, height: 14, borderRadius: 7, borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)', backgroundColor: 'transparent' },
  progressDotAmilifu: { backgroundColor: 'white', borderColor: 'white' },
  progressLine: { flex: 1, height: 2, backgroundColor: 'rgba(255,255,255,0.3)' },
  kichwa: { fontSize: 26, fontWeight: 'bold', color: 'white', paddingHorizontal: 20, marginBottom: 6 },
  subKichwa: { fontSize: 15, fontWeight: '600', color: 'rgba(255,255,255,0.7)', paddingHorizontal: 20, marginBottom: 20 },
  kosaBox: { backgroundColor: 'rgba(255,0,0,0.2)', marginHorizontal: 20, borderRadius: 10, padding: 12, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' },
  kosaManeno: { color: '#ff6b6b', fontSize: 13 },
  form: { paddingHorizontal: 20, marginBottom: 24 },
  ingizoWrapper: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, gap: 12 },
  ingizoIcon: { fontSize: 20, color: 'rgba(255,255,255,0.7)' },
  ingizo: { flex: 1, fontSize: 16, color: 'white' },
  jicho: { fontSize: 18, padding: 4 },
  separator: { height: 1, backgroundColor: 'rgba(255,255,255,0.2)', marginLeft: 36 },
  termsWrapper: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 20, gap: 12 },
  checkbox: { width: 22, height: 22, borderWidth: 2, borderColor: 'rgba(255,255,255,0.5)', borderRadius: 4, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  checkboxAmilifu: { backgroundColor: 'white', borderColor: 'white' },
  checkmark: { color: '#880e4f', fontSize: 14, fontWeight: 'bold' },
  termsManeno: { flex: 1, color: 'rgba(255,255,255,0.7)', fontSize: 13, lineHeight: 20 },
  termsLink: { color: 'white', textDecorationLine: 'underline', fontWeight: '600' },
  continueKitufe: { backgroundColor: 'white', borderRadius: 30, padding: 18, alignItems: 'center', marginHorizontal: 20, marginBottom: 16 },
  continueManeno: { color: '#880e4f', fontWeight: 'bold', fontSize: 16 },
  loginLink: { color: 'rgba(255,255,255,0.7)', fontSize: 14, textAlign: 'center' },
  loginLinkBold: { color: 'white', fontWeight: 'bold' },
});