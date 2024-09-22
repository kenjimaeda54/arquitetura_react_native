/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import HomeScreen from './src/ui/screens/home/HomeScreen';
import "react-native-devsettings";
import { unsubscribeLogin, useLoginStore } from './src/data/store/useLoginStore';
import LoginScreen from './src/ui/screens/login/LoginScreen';

;

export default function App() {
  const isLogged = useLoginStore((state) => state.isLogged)



  return (
    isLogged ? <HomeScreen /> : <LoginScreen />
  )
}