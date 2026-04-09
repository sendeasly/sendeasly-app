import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function ConfirmScreen({ navigation, route }) {
  const {
    kiasi,
    kutoka,
    kwenda,
    mpokeaji,
    mpokeajiJina,
    mpokeajiNchi,
    mpokeajiBendera,
    mpokeajiSimu,
  } = route.params;

  const [inatuma, setInatuma] = useState(false);

  const ada = (parseFloat(kiasi) * 0.02).toFixed(2);
  const jumla = (parseFloat(kiasi) + parseFloat(ada)).toFixed(2);

  function thibitisha() {
    navigation.navigate('PaymentMethod', {
      kiasi,
      kutoka,
      kwenda,
      mpokeaji,
      mpokeajiJina,
      mpokeajiNchi,
      mpokeajiBendera,
      mpokeajiSimu,
    });
  }

  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.rudi}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.kichwa}>Confirm transfer</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Mpokeaji */}
      <View style={styles.mpokeajiKadi}>
        <Text style={styles.sectionKichwa}>Sending to</Text>
        <View style={styles.mpokeajiInfo}>
          <View style={styles.avatar}>
            <Text style={styles.bendera}>{mpokeajiBendera}</Text>
          </View>
          <View style={styles.mpokeajiManeno}>
            <Text style={styles.jinaManeno}>{mpokeajiJina}</Text>
            <Text style={styles.nchiManeno}>{mpokeajiNchi} • {mpokeajiSimu}</Text>
          </View>
        </View>
      </View>

      {/* Muhtasari wa Malipo */}
      <View style={styles.muhtasariKadi}>
        <Text style={styles.sectionKichwa}>Transfer details</Text>

        <View style={styles.mstari}>
          <Text style={styles.mstariLebo}>You send</Text>
          <Text style={styles.mstariThamani}>{kiasi} {kutoka}</Text>
        </View>

        <View style={styles.mgawanyo} />

        <View style={styles.mstari}>
          <Text style={styles.mstariLebo}>Transfer fee (2%)</Text>
          <Text style={styles.mstariThamani}>{ada} {kutoka}</Text>
        </View>

        <View style={styles.mgawanyo} />

        <View style={styles.mstari}>
          <Text style={styles.mstariLebo}>Total you pay</Text>
          <Text style={styles.mstariThamani}>{jumla} {kutoka}</Text>
        </View>

        <View style={styles.mgawanyo} />

        <View style={styles.mstari}>
          <Text style={styles.mstariLebo}>They receive</Text>
          <Text style={[styles.mstariThamani, styles.mpokeajiKiasi]}>
            {mpokeaji} {kwenda}
          </Text>
        </View>

      </View>

      {/* Kasi ya Uhamishaji */}
      <View style={styles.kasiKadi}>
        <Text style={styles.kasiIcon}>⚡</Text>
        <View>
          <Text style={styles.kasiKichwa}>Fast transfer</Text>
          <Text style={styles.kasiManeno}>Usually arrives within minutes</Text>
        </View>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity
        style={[styles.kitufe, inatuma && styles.kitufeDisabled]}
        onPress={thibitisha}
        disabled={inatuma}
      >
        <Text style={styles.kitufeManeno}>
          {inatuma ? 'Sending...' : 'Confirm & Send 🚀'}
        </Text>
      </TouchableOpacity>

      {/* Cancel */}
      <TouchableOpacity
        style={styles.cancelKitufe}
        onPress={() => navigation.navigate('Main')}
      >
        <Text style={styles.cancelManeno}>Cancel</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 50,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rudi: {
    color: '#c2185b',
    fontSize: 16,
    fontWeight: '600',
    width: 60,
  },
  kichwa: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  mpokeajiKadi: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 16,
    padding: 20,
  },
  sectionKichwa: {
    fontSize: 13,
    fontWeight: '600',
    color: '#888',
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  mpokeajiInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#fce4ec',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  bendera: {
    fontSize: 26,
  },
  mpokeajiManeno: {
    flex: 1,
  },
  jinaManeno: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  nchiManeno: {
    fontSize: 14,
    color: '#888',
  },
  muhtasariKadi: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
  },
  mstari: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  mstariLebo: {
    fontSize: 15,
    color: '#555',
  },
  mstariThamani: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  mpokeajiKiasi: {
    color: '#c2185b',
    fontSize: 18,
  },
  mgawanyo: {
    height: 1,
    backgroundColor: '#f5f5f5',
  },
  kasiKadi: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fce4ec',
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  kasiIcon: {
    fontSize: 28,
  },
  kasiKichwa: {
    fontSize: 15,
    fontWeight: '600',
    color: '#c2185b',
    marginBottom: 2,
  },
  kasiManeno: {
    fontSize: 13,
    color: '#e91e8c',
  },
  kitufe: {
    backgroundColor: '#c2185b',
    borderRadius: 30,
    padding: 18,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  kitufeDisabled: {
    opacity: 0.7,
  },
  kitufeManeno: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelKitufe: {
    alignItems: 'center',
    padding: 16,
    marginBottom: 30,
  },
  cancelManeno: {
    color: '#888',
    fontSize: 15,
  },
});