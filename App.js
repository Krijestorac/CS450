import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import FriendsScreen from './screens/Friends/FriendsScreen';
import InvitationScreen from './screens/Invitations/InvitationScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/Home/HomeScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'All Friends') {
                iconName = focused ? 'people' : 'people-outline';
              } else if (route.name === 'Invitations') {
                  iconName = focused ? 'mail' : 'mail-outline';
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              backgroundColor: '#6200ea',
              borderTopWidth: 0,
              elevation: 5,
              height: 90,
            },
            tabBarLabelStyle: {
              fontSize: 13,
              marginBottom: 5,
            },
            headerShown: false,
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="All Friends" component={FriendsScreen} />
          <Tab.Screen name="Invitations" component={InvitationScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
