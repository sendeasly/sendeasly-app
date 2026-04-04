import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ReferralsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.kichwa}>Referrals</Text>

      {/* Bonus Card */}
      <View style={styles.bonusKadi}>
        <Text style={styles.bonusEmoji}>🎁</Text>
        <Text style={styles.bonusKichwa}>Invite friends</Text>
        <Text style={styles.bonusMaelezo}>
          Invite your friends to SendEasly and earn €5 
          for every friend who sends money!
        </Text>
        <TouchableOpacity style={styles.shareKitufe}>
          <Text style={styles.shareManeno}>Share Invite Link</Text>
        </TouchableOpacity>
      </View>

      {/* Jinsi Inavyofanya Kazi */}
      <View style={styles.jinsiKadi}>
        <Text style={styles.jinsiKichwa}>How it works</Text>

        <View style={styles.hatua}>
          <View style={styles.nambari}>
            <Text style={styles.nambariManeno}>1</Text>
          </View>
          <View style={styles.hatuaMaelezo}>
            <Text style={styles.hatuaKichwa}>Share your link</Text>
            <Text style={styles.hatuaManeno}>
              Send your unique invite link to friends
            </Text>
          </View>
        </View>

        <View style={styles.hatua}>
          <View style={styles.nambari}>
            <Text style={styles.nambariManeno}>2</Text>
          </View>
          <View style={styles.hatuaMaelezo}>
            <Text style={styles.hatuaKichwa}>Friend signs up</Text>
            <Text style={styles.hatuaManeno}>
              Your friend creates a SendEasly account
            </Text>
          </View>
        </View>

        <View style={styles.hatua}>
          <View style={styles.nambari}>
            <Text style={styles.nambariManeno}>3</Text>
          </View>
          <View style={styles.hatuaMaelezo}>
            <Text style={styles.hatuaKichwa}>You both earn €5</Text>
            <Text style={styles.hatuaManeno}>
              After their first transfer, you both get €5!
            </Text>
          </View>
        </View>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  kichwa: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#c2185b',
    marginTop: 50,
    marginBottom: 24,
  },
  bonusKadi: {
    backgroundColor: '#fab5d1',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  bonusEmoji: {
    fontSize: 50,
    marginBottom: 12,
  },
  bonusKichwa: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#c2185b',
    marginBottom: 8,
  },
  bonusMaelezo: {
    fontSize: 15,
    color: '#c2185b',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  shareKitufe: {
    backgroundColor: '#c2185b',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
  },
  shareManeno: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  jinsiKadi: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  jinsiKichwa: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#c2185b',
    marginBottom: 20,
  },
  hatua: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 16,
  },
  nambari: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#c2185b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nambariManeno: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  hatuaMaelezo: {
    flex: 1,
  },
  hatuaKichwa: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#c2185b',
    marginBottom: 4,
  },
  hatuaManeno: {
    fontSize: 14,
    color: '#888',
    lineHeight: 20,
  },
});