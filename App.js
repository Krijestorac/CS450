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
import FriendsContextProvider from './store/friends-context';
import InvitationsContextProvider from './store/invitations-context';
import { createStackNavigator } from '@react-navigation/stack';
import InvitationForm from './screens/Invitations/InvitationForm';
import FriendForm from './screens/Friends/FriendForm';

const Tab = createBottomTabNavigator();
const FriendsStack = createStackNavigator();
const InvitationsStack = createStackNavigator();

function FriendsStackScreen() {
  return (
    <FriendsStack.Navigator>
      <FriendsStack.Screen name="AllFriends"
       component={FriendsScreen}
       options={{headerShown: false}} />
       <FriendsStack.Screen name="FriendForm"
        component={FriendForm}
        options={{headerShown: false}} />
    </FriendsStack.Navigator>
  );
}

function InvitationsStackScreen() {
  return (
    <InvitationsStack.Navigator>
      <InvitationsStack.Screen name="Invitation"
       component={InvitationScreen}
       options={{headerShown: false}} />
       <InvitationsStack.Screen name="InvitationForm"
        component={InvitationForm}
        options={{headerShown: false}} />
    </InvitationsStack.Navigator>
  );
}

export default function App() {
  return (
    <FriendsContextProvider>
      <InvitationsContextProvider>
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
              <Tab.Screen name="All Friends" component={FriendsStackScreen} />
              <Tab.Screen name="Invitations" component={InvitationsStackScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </InvitationsContextProvider>
    </FriendsContextProvider>
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
