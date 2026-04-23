import React, { useState } from 'react';
import {
    FlatList,
    Modal,
    ScrollView, StatusBar,
    StyleSheet,
    Text, TextInput, TouchableOpacity,
    View,
} from 'react-native';

const countryCodesData = [
  { code: '+255', jina: 'Tanzania', bendera: '🇹🇿' },
  { code: '+254', jina: 'Kenya', bendera: '🇰🇪' },
  { code: '+256', jina: 'Uganda', bendera: '🇺🇬' },
  { code: '+250', jina: 'Rwanda', bendera: '🇷🇼' },
  { code: '+251', jina: 'Ethiopia', bendera: '🇪🇹' },
  { code: '+234', jina: 'Nigeria', bendera: '🇳🇬' },
  { code: '+233', jina: 'Ghana', bendera: '🇬🇭' },
  { code: '+27', jina: 'South Africa', bendera: '🇿🇦' },
  { code: '+44', jina: 'United Kingdom', bendera: '🇬🇧' },
  { code: '+1', jina: 'United States', bendera: '🇺🇸' },
  { code: '+1', jina: 'Canada', bendera: '🇨🇦' },
  { code: '+49', jina: 'Germany', bendera: '🇩🇪' },
  { code: '+33', jina: 'France', bendera: '🇫🇷' },
  { code: '+31', jina: 'Netherlands', bendera: '🇳🇱' },
  { code: '+971', jina: 'UAE', bendera: '🇦🇪' },
  { code: '+61', jina: 'Australia', bendera: '🇦🇺' },
];

export default function PhoneNumberScreen({ navigation, route }) {
  const { email, nywila, nchiYake, nchiTuma } = route.params || {};
  const [simu, setSimu] = useState('');
  const [nchi, setNchi] = useState(countryCodesData[0]);
  const [modalWazi, setModalWazi] = useState(false);
  const [inatuma, setInatuma] = useState(false);

  async function endelea() {
    if (!simu || simu.length < 6) return;
    setInatuma(true);
    await new Promise(r => setTimeout(r, 1500));
    setInatuma(false);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    navigation.navigate('OTPScreen', {
      email, nywila, nchiYake, nchiTuma,
      simu: nchi.code + ' ' + simu,
      otp,
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#880e4f" />

      <Modal visible={modalWazi} transparent animationType="slide" onRequestClose={() => setModalWazi(false)}>
        <View style={styles.modalBg}>
          <View style={styles.modalKadi}>
            <Text style={styles.modalKichwa}>Select Country Code</Text>
            <FlatList
              data={countryCodesData}
              keyExtractor={(item, index) => index.toString()}
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
            <TouchableOpacity style={styles.modalFunga} onPress={() => setModalWazi(false)}>
              <Text style={styles.modalFungaManeno}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
          {[0,1,2,3,4].map((i) => (
            <React.Fragment key={i}>
              <View style={[styles.progressDot, i <= 2 && styles.progressDotAmilifu]} />
              {i < 4 && <View style={[styles.progressLine, i < 2 && styles.progressLineAmilifu]} />}
            </React.Fragment>
          ))}
        </View>

        <View style={styles.iconSehemu}>
          <Text style={styles.icon}>📱</Text>
        </View>

        <Text style={styles.kichwa}>Enter your phone number</Text>
        <Text style={styles.subKichwa}>We will send you a verification code</Text>

        <View style={styles.simuWrapper}>
          <TouchableOpacity style={styles.countryCode} onPress={() => setModalWazi(true)}>
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

        <Text style={styles.maelezo}>
          A 6-digit verification code will be sent to {nchi.code} {simu || 'your number'}
        </Text>

        <TouchableOpacity
          style={[styles.continueKitufe, (!simu || simu.length < 6) && styles.kitufeDisabled]}
          onPress={endelea}
          disabled={!simu || simu.length < 6 || inatuma}
        >
          <Text style={styles.continueManeno}>
            {inatuma ? 'Sending code...' : 'Send Verification Code'}
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#880e4f' },
  scroll: { flexGrow: 1, padding: 20, paddingTop: 0, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20, paddingTop: 50 },
  rudiKitufe: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  rudiManeno: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  helpKitufe: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  helpManeno: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  progressBar: { flexDirection: 'row', alignItems: 'center', marginBottom: 32 },
  progressDot: { width: 14, height: 14, borderRadius: 7, borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)', backgroundColor: 'transparent' },
  progressDotAmilifu: { backgroundColor: 'white', borderColor: 'white' },
  progressLine: { flex: 1, height: 2, backgroundColor: 'rgba(255,255,255,0.3)' },
  progressLineAmilifu: { backgroundColor: 'white' },
  iconSehemu: { alignItems: 'center', marginBottom: 24 },
  icon: { fontSize: 64 },
  kichwa: { fontSize: 26, fontWeight: 'bold', color: 'white', marginBottom: 8, textAlign: 'center' },
  subKichwa: { fontSize: 14, color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginBottom: 32 },
  simuWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', marginBottom: 16, overflow: 'hidden' },
  countryCode: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 16, gap: 6, backgroundColor: 'rgba(255,255,255,0.1)' },
  bendera: { fontSize: 20 },
  codeManeno: { color: 'white', fontSize: 15, fontWeight: '600' },
  chevron: { color: 'rgba(255,255,255,0.6)', fontSize: 12 },
  simuSeparator: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.2)' },
  simuIngizo: { flex: 1, color: 'white', fontSize: 18, paddingHorizontal: 14, paddingVertical: 16, fontWeight: '600' },
  maelezo: { color: 'rgba(255,255,255,0.6)', fontSize: 13, textAlign: 'center', marginBottom: 32, lineHeight: 20 },
  continueKitufe: { backgroundColor: 'white', borderRadius: 30, padding: 18, alignItems: 'center' },
  kitufeDisabled: { backgroundColor: 'rgba(255,255,255,0.3)' },
  continueManeno: { color: '#880e4f', fontWeight: 'bold', fontSize: 16 },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalKadi: { backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '70%' },
  modalKichwa: { fontSize: 18, fontWeight: 'bold', color: '#880e4f', marginBottom: 16, textAlign: 'center' },
  modalItem: { flexDirection: 'row', alignItems: 'center', padding: 14, borderBottomWidth: 1, borderBottomColor: '#f5f5f5', gap: 12 },
  modalBendera: { fontSize: 24 },
  modalJina: { flex: 1, fontSize: 15, color: '#1a1a1a', fontWeight: '500' },
  modalCode: { fontSize: 14, color: '#888' },
  modalFunga: { backgroundColor: '#f5f5f5', borderRadius: 12, padding: 14, alignItems: 'center', marginTop: 12 },
  modalFungaManeno: { color: '#880e4f', fontWeight: 'bold', fontSize: 16 },
});