import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import { Text } from 'react-native';

import ActivityScreen from './screens/ActivityScreen';
import HomeScreen from './screens/HomeScreen';
import ReferralsScreen from './screens/ReferralsScreen';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#1a5c1a',
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
    </NavigationContainer>
  );
}

registerRootComponent(App);

export default App;