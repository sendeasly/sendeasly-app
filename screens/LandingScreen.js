import { useEffect, useState } from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View,
} from 'react-native';

const viwango = {
  USD: { rate: 1, bendera: '🇺🇸' },
  EUR: { rate: 0.92, bendera: '🇪🇺' },
  GBP: { rate: 0.79, bendera: '🇬🇧' },
  TZS: { rate: 2578, bendera: '🇹🇿' },
  KES: { rate: 129, bendera: '🇰🇪' },
  UGX: { rate: 3780, bendera: '🇺🇬' },
  ZAR: { rate: 18.5, bendera: '🇿🇦' },
  CAD: { rate: 1.36, bendera: '🇨🇦' },
  AED: { rate: 3.67, bendera: '🇦🇪' },
};

const nchiZinazosogea = [
  '🇹🇿 Tanzania', '🇰🇪 Kenya', '🇺🇬 Uganda',
  '🇳🇬 Nigeria', '🇬🇧 UK', '🇺🇸 USA',
  '🇩🇪 Germany', '🇦🇪 UAE', '🇿🇦 S.Africa',
];

export default function LandingScreen({ navigation }) {
  const [kiasi, setKiasi] = useState('1000');
  const [kutoka, setKutoka] = useState('EUR');
  const [kwenda, setKwenda] = useState('TZS');
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(30);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, []);

  function hesabu() {
    const n = parseFloat(kiasi) || 0;
    return (n / viwango[kutoka].rate * viwango[kwenda].rate).toLocaleString('en-US', { maximumFractionDigits: 0 });
  }

  const kiwango = (viwango[kwenda].rate / viwango[kutoka].rate).toFixed(2);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#880e4f" />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.loginKitufe}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginManeno}>Log in</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Hero */}
        <Animated.View style={[styles.hero, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.heroKichwa}>Send Money</Text>
          <Text style={styles.heroKichwa2}>Easly 🚀</Text>
          <Text style={styles.heroMaelezo}>
            Join 5,000,000+ customers sending money internationally. Fast, free, and secure.
          </Text>
        </Animated.View>

        {/* Scrolling countries */}
        <View style={styles.nchiWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.nchiScroll}
          >
            {[...nchiZinazosogea, ...nchiZinazosogea].map((n, i) => (
              <View key={i} style={styles.nchiChip}>
                <Text style={styles.nchiManeno}>{n}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Calculator */}
        <Animated.View style={[styles.calculator, { opacity: fadeAnim }]}>

          <Text style={styles.calcKichwa}>Calculate your transfer</Text>

          <Text style={styles.lebo}>You send</Text>
          <View style={styles.inputSafu}>
            <View style={styles.sarafuBox}>
              <Text style={styles.bendera}>{viwango[kutoka].bendera}</Text>
              <ScrollView style={styles.sarafuScroll} showsVerticalScrollIndicator={false}>
                {Object.keys(viwango).map(s => (
                  <TouchableOpacity
                    key={s}
                    style={[styles.sarafuOption, kutoka === s && styles.sarafuOptionChaguliwa]}
                    onPress={() => setKutoka(s)}
                  >
                    <Text style={[styles.sarafuManeno, kutoka === s && styles.sarafuManenoChaguliwa]}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <TextInput
              style={styles.ingizo}
              value={kiasi}
              onChangeText={setKiasi}
              keyboardType="numeric"
              placeholderTextColor="rgba(255,255,255,0.4)"
            />
          </View>

          <View style={styles.kiwangoSafu}>
            <Text style={styles.kiwangoManeno}>⇅ 1 {kutoka} = {kiwango} {kwenda}</Text>
            <Text style={styles.freeManeno}>✅ No fees</Text>
          </View>

          <Text style={styles.lebo}>They receive</Text>
          <View style={styles.inputSafu}>
            <View style={styles.sarafuBox}>
              <Text style={styles.bendera}>{viwango[kwenda].bendera}</Text>
              <ScrollView style={styles.sarafuScroll} showsVerticalScrollIndicator={false}>
                {Object.keys(viwango).map(s => (
                  <TouchableOpacity
                    key={s}
                    style={[styles.sarafuOption, kwenda === s && styles.sarafuOptionChaguliwa]}
                    onPress={() => setKwenda(s)}
                  >
                    <Text style={[styles.sarafuManeno, kwenda === s && styles.sarafuManenoChaguliwa]}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <TextInput
              style={[styles.ingizo, { color: '#f8bbd0' }]}
              value={hesabu()}
              editable={false}
            />
          </View>

        </Animated.View>

        {/* Features */}
        <View style={styles.features}>
          {[
            { icon: '⚡', text: 'Instant transfers' },
            { icon: '🔒', text: 'Bank-level security' },
            { icon: '💰', text: 'Zero fees' },
            { icon: '🌍', text: '150+ countries' },
          ].map((f, i) => (
            <View key={i} style={styles.featureItem}>
              <Text style={styles.featureIcon}>{f.icon}</Text>
              <Text style={styles.featureManeno}>{f.text}</Text>
            </View>
          ))}
        </View>

        {/* CTA Buttons */}
        <View style={styles.vitufe}>
          <TouchableOpacity
            style={styles.signupKitufe}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.signupManeno}>Create Free Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginKitufeChini}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginKitufeChiniManeno}>I already have an account</Text>
          </TouchableOpacity>
        </View>

        {/* Social Login */}
        <View style={styles.socialSehemu}>
          <Text style={styles.auManeno}>or continue with</Text>
          <View style={styles.socialVitufe}>
            <TouchableOpacity style={styles.appleKitufe}>
              <Text style={styles.appleIcon}></Text>
              <Text style={styles.socialManeno}>Apple</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.googleKitufe}>
              <Text style={styles.googleIcon}>G</Text>
              <Text style={styles.socialManeno}>Google</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.copyright}>© 2025 SendEasly. All rights reserved.</Text>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#880e4f' },
  scroll: { flexGrow: 1, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingTop: 50 },
  logo: { width: 120, height: 50, resizeMode: 'contain' },
  headerRight: { flexDirection: 'row', gap: 10 },
  loginKitufe: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  loginManeno: { color: 'white', fontSize: 14, fontWeight: '600' },
  hero: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 20 },
  heroKichwa: { fontSize: 42, fontWeight: 'bold', color: 'white', lineHeight: 48 },
  heroKichwa2: { fontSize: 42, fontWeight: 'bold', color: '#f8bbd0', lineHeight: 52, marginBottom: 12 },
  heroMaelezo: { fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 22 },
  nchiWrapper: { marginBottom: 20 },
  nchiScroll: { paddingHorizontal: 20, gap: 8 },
  nchiChip: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  nchiManeno: { color: 'white', fontSize: 13, fontWeight: '500' },
  calculator: { backgroundColor: 'rgba(255,255,255,0.12)', marginHorizontal: 20, borderRadius: 20, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  calcKichwa: { color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  lebo: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: '600', marginBottom: 8 },
  inputSafu: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', marginBottom: 10, overflow: 'hidden', alignItems: 'center', height: 56 },
  sarafuBox: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.2)', height: '100%', gap: 4 },
  bendera: { fontSize: 20 },
  sarafuScroll: { maxHeight: 56 },
  sarafuOption: { paddingVertical: 4, paddingHorizontal: 6, borderRadius: 6 },
  sarafuOptionChaguliwa: { backgroundColor: 'rgba(255,255,255,0.2)' },
  sarafuManeno: { color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: '600' },
  sarafuManenoChaguliwa: { color: 'white', fontWeight: 'bold' },
  ingizo: { flex: 1, color: 'white', fontSize: 22, fontWeight: 'bold', textAlign: 'right', paddingHorizontal: 14 },
  kiwangoSafu: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  kiwangoManeno: { color: 'rgba(255,255,255,0.7)', fontSize: 12, backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  freeManeno: { color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: '600' },
  features: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, gap: 10, marginBottom: 24 },
  featureItem: { flex: 1, minWidth: '45%', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' },
  featureIcon: { fontSize: 20 },
  featureManeno: { color: 'white', fontSize: 13, fontWeight: '500', flex: 1 },
  vitufe: { paddingHorizontal: 20, gap: 12, marginBottom: 24 },
  signupKitufe: { backgroundColor: 'white', borderRadius: 30, padding: 18, alignItems: 'center' },
  signupManeno: { color: '#880e4f', fontWeight: 'bold', fontSize: 16 },
  loginKitufeChini: { borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)', borderRadius: 30, padding: 16, alignItems: 'center' },
  loginKitufeChiniManeno: { color: 'white', fontWeight: '600', fontSize: 15 },
  socialSehemu: { alignItems: 'center', paddingHorizontal: 20, marginBottom: 24 },
  auManeno: { color: 'rgba(255,255,255,0.5)', fontSize: 13, marginBottom: 14 },
  socialVitufe: { flexDirection: 'row', gap: 12, width: '100%' },
  appleKitufe: { flex: 1, backgroundColor: 'white', borderRadius: 12, padding: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  appleIcon: { fontSize: 18, color: 'black' },
  googleKitufe: { flex: 1, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  googleIcon: { fontSize: 18, fontWeight: 'bold', color: 'white' },
  socialManeno: { fontSize: 15, fontWeight: 'bold', color: 'black' },
  copyright: { color: 'rgba(255,255,255,0.3)', fontSize: 11, textAlign: 'center', paddingBottom: 10 },
});