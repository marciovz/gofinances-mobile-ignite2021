import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { AuthProvider, useAuth } from './src/hooks/auth';
import { Routes } from './src/routes';
import { Loading } from './src/components/LoadIndicator'; 

import theme from './src/global/styles/theme';

export default function App() {
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_500Medium, Poppins_700Bold });

  const { userStorageLoading } = useAuth();

  return (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      { !fontsLoaded || userStorageLoading ? <Loading /> : (
        <AuthProvider>
          <Routes />
        </AuthProvider>
      )}
    </ThemeProvider>
  </GestureHandlerRootView>
  )
}
