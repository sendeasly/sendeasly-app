import React, { useEffect, useRef, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View,
} from 'react-native';

export default function OTPScreen({ navigation, route }) {
  const { email, nywila, nchiYake, nchiTuma, simu, otp } = route.params || {};
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [kosa, setKosa] = useState('');
  const [countdown, setCountdown] = useState(60);
  const inputs = useRef([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(c => c > 0 ? c - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function badilisha(text, index) {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  }

  function thibitisha() {
    const codeKamili = code.join('');
    if (codeKamili.length < 6) {
      setKosa('Please enter the 6-digit code');
      return;
    }
    if (codeKamili !== otp) {
      setKosa('Invalid code. Please try again.');
      return;
    }
    setKosa('');
    navigation.navigate('ConfirmEmail', { email, nywila, nchiYake, nchiTuma, simu });
  }

  function tuma() {
    setCountdown(60);
    setCode(['', '', '', '', '', '']);
    setKosa('');
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
            <View style={[styles.progressDot, i <= 3 && styles.progressDotAmilifu]} />
            {i < 4 && <View style={[styles.progressLine, i < 3 && styles.progressLineAmilifu]} />}
          </React.Fragment>
        ))}
      </View>

      <View style={styles.content}>
        <Text style={styles.icon}>🔐</Text>
        <Text style={styles.kichwa}>Enter verification code</Text>
        <Text style={styles.subKichwa}>
          We sent a 6-digit code to{'\n'}{simu}
        </Text>

        {kosa ? (
          <View style={styles.kosaBox}>
            <Text style={styles.kosaManeno}>{kosa}</Text>
          </View>
        ) : null}

        <View style={styles.codeWrapper}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => inputs.current[index] = ref}
              style={[styles.codeInput, digit && styles.codeInputFull]}
              value={digit}
              onChangeText={text => badilisha(text.slice(-1), index)}
              keyboardType="numeric"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.continueKitufe}
          onPress={thibitisha}
        >
          <Text style={styles.continueManeno}>Verify Code</Text>
        </TouchableOpacity>

        <View style={styles.resendWrapper}>
          {countdown > 0 ? (
            <Text style={styles.countdownManeno}>
              Resend code in {countdown}s
            </Text>
          ) : (
            <TouchableOpacity onPress={tuma}>
              <Text style={styles.resendManeno}>Resend Code</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.otpHint}>
          Demo code: {otp}
        </Text>

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
  icon: { fontSize: 64, marginBottom: 20 },
  kichwa: { fontSize: 26, fontWeight: 'bold', color: 'white', marginBottom: 12, textAlign: 'center' },
  subKichwa: { fontSize: 14, color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginBottom: 24, lineHeight: 22 },
  kosaBox: { backgroundColor: 'rgba(255,0,0,0.2)', borderRadius: 10, padding: 12, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)', width: '100%' },
  kosaManeno: { color: '#ff6b6b', fontSize: 13, textAlign: 'center' },
  codeWrapper: { flexDirection: 'row', gap: 10, marginBottom: 32 },
  codeInput: { width: 48, height: 56, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.15)', borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)', color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  codeInputFull: { backgroundColor: 'rgba(255,255,255,0.25)', borderColor: 'white' },
  continueKitufe: { backgroundColor: 'white', borderRadius: 30, padding: 18, alignItems: 'center', width: '100%', marginBottom: 20 },
  continueManeno: { color: '#880e4f', fontWeight: 'bold', fontSize: 16 },
  resendWrapper: { marginBottom: 16 },
  countdownManeno: { color: 'rgba(255,255,255,0.5)', fontSize: 14 },
  resendManeno: { color: 'white', fontSize: 14, fontWeight: 'bold', textDecorationLine: 'underline' },
  otpHint: { color: 'rgba(255,255,255,0.3)', fontSize: 11, marginTop: 8 },
});