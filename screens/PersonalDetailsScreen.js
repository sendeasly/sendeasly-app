import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
    FlatList,
    Modal,
    ScrollView, StatusBar,
    StyleSheet,
    Text, TextInput, TouchableOpacity,
    View,
} from 'react-native';

const nchiZote = [
  { code: 'TZ', jina: 'Tanzania', bendera: '🇹🇿' },
  { code: 'KE', jina: 'Kenya', bendera: '🇰🇪' },
  { code: 'UG', jina: 'Uganda', bendera: '🇺🇬' },
  { code: 'RW', jina: 'Rwanda', bendera: '🇷🇼' },
  { code: 'NG', jina: 'Nigeria', bendera: '🇳🇬' },
  { code: 'GH', jina: 'Ghana', bendera: '🇬🇭' },
  { code: 'ZA', jina: 'South Africa', bendera: '🇿🇦' },
  { code: 'GB', jina: 'United Kingdom', bendera: '🇬🇧' },
  { code: 'US', jina: 'United States', bendera: '🇺🇸' },
  { code: 'CA', jina: 'Canada', bendera: '🇨🇦' },
  { code: 'DE', jina: 'Germany', bendera: '🇩🇪' },
  { code: 'FR', jina: 'France', bendera: '🇫🇷' },
  { code: 'AE', jina: 'UAE', bendera: '🇦🇪' },
];

const jinsia = ['Male', 'Female', 'Prefer not to say'];

export default function PersonalDetailsScreen({ navigation, route }) {
  const { email, nywila, nchiYake, nchiTuma, simu } = route.params || {};
  const [jinaKwanza, setJinaKwanza] = useState('');
  const [jinaKati, setJinaKati] = useState('');
  const [jinaMwisho, setJinaMwisho] = useState('');
  const [umri, setUmri] = useState('');
  const [jinsiYake, setJinsiYake] = useState('');
  const [nchiChaguliwa, setNchiChaguliwa] = useState(nchiYake || null);
  const [modalNchi, setModalNchi] = useState(false);
  const [modalJinsi, setModalJinsi] = useState(false);
  const [inapakia, setInapakia] = useState(false);
  const [kosa, setKosa] = useState('');

  async function kamilisha() {
    if (!jinaKwanza) { setKosa('First name is required'); return; }
    if (!jinaMwisho) { setKosa('Last name is required'); return; }
    if (!umri || parseInt(umri) < 18) { setKosa('You must be at least 18 years old'); return; }
    if (!jinsiYake) { setKosa('Please select your gender'); return; }

    setKosa('');
    setInapakia(true);

    try {
      const jibu = await fetch('http://localhost:5001/sajili', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jina: jinaKwanza + ' ' + jinaMwisho,
          email,
          nywila,
          simu,
          nchiYake: nchiChaguliwa?.jina,
          nchiTuma: nchiTuma?.jina,
          jinsi: jinsiYake,
          umri,
        }),
      });

      const data = await jibu.json();

      if (jibu.ok) {
        await AsyncStorage.setItem('mtumiaji', JSON.stringify(data.mtumiaji));
        navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
      } else {
        setKosa(data.kosa || 'Registration failed');
      }
    } catch (e) {
      setKosa('Network error. Please try again.');
    }

    setInapakia(false);
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#880e4f" />

      {/* Modal Nchi */}
      <Modal visible={modalNchi} transparent animationType="slide" onRequestClose={() => setModalNchi(false)}>
        <View style={styles.modalBg}>
          <View style={styles.modalKadi}>
            <Text style={styles.modalKichwa}>Select Country of Residence</Text>
            <FlatList
              data={nchiZote}
              keyExtractor={item => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => { setNchiChaguliwa(item); setModalNchi(false); }}
                >
                  <Text style={styles.modalBendera}>{item.bendera}</Text>
                  <Text style={styles.modalJina}>{item.jina}</Text>
                  {nchiChaguliwa?.code === item.code && (
                    <Text style={{ color: '#880e4f', fontWeight: 'bold' }}>✓</Text>
                  )}
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.modalFunga} onPress={() => setModalNchi(false)}>
              <Text style={styles.modalFungaManeno}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Jinsi */}
      <Modal visible={modalJinsi} transparent animationType="slide" onRequestClose={() => setModalJinsi(false)}>
        <View style={styles.modalBg}>
          <View style={styles.modalKadi}>
            <Text style={styles.modalKichwa}>Select Gender</Text>
            {jinsia.map(j => (
              <TouchableOpacity
                key={j}
                style={styles.modalItem}
                onPress={() => { setJinsiYake(j); setModalJinsi(false); }}
              >
                <Text style={styles.modalJina}>{j}</Text>
                {jinsiYake === j && <Text style={{ color: '#880e4f', fontWeight: 'bold' }}>✓</Text>}
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.modalFunga} onPress={() => setModalJinsi(false)}>
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
              <View style={[styles.progressDot, styles.progressDotAmilifu]} />
              {i < 4 && <View style={[styles.progressLine, styles.progressLineAmilifu]} />}
            </React.Fragment>
          ))}
        </View>

        <Text style={styles.kichwa}>Almost done! 🎉</Text>
        <Text style={styles.subKichwa}>Tell us a bit about yourself</Text>

        {kosa ? (
          <View style={styles.kosaBox}>
            <Text style={styles.kosaManeno}>{kosa}</Text>
          </View>
        ) : null}

        <View style={styles.form}>

          {/* First Name */}
          <Text style={styles.lebo}>First Name *</Text>
          <View style={styles.ingizoWrapper}>
            <TextInput
              style={styles.ingizo}
              placeholder="First name"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={jinaKwanza}
              onChangeText={setJinaKwanza}
            />
          </View>

          {/* Middle Name */}
          <Text style={styles.lebo}>Middle Name <Text style={styles.optional}>(optional)</Text></Text>
          <View style={styles.ingizoWrapper}>
            <TextInput
              style={styles.ingizo}
              placeholder="Middle name (optional)"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={jinaKati}
              onChangeText={setJinaKati}
            />
          </View>

          {/* Last Name */}
          <Text style={styles.lebo}>Last Name *</Text>
          <View style={styles.ingizoWrapper}>
            <TextInput
              style={styles.ingizo}
              placeholder="Last name"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={jinaMwisho}
              onChangeText={setJinaMwisho}
            />
          </View>

          {/* Age */}
          <Text style={styles.lebo}>Age *</Text>
          <View style={styles.ingizoWrapper}>
            <TextInput
              style={styles.ingizo}
              placeholder="Your age"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={umri}
              onChangeText={setUmri}
              keyboardType="numeric"
              maxLength={3}
            />
          </View>

          {/* Gender */}
          <Text style={styles.lebo}>Gender *</Text>
          <TouchableOpacity style={styles.dropdownWrapper} onPress={() => setModalJinsi(true)}>
            <Text style={[styles.dropdownManeno, !jinsiYake && styles.placeholder]}>
              {jinsiYake || 'Select gender'}
            </Text>
            <Text style={styles.chevron}>▾</Text>
          </TouchableOpacity>

          {/* Country of Residence */}
          <Text style={styles.lebo}>Country of Residence *</Text>
          <TouchableOpacity style={styles.dropdownWrapper} onPress={() => setModalNchi(true)}>
            <Text style={styles.dropdownManeno}>
              {nchiChaguliwa ? nchiChaguliwa.bendera + ' ' + nchiChaguliwa.jina : 'Select country'}
            </Text>
            <Text style={styles.chevron}>▾</Text>
          </TouchableOpacity>

        </View>

        <TouchableOpacity
          style={[styles.continueKitufe, inapakia && styles.kitufeDisabled]}
          onPress={kamilisha}
          disabled={inapakia}
        >
          <Text style={styles.continueManeno}>
            {inapakia ? 'Creating account...' : 'Complete Registration 🚀'}
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
  progressBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 24 },
  progressDot: { width: 14, height: 14, borderRadius: 7, borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)', backgroundColor: 'transparent' },
  progressDotAmilifu: { backgroundColor: 'white', borderColor: 'white' },
  progressLine: { flex: 1, height: 2, backgroundColor: 'rgba(255,255,255,0.3)' },
  progressLineAmilifu: { backgroundColor: 'white' },
  kichwa: { fontSize: 26, fontWeight: 'bold', color: 'white', paddingHorizontal: 20, marginBottom: 6 },
  subKichwa: { fontSize: 14, color: 'rgba(255,255,255,0.7)', paddingHorizontal: 20, marginBottom: 20 },
  kosaBox: { backgroundColor: 'rgba(255,0,0,0.2)', marginHorizontal: 20, borderRadius: 10, padding: 12, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' },
  kosaManeno: { color: '#ff6b6b', fontSize: 13 },
  form: { paddingHorizontal: 20 },
  lebo: { color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: '600', marginBottom: 8, marginTop: 16 },
  optional: { color: 'rgba(255,255,255,0.4)', fontWeight: '400' },
  ingizoWrapper: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', marginBottom: 4 },
  ingizo: { color: 'white', fontSize: 16, padding: 14 },
  dropdownWrapper: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  dropdownManeno: { color: 'white', fontSize: 16 },
  placeholder: { color: 'rgba(255,255,255,0.4)' },
  chevron: { color: 'rgba(255,255,255,0.6)', fontSize: 14 },
  continueKitufe: { backgroundColor: 'white', borderRadius: 30, padding: 18, alignItems: 'center', marginHorizontal: 20, marginTop: 24 },
  kitufeDisabled: { opacity: 0.7 },
  continueManeno: { color: '#880e4f', fontWeight: 'bold', fontSize: 16 },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalKadi: { backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '70%' },
  modalKichwa: { fontSize: 18, fontWeight: 'bold', color: '#880e4f', marginBottom: 16, textAlign: 'center' },
  modalItem: { flexDirection: 'row', alignItems: 'center', padding: 14, borderBottomWidth: 1, borderBottomColor: '#f5f5f5', gap: 12 },
  modalBendera: { fontSize: 24 },
  modalJina: { flex: 1, fontSize: 15, color: '#1a1a1a', fontWeight: '500' },
  modalFunga: { backgroundColor: '#f5f5f5', borderRadius: 12, padding: 14, alignItems: 'center', marginTop: 12 },
  modalFungaManeno: { color: '#880e4f', fontWeight: 'bold', fontSize: 16 },
});