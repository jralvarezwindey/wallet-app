
import { useSelector } from 'react-redux';
import Currencies from './components/Currencies/Currencies';
import HeaderUser from './components/HeaderUser/HeaderUser';
import { useState, useEffect } from 'react';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from "./components/Register/Register"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccountIndex from './components/Account/AccountIndex';
import HeaderCurrencies from "./components/HeaderCurrencies/HeaderCurrencies"

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Index() {

  const [logged, setLogged] = useState(false);
  const log = useSelector(state => state.Log);
 
  useEffect(() => {
    isLogged()
  },[log])
 
  const isLogged = () => {
    console.log(log);
  
    if(log) {    
      setLogged(true)
    } else {
      setLogged(false)
    }
  }

  return ( 
      <NavigationContainer>
        {!logged ? <Stack.Navigator initialRouteName='Login'>
                      <Stack.Screen name="Login" component={Login}/>
                      <Stack.Screen name="Register" component={Register}/>
                   </Stack.Navigator>
    : 
                   <Tab.Navigator initialRouteName="Home">
                      <Tab.Screen name="Home" component={Home}/>
                      <Tab.Screen name="Currencies" component={HeaderCurrencies}/>
                      <Tab.Screen name="AccountIndex" component={AccountIndex} options={{headerTitle:()=><HeaderUser/>}}/>
                   </Tab.Navigator>
      }</NavigationContainer>
  );
}





        
      
        
        
    