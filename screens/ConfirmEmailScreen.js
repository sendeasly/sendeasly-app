import React, { useState } from 'react';
import {
    Linking,
    StatusBar,
    StyleSheet,
    Text, TouchableOpacity,
    View,
} from 'react-native';

export default function ConfirmEmailScreen({ navigation, route }) {
  const { email, nywila, nchiYake, nchiTuma, simu } = route.params || {};
  const [imetumwa, setImetumwa] = useState(false);

  function tumaTena() {
    setImetumwa(true);
    setTimeout(() => setImetumwa(false), 3000);
  }

  function fungaEmail() {
    Linking.openURL('mailto:');
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#880e4f" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.rudiKitufe} onPress={() => navigation.goBack()}>
          <Text style={styles.rudiManeno}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.helpKitufe}>
          <Text style={styles.helpManeno}>?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.progressBar}>
        {[0,1,2,3,4].map((i) => (
          <React.Fragment key={i}>
            <View style={[styles.progressDot, i <= 4 && styles.progressDotAmilifu]} />
            {i < 4 && <View style={[styles.progressLine, styles.progressLineAmilifu]} />}
          </React.Fragment>
        ))}
      </View>

      <View style={styles.content}>

        <Text style={styles.icon}>📧</Text>
        <Text style={styles.kichwa}>Let's confirm your email</Text>
        <Text style={styles.subKichwa}>
          We have sent a confirmation link to:
        </Text>
        <View style={styles.emailBox}>
          <Text style={styles.emailManeno}>{email}</Text>
        </View>
        <Text style={styles.maelezo}>
          Please open the link in your email to confirm your account. Check your spam folder if you don't see it.
        </Text>

        {imetumwa && (
          <View style={styles.successBox}>
            <Text style={styles.successManeno}>✅ Email resent successfully!</Text>
          </View>
        )}

        <TouchableOpacity style={styles.openEmailKitufe} onPress={fungaEmail}>
          <Text style={styles.openEmailManeno}>📬 Open Email App</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resendKitufe}
          onPress={tumaTena}
          disabled={imetumwa}
        >
          <Text style={styles.resendManeno}>
            {imetumwa ? 'Email sent!' : 'Resend Email'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.confirmedKitufe}
          onPress={() => navigation.navigate('PersonalDetails', { email, nywila, nchiYake, nchiTuma, simu })}
        >
          <Text style={styles.confirmedManeno}>I have confirmed my email →</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quitKitufe}
          onPress={() => navigation.navigate('Landing')}
        >
          <Text style={styles.quitManeno}>Quit sign-up</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#880e4f' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingTop: 50 },
  rudiKitufe: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  rudiManeno: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  helpKitufe: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  helpManeno: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  progressBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 24 },
  progressDot: { width: 14, height: 14, borderRadius: 7, borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)', backgroundColor: 'transparent' },
  progressDotAmilifu: { backgroundColor: 'white', borderColor: 'white' },
  progressLine: { flex: 1, height: 2, backgroundColor: 'rgba(255,255,255,0.3)' },
  progressLineAmilifu: { backgroundColor: 'white' },
  content: { flex: 1, padding: 24, alignItems: 'center' },
  icon: { fontSize: 72, marginBottom: 20 },
  kichwa: { fontSize: 26, fontWeight: 'bold', color: 'white', marginBottom: 12, textAlign: 'center' },
  subKichwa: { fontSize: 14, color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginBottom: 12 },
  emailBox: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12, paddingHorizontal: 20, paddingVertical: 12, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  emailManeno: { color: 'white', fontSize: 15, fontWeight: 'bold' },
  maelezo: { color: 'rgba(255,255,255,0.6)', fontSize: 13, textAlign: 'center', lineHeight: 20, marginBottom: 24 },
  successBox: { backgroundColor: 'rgba(107,255,107,0.2)', borderRadius: 10, padding: 12, marginBottom: 16, width: '100%', borderWidth: 1, borderColor: 'rgba(107,255,107,0.3)' },
  successManeno: { color: '#6bff6b', fontSize: 13, textAlign: 'center', fontWeight: '600' },
  openEmailKitufe: { backgroundColor: 'white', borderRadius: 30, padding: 16, alignItems: 'center', width: '100%', marginBottom: 12 },
  openEmailManeno: { color: '#880e4f', fontWeight: 'bold', fontSize: 16 },
  resendKitufe: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 30, padding: 16, alignItems: 'center', width: '100%', marginBottom: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  resendManeno: { color: 'white', fontWeight: 'bold', fontSize: 15 },
  confirmedKitufe: { marginBottom: 16 },
  confirmedManeno: { color: 'rgba(255,255,255,0.9)', fontSize: 14, fontWeight: '600', textDecorationLine: 'underline' },
  quitKitufe: { marginTop: 8 },
  quitManeno: { color: 'rgba(255,255,255,0.4)', fontSize: 13 },
});