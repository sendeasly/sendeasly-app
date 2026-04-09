import { useEffect, useState } from 'react';
import {
    Animated,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function TransferStatusScreen({ navigation, route }) {
  const {
    kiasi,
    kutoka,
    kwenda,
    mpokeaji,
    mpokeajiJina,
    mpokeajiNchi,
    mpokeajiBendera,
  } = route.params || {};

  const [hali, setHali] = useState('processing');
  const spinValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();

    setTimeout(() => setHali('success'), 3000);
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#880e4f" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.rudiKitufe}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.rudiManeno}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transfer Status</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>

        {/* Status Icon */}
        {hali === 'processing' ? (
          <Animated.View style={[styles.statusIcon, {transform: [{rotate: spin}]}]}>
            <Text style={styles.statusEmoji}>⏳</Text>
          </Animated.View>
        ) : (
          <View style={[styles.statusIcon, styles.successIcon]}>
            <Text style={styles.statusEmoji}>✅</Text>
          </View>
        )}

        <Text style={styles.statusKichwa}>
          {hali === 'processing' ? 'Processing...' : 'Transfer Successful!'}
        </Text>
        <Text style={styles.statusMaelezo}>
          {hali === 'processing'
            ? 'Please wait while we process your transfer'
            : 'Your money has been sent successfully'}
        </Text>

        {/* Transfer Details */}
        <View style={styles.detailsKadi}>
          <Text style={styles.detailsKichwa}>Transfer Details</Text>

          <View style={styles.mstari}>
            <Text style={styles.mstariLebo}>Amount sent</Text>
            <Text style={styles.mstariThamani}>{kiasi} {kutoka}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.mstari}>
            <Text style={styles.mstariLebo}>Recipient receives</Text>
            <Text style={[styles.mstariThamani, {color: '#f8bbd0'}]}>
              {mpokeaji} {kwenda}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.mstari}>
            <Text style={styles.mstariLebo}>Recipient</Text>
            <Text style={styles.mstariThamani}>
              {mpokeajiBendera} {mpokeajiJina}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.mstari}>
            <Text style={styles.mstariLebo}>Country</Text>
            <Text style={styles.mstariThamani}>{mpokeajiNchi}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.mstari}>
            <Text style={styles.mstariLebo}>Status</Text>
            <View style={[styles.haliBadge, hali === 'success' && styles.haliBadgeSuccess]}>
              <Text style={styles.haliBadgeManeno}>
                {hali === 'processing' ? '⏳ Processing' : '✅ Completed'}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.mstari}>
            <Text style={styles.mstariLebo}>Date</Text>
            <Text style={styles.mstariThamani}>
              {new Date().toLocaleDateString('en-GB')}
            </Text>
          </View>

        </View>

        {/* Buttons */}
        {hali === 'success' && (
          <View style={styles.vitufe}>
            <TouchableOpacity
              style={styles.nyumbaKitufe}
              onPress={() => navigation.navigate('Main')}
            >
              <Text style={styles.nyumbaManeno}>Back to Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.shareKitufe}
              onPress={() => navigation.navigate('Main')}
            >
              <Text style={styles.shareManeno}>Share Receipt</Text>
            </TouchableOpacity>
          </View>
        )}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#880e4f',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 50,
  },
  rudiKitufe: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rudiManeno: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  statusIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  successIcon: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  statusEmoji: {
    fontSize: 36,
  },
  statusKichwa: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  statusMaelezo: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginBottom: 24,
  },
  detailsKadi: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  detailsKichwa: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  mstari: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  mstariLebo: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  mstariThamani: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  haliBadge: {
    backgroundColor: 'rgba(255,165,0,0.3)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  haliBadgeSuccess: {
    backgroundColor: 'rgba(0,200,0,0.3)',
  },
  haliBadgeManeno: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  vitufe: {
    width: '100%',
    gap: 12,
  },
  nyumbaKitufe: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
  },
  nyumbaManeno: {
    color: '#880e4f',
    fontWeight: 'bold',
    fontSize: 16,
  },
  shareKitufe: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  shareManeno: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});