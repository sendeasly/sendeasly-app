import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function ActivityScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.kichwa}>Activity</Text>

      <View style={styles.tupu}>
        <Text style={styles.tupuEmoji}>📭</Text>
        <Text style={styles.tupuManeno}>No transactions yet</Text>
        <Text style={styles.tupuMaelezo}>
          Your transfer history will appear here
        </Text>
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
  tupu: {
    alignItems: 'center',
    marginTop: 80,
  },
  tupuEmoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  tupuManeno: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d11e66',
    marginBottom: 8,
  },
  tupuMaelezo: {
    fontSize: 15,
    color: '#f34da8',
    textAlign: 'center',
  },
});