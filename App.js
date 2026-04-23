import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';
import { Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import ActivityScreen from './screens/ActivityScreen';
import ConfirmScreen from './screens/ConfirmScreen';
import ConfirmTransferScreen from './screens/ConfirmTransferScreen';
import HomeScreen from './screens/HomeScreen';
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import ProfileScreen from './screens/ProfileScreen';
import RecipientDetailsScreen from './screens/RecipientDetailsScreen';
import RecipientScreen from './screens/RecipientScreen';
import ReferralsScreen from './screens/ReferralsScreen';
import RegisterScreen from './screens/RegisterScreen';
import TransferStatusScreen from './screens/TransferStatusScreen';

import ConfirmEmailScreen from './screens/ConfirmEmailScreen';
import OTPScreen from './screens/OTPScreen';
import PersonalDetailsScreen from './screens/PersonalDetailsScreen';
import PhoneNumberScreen from './screens/PhoneNumberScreen';
import SelectCountryScreen from './screens/SelectCountryScreen';
import SendCountryScreen from './screens/SendCountryScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#c2185b',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#eee',
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 22, color }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 22, color }}>⇄</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Referrals"
        component={ReferralsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 22, color }}>🎁</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Landing"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="Recipient" component={RecipientScreen} />
          <Stack.Screen name="Confirm" component={ConfirmScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
          <Stack.Screen name="TransferStatus" component={TransferStatusScreen} />
          <Stack.Screen name="RecipientDetails" component={RecipientDetailsScreen} />
          <Stack.Screen name="ConfirmTransfer" component={ConfirmTransferScreen} />

          <Stack.Screen name="SelectCountry" component={SelectCountryScreen} />
          <Stack.Screen name="SendCountry" component={SendCountryScreen} />
          <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
          <Stack.Screen name="OTPScreen" component={OTPScreen} />
          <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
          <Stack.Screen name="PersonalDetails" component={PersonalDetailsScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

registerRootComponent(App);

export default App;