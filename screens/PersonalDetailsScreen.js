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

const miezi = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const jinsia = ['Male', 'Female', 'Prefer not to say'];
const sasa = new Date().getFullYear();
const miaka = Array.from({length: 82}, (_, i) => sasa - 18 - i);
const siku = Array.from({length: 31}, (_, i) => i + 1);

export default function PersonalDetailsScreen({ navigation, route }) {
  const { email, nywila, nchiYake, nchiTuma, simu } = route.params || {};
  const [jinaKwanza, setJinaKwanza] = useState('');
  const [jinaKati, setJinaKati] = useState('');
  const [jinaMwisho, setJinaMwisho] = useState('');
  const [jinsiYake, setJinsiYake] = useState('');
  const [nchiChaguliwa, setNchiChaguliwa] = useState(nchiYake || null);
  const [tarehe, setTarehe] = useState({ siku: null, mwezi: null, mwaka: null });
  const [modalNchi, setModalNchi] = useState(false);
  const [modalJinsi, setModalJinsi] = useState(false);
  const [modalTarehe, setModalTarehe] = useState(false);
  const [inapakia, setInapakia] = useState(false);
  const [kosa, setKosa] = useState('');

  const tareheMaandishi = tarehe.siku && tarehe.mwezi && tarehe.mwaka
    ? `${String(tarehe.siku).padStart(2,'0')} ${miezi[tarehe.mwezi-1]} ${tarehe.mwaka}`
    : null;

  async function kamilisha() {
    if (!jinaKwanza) { setKosa('First name is required'); return; }
    if (!jinaMwisho) { setKosa('Last name is required'); return; }
    if (!tarehe.siku || !tarehe.mwezi || !tarehe.mwaka) { setKosa('Please select your date of birth'); return; }
    if (!jinsiYake) { setKosa('Please select your gender'); return; }
    setKosa('');
    setInapakia(true);
    try {
      const umri = (sasa - tarehe.mwaka).toString();
      const jibu = await fetch('https://money-transfer-backend-production.up.railway.app/sajili', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jina: jinaKwanza + ' ' + jinaMwisho,
          email, nywila, simu,
          nchiYake: nchiChaguliwa?.jina,
          nchiTuma: nchiTuma?.jina,
          jinsi: jinsiYake, umri,
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

      {/* Modal Tarehe */}
      <Modal visible={modalTarehe} transparent animationType="slide" onRequestClose={() => setModalTarehe(false)}>
        <View style={styles.modalBg}>
          <View style={styles.modalKadi}>
            <Text style={styles.modalKichwa}>Select Date of Birth</Text>

            <View style={styles.pickerRow}>
              {/* Day */}
              <View style={styles.pickerCol}>
                <Text style={styles.pickerLebo}>Day</Text>
                <FlatList
                  data={siku}
                  keyExtractor={i => i.toString()}
                  showsVerticalScrollIndicator={false}
                  style={styles.pickerList}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={[styles.pickerItem, tarehe.siku === item && styles.pickerItemChaguliwa]}
                      onPress={() => setTarehe(p => ({...p, siku: item}))}
                    >
                      <Text style={[styles.pickerManeno, tarehe.siku === item && styles.pickerManenoChaguliwa]}>
                        {String(item).padStart(2,'0')}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>

              {/* Month */}
              <View style={[styles.pickerCol, {flex: 1.8}]}>
                <Text style={styles.pickerLebo}>Month</Text>
                <FlatList
                  data={miezi}
                  keyExtractor={i => i}
                  showsVerticalScrollIndicator={false}
                  style={styles.pickerList}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      style={[styles.pickerItem, tarehe.mwezi === index+1 && styles.pickerItemChaguliwa]}
                      onPress={() => setTarehe(p => ({...p, mwezi: index+1}))}
                    >
                      <Text style={[styles.pickerManeno, tarehe.mwezi === index+1 && styles.pickerManenoChaguliwa]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>

              {/* Year */}
              <View style={styles.pickerCol}>
                <Text style={styles.pickerLebo}>Year</Text>
                <FlatList
                  data={miaka}
                  keyExtractor={i => i.toString()}
                  showsVerticalScrollIndicator={false}
                  style={styles.pickerList}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={[styles.pickerItem, tarehe.mwaka === item && styles.pickerItemChaguliwa]}
                      onPress={() => setTarehe(p => ({...p, mwaka: item}))}
                    >
                      <Text style={[styles.pickerManeno, tarehe.mwaka === item && styles.pickerManenoChaguliwa]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.modalKitufe}
              onPress={() => setModalTarehe(false)}
            >
              <Text style={styles.modalKitufeManeno}>
                {tareheMaandishi ? 'Confirm — ' + tareheMaandishi : 'Confirm'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Nchi */}
      <Modal visible={modalNchi} transparent animationType="slide" onRequestClose={() => setModalNchi(false)}>
        <View style={styles.modalBg}>
          <View style={styles.modalKadi}>
            <Text style={styles.modalKichwa}>Country of Residence</Text>
            <FlatList
              data={nchiZote}
              keyExtractor={item => item.code}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[styles.nchiItem, nchiChaguliwa?.code === item.code && styles.nchiItemChaguliwa]}
                  onPress={() => { setNchiChaguliwa(item); setModalNchi(false); }}
                >
                  <Text style={styles.nchiBendera}>{item.bendera}</Text>
                  <Text style={styles.nchiJina}>{item.jina}</Text>
                  {nchiChaguliwa?.code === item.code && (
                    <Text style={styles.check}>✓</Text>
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
                style={[styles.nchiItem, jinsiYake === j && styles.nchiItemChaguliwa]}
                onPress={() => { setJinsiYake(j); setModalJinsi(false); }}
              >
                <Text style={styles.nchiJina}>{j}</Text>
                {jinsiYake === j && <Text style={styles.check}>✓</Text>}
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

          <Text style={styles.lebo}>Date of Birth *</Text>
          <TouchableOpacity style={styles.dropdownWrapper} onPress={() => setModalTarehe(true)}>
            <Text style={styles.calendarIcon}>📅</Text>
            <Text style={[styles.dropdownManeno, !tareheMaandishi && styles.placeholder]}>
              {tareheMaandishi || 'Select date of birth'}
            </Text>
            <Text style={styles.chevron}>▾</Text>
          </TouchableOpacity>

          <Text style={styles.lebo}>Gender *</Text>
          <TouchableOpacity style={styles.dropdownWrapper} onPress={() => setModalJinsi(true)}>
            <Text style={styles.calendarIcon}>👤</Text>
            <Text style={[styles.dropdownManeno, !jinsiYake && styles.placeholder]}>
              {jinsiYake || 'Select gender'}
            </Text>
            <Text style={styles.chevron}>▾</Text>
          </TouchableOpacity>

          <Text style={styles.lebo}>Country of Residence *</Text>
          <TouchableOpacity style={styles.dropdownWrapper} onPress={() => setModalNchi(true)}>
            <Text style={styles.calendarIcon}>{nchiChaguliwa?.bendera || '🌍'}</Text>
            <Text style={[styles.dropdownManeno, !nchiChaguliwa && styles.placeholder]}>
              {nchiChaguliwa?.jina || 'Select country'}
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
  ingizoWrapper: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  ingizo: { color: 'white', fontSize: 16, padding: 14 },
  dropdownWrapper: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10 },
  calendarIcon: { fontSize: 20 },
  dropdownManeno: { flex: 1, color: 'white', fontSize: 15 },
  placeholder: { color: 'rgba(255,255,255,0.4)' },
  chevron: { color: 'rgba(255,255,255,0.6)', fontSize: 14 },
  continueKitufe: { backgroundColor: 'white', borderRadius: 30, padding: 18, alignItems: 'center', marginHorizontal: 20, marginTop: 24 },
  kitufeDisabled: { opacity: 0.7 },
  continueManeno: { color: '#880e4f', fontWeight: 'bold', fontSize: 16 },

  // Modal
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalKadi: { backgroundColor: '#1a0a2e', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: '80%' },
  modalKichwa: { fontSize: 18, fontWeight: 'bold', color: 'white', marginBottom: 16, textAlign: 'center' },

  // Date Picker
  pickerRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  pickerCol: { flex: 1 },
  pickerLebo: { color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: '600', textAlign: 'center', marginBottom: 8, textTransform: 'uppercase' },
  pickerList: { height: 200 },
  pickerItem: { paddingVertical: 12, paddingHorizontal: 4, alignItems: 'center', borderRadius: 8, marginBottom: 2 },
  pickerItemChaguliwa: { backgroundColor: '#c2185b' },
  pickerManeno: { color: 'rgba(255,255,255,0.6)', fontSize: 14 },
  pickerManenoChaguliwa: { color: 'white', fontWeight: 'bold', fontSize: 15 },
  modalKitufe: { backgroundColor: '#c2185b', borderRadius: 30, padding: 16, alignItems: 'center', marginTop: 8 },
  modalKitufeManeno: { color: 'white', fontWeight: 'bold', fontSize: 15 },

  // Country/Gender Modal
  nchiItem: { flexDirection: 'row', alignItems: 'center', padding: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)', gap: 12 },
  nchiItemChaguliwa: { backgroundColor: 'rgba(194,24,91,0.3)' },
  nchiBendera: { fontSize: 24 },
  nchiJina: { flex: 1, fontSize: 15, color: 'white', fontWeight: '500' },
  check: { color: '#c2185b', fontWeight: 'bold', fontSize: 18 },
  modalFunga: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: 14, alignItems: 'center', marginTop: 12 },
  modalFungaManeno: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});