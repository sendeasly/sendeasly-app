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

export default function RegisterScreen({ navigation }) {
  const [jina, setJina] = useState('');
  const [email, setEmail] = useState('');
  const [nywila, setNywila] = useState('');
  const [nywila2, setNywila2] = useState('');
  const [inapakia, setInapakia] = useState(false);
  const [onyeshaNywila, setOnyeshaNywila] = useState(false);
  const [onyeshaNywila2, setOnyeshaNywila2] = useState(false);
  const [kukubali, setKukubali] = useState(false);

  async function sajili() {
    if (!jina || !email || !nywila || !nywila2) {
      Alert.alert('Error', 'Please fill all fields!');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Error', 'Email is not valid!');
      return;
    }
    if (nywila.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters!');
      return;
    }
    if (nywila !== nywila2) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }
    if (!kukubali) {
      Alert.alert('Error', 'Please agree to Terms of Service!');
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
            <Text style={styles.rudiManeno}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.helpKitufe}>
            <Text style={styles.helpManeno}>?</Text>
          </TouchableOpacity>
        </View>

        {/* Progress */}
        <View style={styles.progressBar}>
          <View style={[styles.progressDot, styles.progressDotAmilifu]} />
          <View style={styles.progressLine} />
          <View style={[styles.progressDot, styles.progressDotAmilifu]} />
          <View style={styles.progressLine} />
          <View style={styles.progressDot} />
        </View>

        {/* Title */}
        <View style={styles.titleSehemu}>
          <Text style={styles.kichwa}>Sign up it's free</Text>
          <Text style={styles.subKichwa}>Create account</Text>
        </View>

        {/* Form */}
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

          {/* Terms */}
          <TouchableOpacity
            style={styles.termsWrapper}
            onPress={() => setKukubali(!kukubali)}
          >
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

        {/* Continue Button */}
        <View style={styles.chiniSehemu}>
          <TouchableOpacity
            style={[styles.continueKitufe, inapakia && styles.kitufeDisabled]}
            onPress={sajili}
            disabled={inapakia}
          >
            <Text style={styles.continueManeno}>
              {inapakia ? 'Creating account...' : 'Continue'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>
              Already have an account?{' '}
              <Text style={styles.loginLinkBold}>Log in</Text>
            </Text>
          </TouchableOpacity>
        </View>

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
  helpKitufe: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  helpManeno: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  progressDot: {
    width: 16, height: 16, borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    backgroundColor: 'transparent',
  },
  progressDotAmilifu: {
    backgroundColor: 'white',
    borderColor: 'white',
  },
  progressLine: {
    flex: 1, height: 2,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  titleSehemu: { paddingHorizontal: 20, marginBottom: 24 },
  kichwa: {
    fontSize: 28, fontWeight: 'bold',
    color: 'white', marginBottom: 8,
  },
  subKichwa: { fontSize: 16, fontWeight: 'bold', color: 'rgba(255,255,255,0.8)' },
  form: { paddingHorizontal: 20, marginBottom: 24 },
  ingizoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  ingizoIcon: { fontSize: 20, color: 'rgba(255,255,255,0.7)' },
  ingizo: { flex: 1, fontSize: 16, color: 'white' },
  jicho: { fontSize: 18, padding: 4 },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginLeft: 36,
  },
  termsWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20, gap: 12,
  },
  checkbox: {
    width: 22, height: 22,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: 4,
    alignItems: 'center', justifyContent: 'center',
    marginTop: 2,
  },
  checkboxAmilifu: {
    backgroundColor: 'white',
    borderColor: 'white',
  },
  checkmark: { color: '#880e4f', fontSize: 14, fontWeight: 'bold' },
  termsManeno: {
    flex: 1, color: 'rgba(255,255,255,0.7)',
    fontSize: 13, lineHeight: 20,
  },
  termsLink: {
    color: 'white',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  chiniSehemu: { paddingHorizontal: 20, gap: 16 },
  continueKitufe: {
    backgroundColor: 'white',
    borderRadius: 30, padding: 18,
    alignItems: 'center',
  },
  kitufeDisabled: { opacity: 0.7 },
  continueManeno: { color: '#880e4f', fontWeight: 'bold', fontSize: 16 },
  loginLink: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14, textAlign: 'center',
  },
  loginLinkBold: { color: 'white', fontWeight: 'bold' },
});