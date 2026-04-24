import { useEffect, useRef, useState } from 'react';
import {
  Animated, Dimensions, Image,
  StatusBar,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const viwango = {
  EUR: { rate: 0.92, bendera: '🇪🇺', jina: 'Euro' },
  USD: { rate: 1, bendera: '🇺🇸', jina: 'US Dollar' },
  GBP: { rate: 0.79, bendera: '🇬🇧', jina: 'British Pound' },
  TZS: { rate: 2578, bendera: '🇹🇿', jina: 'Tanzanian Shilling' },
  KES: { rate: 129, bendera: '🇰🇪', jina: 'Kenyan Shilling' },
  UGX: { rate: 3780, bendera: '🇺🇬', jina: 'Ugandan Shilling' },
  AED: { rate: 3.67, bendera: '🇦🇪', jina: 'UAE Dirham' },
  CAD: { rate: 1.36, bendera: '🇨🇦', jina: 'Canadian Dollar' },
};

const stats = [
  { nambari: '5M+', maelezo: 'Customers' },
  { nambari: '150+', maelezo: 'Countries' },
  { nambari: '0%', maelezo: 'Fees' },
];

export default function LandingScreen({ navigation }) {
  const [kiasi, setKiasi] = useState('1000');
  const [kutoka, setKutoka] = useState('EUR');
  const [kwenda, setKwenda] = useState('TZS');
  const [showKutoka, setShowKutoka] = useState(false);
  const [showKwenda, setShowKwenda] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 50, friction: 8, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.05, duration: 1500, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 1500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  function hesabu() {
    const n = parseFloat(kiasi) || 0;
    return (n / viwango[kutoka].rate * viwango[kwenda].rate).toLocaleString('en-US', { maximumFractionDigits: 0 });
  }

  const kiwango = (viwango[kwenda].rate / viwango[kutoka].rate).toFixed(2);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Background circles */}
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />
      <View style={styles.bgCircle3} />

      {/* Top Bar */}
      <Animated.View style={[styles.topBar, { opacity: fadeAnim }]}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginBtnText}>Log in</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Hero Text */}
      <Animated.View style={[styles.heroSection, {
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }]
      }]}>
        <View style={styles.badge}>
          <Text style={styles.badgeDot}>●</Text>
          <Text style={styles.badgeText}>Trusted by 5M+ people worldwide</Text>
        </View>
        <Text style={styles.heroTitle}>The Smartest{'\n'}Way to Send{'\n'}
          <Text style={styles.heroTitleHighlight}>Money Home</Text>
        </Text>
        <Text style={styles.heroSub}>
          Instant transfers. Zero fees.{'\n'}150+ countries. Always secure.
        </Text>
      </Animated.View>

      {/* Stats Row */}
      <Animated.View style={[styles.statsRow, { opacity: fadeAnim }]}>
        {stats.map((s, i) => (
          <View key={i} style={styles.statItem}>
            <Text style={styles.statNambari}>{s.nambari}</Text>
            <Text style={styles.statMaelezo}>{s.maelezo}</Text>
          </View>
        ))}
      </Animated.View>

      {/* Calculator Card */}
      <Animated.View style={[styles.calcCard, {
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }]
      }]}>

        {/* You send */}
        <View style={styles.calcRow}>
          <View style={styles.calcLeft}>
            <Text style={styles.calcLebo}>You send</Text>
            <TouchableOpacity
              style={styles.currencyBtn}
              onPress={() => { setShowKutoka(!showKutoka); setShowKwenda(false); }}
            >
              <Text style={styles.currencyFlag}>{viwango[kutoka].bendera}</Text>
              <Text style={styles.currencyCode}>{kutoka}</Text>
              <Text style={styles.currencyChevron}>▾</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.amountInput}
            value={kiasi}
            onChangeText={setKiasi}
            keyboardType="numeric"
            placeholderTextColor="rgba(255,255,255,0.3)"
          />
        </View>

        {/* Currency dropdown kutoka */}
        {showKutoka && (
          <View style={styles.dropdown}>
            {Object.keys(viwango).map(s => (
              <TouchableOpacity
                key={s}
                style={[styles.dropItem, kutoka === s && styles.dropItemActive]}
                onPress={() => { setKutoka(s); setShowKutoka(false); }}
              >
                <Text style={styles.dropFlag}>{viwango[s].bendera}</Text>
                <Text style={styles.dropCode}>{s}</Text>
                <Text style={styles.dropName}>{viwango[s].jina}</Text>
                {kutoka === s && <Text style={styles.dropCheck}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <View style={styles.swapBtn}>
            <Text style={styles.swapIcon}>⇅</Text>
          </View>
          <View style={styles.dividerRight}>
            <Text style={styles.rateText}>1 {kutoka} = {kiwango} {kwenda}</Text>
          </View>
        </View>

        {/* They receive */}
        <View style={styles.calcRow}>
          <View style={styles.calcLeft}>
            <Text style={styles.calcLebo}>They receive</Text>
            <TouchableOpacity
              style={styles.currencyBtn}
              onPress={() => { setShowKwenda(!showKwenda); setShowKutoka(false); }}
            >
              <Text style={styles.currencyFlag}>{viwango[kwenda].bendera}</Text>
              <Text style={styles.currencyCode}>{kwenda}</Text>
              <Text style={styles.currencyChevron}>▾</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.receiveAmount}>{hesabu()}</Text>
        </View>

        {/* Currency dropdown kwenda */}
        {showKwenda && (
          <View style={styles.dropdown}>
            {Object.keys(viwango).map(s => (
              <TouchableOpacity
                key={s}
                style={[styles.dropItem, kwenda === s && styles.dropItemActive]}
                onPress={() => { setKwenda(s); setShowKwenda(false); }}
              >
                <Text style={styles.dropFlag}>{viwango[s].bendera}</Text>
                <Text style={styles.dropCode}>{s}</Text>
                <Text style={styles.dropName}>{viwango[s].jina}</Text>
                {kwenda === s && <Text style={styles.dropCheck}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* No fees */}
        <View style={styles.noFeeRow}>
          <Text style={styles.noFeeIcon}>✅</Text>
          <Text style={styles.noFeeText}>No transfer fees on this transfer</Text>
        </View>

      </Animated.View>

      {/* CTA Buttons */}
      <Animated.View style={[styles.ctaSection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <Animated.View style={{ transform: [{ scale: pulse }] }}>
          <TouchableOpacity
            style={styles.createBtn}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.createBtnText}>Create Free Account →</Text>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity
          style={styles.alreadyBtn}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.alreadyBtnText}>I already have an account</Text>
        </TouchableOpacity>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialBtn}>
            <Text style={styles.socialBtnIcon}></Text>
            <Text style={styles.socialBtnText}>Apple</Text>
          </TouchableOpacity>
          <View style={styles.socialDivider} />
          <TouchableOpacity style={styles.socialBtn}>
            <Text style={[styles.socialBtnIcon, { fontFamily: undefined, fontSize: 16, fontWeight: 'bold' }]}>G</Text>
            <Text style={styles.socialBtnText}>Google</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d1a',
  },

  // Background
  bgCircle1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#880e4f',
    top: -80,
    right: -80,
    opacity: 0.6,
  },
  bgCircle2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#c2185b',
    top: 100,
    left: -60,
    opacity: 0.3,
  },
  bgCircle3: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#4a0030',
    bottom: 100,
    right: -60,
    opacity: 0.4,
  },

  // Top Bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 8,
  },
  logo: { width: 110, height: 44, resizeMode: 'contain' },
  loginBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  loginBtnText: { color: 'white', fontSize: 14, fontWeight: '600' },

  // Hero
  heroSection: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 16 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(194,24,91,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(194,24,91,0.4)',
  },
  badgeDot: { color: '#c2185b', fontSize: 8 },
  badgeText: { color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: '500' },
  heroTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'white',
    lineHeight: 42,
    marginBottom: 10,
  },
  heroTitleHighlight: { color: '#f48fb1' },
  heroSub: { fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 22 },

  // Stats
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 0,
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.1)',
  },
  statNambari: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  statMaelezo: { color: 'rgba(255,255,255,0.5)', fontSize: 11, marginTop: 2 },

  // Calculator
  calcCard: {
    marginHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    marginBottom: 16,
  },
  calcRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 },
  calcLeft: { gap: 6 },
  calcLebo: { color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: '600', textTransform: 'uppercase' },
  currencyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  currencyFlag: { fontSize: 20 },
  currencyCode: { color: 'white', fontSize: 15, fontWeight: 'bold' },
  currencyChevron: { color: 'rgba(255,255,255,0.5)', fontSize: 11 },
  amountInput: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'right',
    flex: 1,
    paddingLeft: 12,
  },
  receiveAmount: {
    color: '#f48fb1',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'right',
    flex: 1,
    paddingLeft: 12,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 8,
  },
  dividerLine: { width: 1, height: 20, backgroundColor: 'rgba(255,255,255,0.15)' },
  swapBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(194,24,91,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(194,24,91,0.5)',
  },
  swapIcon: { color: '#f48fb1', fontSize: 14, fontWeight: 'bold' },
  dividerRight: { flex: 1 },
  rateText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  noFeeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
    backgroundColor: 'rgba(0,200,0,0.1)',
    borderRadius: 8,
    padding: 8,
  },
  noFeeIcon: { fontSize: 14 },
  noFeeText: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: '500' },

  // Dropdown
  dropdown: {
    backgroundColor: '#1a0a2e',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    maxHeight: 200,
    overflow: 'hidden',
  },
  dropItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  dropItemActive: { backgroundColor: 'rgba(194,24,91,0.2)' },
  dropFlag: { fontSize: 20 },
  dropCode: { color: 'white', fontSize: 14, fontWeight: 'bold', width: 40 },
  dropName: { flex: 1, color: 'rgba(255,255,255,0.6)', fontSize: 13 },
  dropCheck: { color: '#c2185b', fontWeight: 'bold', fontSize: 16 },

  // CTA
  ctaSection: { paddingHorizontal: 16, gap: 10 },
  createBtn: {
    backgroundColor: '#c2185b',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#c2185b',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  createBtnText: { color: 'white', fontSize: 17, fontWeight: 'bold' },
  alreadyBtn: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  alreadyBtnText: { color: 'rgba(255,255,255,0.8)', fontSize: 15, fontWeight: '600' },
  socialRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    gap: 8,
  },
  socialDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.12)' },
  socialBtnIcon: { fontSize: 18, color: 'white' },
  socialBtnText: { color: 'white', fontSize: 14, fontWeight: '600' },
});