import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { AuthProvider } from './src/hooks/auth';
import { Routes } from './src/routes';

import theme from './src/global/styles/theme';

export default function App() {
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_500Medium, Poppins_700Bold });

  if(!fontsLoaded) {
    return <AppLoading />
  }

  return (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  </GestureHandlerRootView>
  )
}
