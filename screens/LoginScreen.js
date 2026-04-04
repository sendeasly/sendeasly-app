import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [nywila, setNywila] = useState('');
  const [inapakia, setInapakia] = useState(false);
  const [onyeshaNywila, setOnyeshaNywila] = useState(false);

  async function ingia() {
    if (!email || !nywila) {
      Alert.alert('Error', 'Please fill all fields!');
      return;
    }

    setInapakia(true);

    try {
      const jibu = await fetch('https://money-transfer-backend-production.up.railway.app/ingia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, nywila }),
      });

      const data = await jibu.json();

      if (jibu.ok) {
        navigation.replace('Main');
      } else {
        Alert.alert('Error', data.kosa);
      }
    } catch (e) {
      Alert.alert('Error', 'Network error!');
    }

    setInapakia(false);
  }

  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.rudiKitufe}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.rudiManeno}>‹</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.helpKitufe}>
          <Text style={styles.helpManeno}>?</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.kichwa}>Log in</Text>

        {/* Email Input */}
        <View style={styles.ingizo}>
          <TextInput
            style={styles.ingizoText}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#aaa"
          />
        </View>

        {/* Password Input */}
        <View style={styles.ingizo}>
          <TextInput
            style={styles.ingizoText}
            placeholder="Password"
            value={nywila}
            onChangeText={setNywila}
            secureTextEntry={!onyeshaNywila}
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity onPress={() => setOnyeshaNywila(!onyeshaNywila)}>
            <Text style={styles.jicho}>
              {onyeshaNywila ? '👁' : '🙈'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Trouble logging in */}
        <TouchableOpacity style={styles.tatizo}>
          <Text style={styles.tatizoManeno}>Trouble logging in?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.loginKitufe, inapakia && styles.kitufeDisabled]}
          onPress={ingia}
          disabled={inapakia}
        >
          <Text style={styles.loginManeno}>
            {inapakia ? 'Logging in...' : 'LOGIN'}
          </Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerMstari} />
          <Text style={styles.dividerManeno}>OR LOGIN WITH</Text>
          <View style={styles.dividerMstari} />
        </View>

        {/* Social Buttons */}
        <TouchableOpacity style={styles.socialKitufe}>
          <Text style={styles.emailIcon}>✉️</Text>
          <Text style={styles.socialManeno}>EMAIL</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialKitufe}>
          <Text style={styles.googleG}>G</Text>
          <Text style={styles.socialManeno}>GOOGLE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialKitufe}>
          <Text style={styles.appleIcon}></Text>
          <Text style={styles.socialManeno}>APPLE</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
  },
  rudiKitufe: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rudiManeno: {
    fontSize: 24,
    color: '#1a1a1a',
  },
  helpKitufe: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpManeno: {
    fontSize: 16,
    color: '#555',
    fontWeight: 'bold',
  },
  content: {
    padding: 24,
  },
  kichwa: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#c2185b',
    marginBottom: 24,
  },
  ingizo: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#f8bbd0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
  },
  ingizoText: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
  },
  jicho: {
    fontSize: 20,
  },
  tatizo: {
    marginBottom: 20,
  },
  tatizoManeno: {
    color: '#c2185b',
    fontSize: 15,
    fontWeight: '600',
  },
  loginKitufe: {
    backgroundColor: '#f8bbd0',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  kitufeDisabled: {
    opacity: 0.7,
  },
  loginManeno: {
    color: '#c2185b',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  dividerMstari: {
    flex: 1,
    height: 1,
    backgroundColor: '#eee',
  },
  dividerManeno: {
    fontSize: 12,
    color: '#888',
    fontWeight: '600',
  },
  socialKitufe: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#f8bbd0',
    borderRadius: 30,
    padding: 14,
    marginBottom: 12,
    gap: 10,
  },
  emailIcon: {
    fontSize: 18,
  },
  googleG: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#c2185b',
  },
  appleIcon: {
    fontSize: 18,
    color: '#1a1a1a',
  },
  socialManeno: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a1a1a',
    letterSpacing: 1,
  },
});