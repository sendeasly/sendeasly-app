import {
  Linking,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const APK_LINK = 'https://expo.dev/accounts/brown94/projects/sendeasly-app/builds/16ce1eb2-3a0d-4ec5-a4f6-235305a6ac15';

export default function ReferralsScreen() {

  async function shareInvite() {
    try {
      await Share.share({
        message:
          `Join me on SendEasly — the fastest way to send money!\n` +
          `Download the app here: ${APK_LINK}`,
        url: APK_LINK,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function fungaPlayStore() {
    try {
      await Linking.openURL(APK_LINK);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#880e4f" />

      <ScrollView contentContainerStyle={styles.scroll}>

        <Text style={styles.kichwa}>Referrals</Text>

        {/* Bonus Card */}
        <View style={styles.bonusKadi}>
          <Text style={styles.bonusEmoji}>🎁</Text>
          <Text style={styles.bonusKichwa}>Invite friends</Text>
          <Text style={styles.bonusMaelezo}>
            Invite your friends to SendEasly and earn €5
            for every friend who sends money!
          </Text>

          <TouchableOpacity style={styles.shareKitufe} onPress={shareInvite}>
            <Text style={styles.shareManeno}>Share Invite Link</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.playStoreKitufe} onPress={fungaPlayStore}>
            <Text style={styles.playStoreManeno}>▶  View on Play Store</Text>
          </TouchableOpacity>
        </View>

        {/* Jinsi Inavyofanya Kazi */}
        <View style={styles.jinsiKadi}>
          <Text style={styles.jinsiKichwa}>How it works</Text>

          {[
            { nambari: '1', kichwa: 'Share your link', maelezo: 'Send your unique invite link to friends' },
            { nambari: '2', kichwa: 'Friend signs up', maelezo: 'Your friend creates a SendEasly account' },
            { nambari: '3', kichwa: 'You both earn €5', maelezo: 'After their first transfer, you both get €5!' },
          ].map((hatua) => (
            <View key={hatua.nambari} style={styles.hatua}>
              <View style={styles.nambariKiri}>
                <Text style={styles.nambariManeno}>{hatua.nambari}</Text>
              </View>
              <View style={styles.hatuaMaelezo}>
                <Text style={styles.hatuaKichwa}>{hatua.kichwa}</Text>
                <Text style={styles.hatuaManeno}>{hatua.maelezo}</Text>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#880e4f' },
  scroll: { flexGrow: 1, padding: 20, paddingTop: 50, paddingBottom: 40 },
  kichwa: {
    fontSize: 28, fontWeight: 'bold',
    color: 'white', marginBottom: 24,
  },
  bonusKadi: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20, padding: 24,
    alignItems: 'center', marginBottom: 16,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
  },
  bonusEmoji: { fontSize: 50, marginBottom: 12 },
  bonusKichwa: {
    fontSize: 22, fontWeight: 'bold',
    color: 'white', marginBottom: 8,
  },
  bonusMaelezo: {
    fontSize: 15, color: 'rgba(255,255,255,0.7)',
    textAlign: 'center', lineHeight: 22, marginBottom: 20,
  },
  shareKitufe: {
    backgroundColor: 'white',
    paddingHorizontal: 32, paddingVertical: 14,
    borderRadius: 30, marginBottom: 12, width: '100%',
    alignItems: 'center',
  },
  shareManeno: { color: '#880e4f', fontWeight: 'bold', fontSize: 16 },
  playStoreKitufe: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 32, paddingVertical: 14,
    borderRadius: 30, width: '100%',
    alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)',
  },
  playStoreManeno: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  jinsiKadi: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20, padding: 20,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
  },
  jinsiKichwa: {
    fontSize: 18, fontWeight: 'bold',
    color: 'white', marginBottom: 20,
  },
  hatua: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20, gap: 16,
  },
  nambariKiri: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center', justifyContent: 'center',
  },
  nambariManeno: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  hatuaMaelezo: { flex: 1 },
  hatuaKichwa: {
    fontSize: 16, fontWeight: 'bold',
    color: 'white', marginBottom: 4,
  },
  hatuaManeno: { fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 20 },
});