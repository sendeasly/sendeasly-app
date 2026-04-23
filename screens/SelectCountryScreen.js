import { useState } from 'react';
import {
    FlatList, StatusBar,
    StyleSheet,
    Text, TextInput, TouchableOpacity,
    View,
} from 'react-native';

const nchiZote = [
  { code: 'TZ', jina: 'Tanzania', bendera: '🇹🇿' },
  { code: 'KE', jina: 'Kenya', bendera: '🇰🇪' },
  { code: 'UG', jina: 'Uganda', bendera: '🇺🇬' },
  { code: 'RW', jina: 'Rwanda', bendera: '🇷🇼' },
  { code: 'ET', jina: 'Ethiopia', bendera: '🇪🇹' },
  { code: 'NG', jina: 'Nigeria', bendera: '🇳🇬' },
  { code: 'GH', jina: 'Ghana', bendera: '🇬🇭' },
  { code: 'ZA', jina: 'South Africa', bendera: '🇿🇦' },
  { code: 'GB', jina: 'United Kingdom', bendera: '🇬🇧' },
  { code: 'US', jina: 'United States', bendera: '🇺🇸' },
  { code: 'CA', jina: 'Canada', bendera: '🇨🇦' },
  { code: 'DE', jina: 'Germany', bendera: '🇩🇪' },
  { code: 'FR', jina: 'France', bendera: '🇫🇷' },
  { code: 'NL', jina: 'Netherlands', bendera: '🇳🇱' },
  { code: 'AE', jina: 'United Arab Emirates', bendera: '🇦🇪' },
  { code: 'AU', jina: 'Australia', bendera: '🇦🇺' },
  { code: 'IN', jina: 'India', bendera: '🇮🇳' },
  { code: 'CN', jina: 'China', bendera: '🇨🇳' },
  { code: 'JP', jina: 'Japan', bendera: '🇯🇵' },
  { code: 'BR', jina: 'Brazil', bendera: '🇧🇷' },
  { code: 'MX', jina: 'Mexico', bendera: '🇲🇽' },
  { code: 'ZM', jina: 'Zambia', bendera: '🇿🇲' },
  { code: 'MW', jina: 'Malawi', bendera: '🇲🇼' },
  { code: 'MZ', jina: 'Mozambique', bendera: '🇲🇿' },
  { code: 'BI', jina: 'Burundi', bendera: '🇧🇮' },
  { code: 'SS', jina: 'South Sudan', bendera: '🇸🇸' },
  { code: 'DJ', jina: 'Djibouti', bendera: '🇩🇯' },
  { code: 'SO', jina: 'Somalia', bendera: '🇸🇴' },
  { code: 'SD', jina: 'Sudan', bendera: '🇸🇩' },
  { code: 'EG', jina: 'Egypt', bendera: '🇪🇬' },
];

export default function SelectCountryScreen({ navigation, route }) {
  const { email, nywila } = route.params || {};
  const [tafuta, setTafuta] = useState('');
  const [chaguliwa, setChaguliwa] = useState(null);

  const zilizochujwa = nchiZote.filter(n =>
    n.jina.toLowerCase().includes(tafuta.toLowerCase())
  );

  function endelea() {
    if (!chaguliwa) return;
    navigation.navigate('SendCountry', { email, nywila, nchiYake: chaguliwa });
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
        <View style={[styles.progressDot, styles.progressDotAmilifu]} />
        <View style={[styles.progressLine, styles.progressLineAmilifu]} />
        <View style={[styles.progressDot, styles.progressDotAmilifu]} />
        <View style={styles.progressLine} />
        <View style={styles.progressDot} />
        <View style={styles.progressLine} />
        <View style={styles.progressDot} />
        <View style={styles.progressLine} />
        <View style={styles.progressDot} />
      </View>

      <Text style={styles.kichwa}>Select your country</Text>
      <Text style={styles.subKichwa}>of residence</Text>

      <View style={styles.tafutaWrapper}>
        <Text style={styles.tafutaIcon}>🔍</Text>
        <TextInput
          style={styles.tafutaIngizo}
          placeholder="Search country..."
          placeholderTextColor="rgba(255,255,255,0.4)"
          value={tafuta}
          onChangeText={setTafuta}
        />
        {tafuta ? (
          <TouchableOpacity onPress={() => setTafuta('')}>
            <Text style={styles.futa}>✕</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <FlatList
        data={zilizochujwa}
        keyExtractor={item => item.code}
        style={styles.orodha}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.nchiItem, chaguliwa?.code === item.code && styles.nchiItemChaguliwa]}
            onPress={() => setChaguliwa(item)}
          >
            <Text style={styles.nchiBendera}>{item.bendera}</Text>
            <Text style={styles.nchiJina}>{item.jina}</Text>
            {chaguliwa?.code === item.code && (
              <View style={styles.checkCircle}>
                <Text style={styles.checkManeno}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      />

      <View style={styles.chiniSehemu}>
        <TouchableOpacity
          style={[styles.continueKitufe, !chaguliwa && styles.kitufeDisabled]}
          onPress={endelea}
          disabled={!chaguliwa}
        >
          <Text style={styles.continueManeno}>
            {chaguliwa ? 'Continue with ' + chaguliwa.jina : 'Select a country'}
          </Text>
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
  kichwa: { fontSize: 26, fontWeight: 'bold', color: 'white', paddingHorizontal: 20 },
  subKichwa: { fontSize: 15, color: 'rgba(255,255,255,0.7)', paddingHorizontal: 20, marginBottom: 20 },
  tafutaWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)', marginHorizontal: 20, borderRadius: 30, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', gap: 8 },
  tafutaIcon: { fontSize: 16 },
  tafutaIngizo: { flex: 1, fontSize: 15, color: 'white' },
  futa: { color: 'rgba(255,255,255,0.6)', fontSize: 16, padding: 4 },
  orodha: { flex: 1, paddingHorizontal: 20 },
  nchiItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: 16, marginBottom: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', gap: 14 },
  nchiItemChaguliwa: { backgroundColor: 'rgba(255,255,255,0.25)', borderColor: 'white' },
  nchiBendera: { fontSize: 26 },
  nchiJina: { flex: 1, color: 'white', fontSize: 15, fontWeight: '500' },
  checkCircle: { width: 24, height: 24, borderRadius: 12, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' },
  checkManeno: { color: '#880e4f', fontSize: 14, fontWeight: 'bold' },
  chiniSehemu: { padding: 20, backgroundColor: '#880e4f', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)' },
  continueKitufe: { backgroundColor: 'white', borderRadius: 30, padding: 18, alignItems: 'center' },
  kitufeDisabled: { backgroundColor: 'rgba(255,255,255,0.3)' },
  continueManeno: { color: '#880e4f', fontWeight: 'bold', fontSize: 16 },
});