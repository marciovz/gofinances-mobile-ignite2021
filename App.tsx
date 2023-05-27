import { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { AuthProvider, useAuth } from './src/hooks/auth';
import { Routes } from './src/routes';
// import { Loading } from './src/components/LoadIndicator'; 

import theme from './src/global/styles/theme';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_500Medium, Poppins_700Bold });
  
  const { userStorageLoading } = useAuth();

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded && !userStorageLoading) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, userStorageLoading, fontsLoaded]);

  useEffect(() => {
    async function initApp() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    initApp();
  }, []);

  if (!appIsReady || !fontsLoaded || userStorageLoading) {
    return null;
  }

  return (  
  <GestureHandlerRootView onLayout={onLayoutRootView} style={{ flex: 1 }}>
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <AuthProvider>
          <Routes />
        </AuthProvider>
    </ThemeProvider>
  </GestureHandlerRootView>
  )
}
