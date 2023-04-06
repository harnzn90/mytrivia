import { View, Text } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import Login from './src/pages/Login/Login'
import Signup from './src/pages/Signup/Signup'
import FlashMessage from 'react-native-flash-message'
import Profile from './src/pages/Profile/Profile'
import Main from './src/pages/Main/Main'
import Questions from './src/pages/Questions/Questions'
import Result from './src/pages/Result/Result'
import LeaderBoard from './src/pages/LeaderBoard/LeaderBoard'

const App = () => {

const Stack=createNativeStackNavigator();
const Tab=createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Signup' component={Signup}/>
        <Stack.Screen name='Profile' component={Profile}/>
        <Stack.Screen name='Main' component={Main}/>
        <Stack.Screen name='Questions' component={Questions}/>
        <Stack.Screen name='Result' component={Result}/>
        <Stack.Screen name='LeaderBoard' component={LeaderBoard}/>
        
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  )
}

export default App