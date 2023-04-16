
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";


import { AppRoutes } from './src/routes/app.routes';
import { SignIn } from './src/screens/SignIn';

import theme from './src/global/styles/theme';

export default function App() {
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_500Medium, Poppins_700Bold });

  if(!fontsLoaded) {
    return <AppLoading />
  }

  return (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <ThemeProvider theme={theme}>
        <NavigationContainer>
          <StatusBar 
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <SignIn />
        </NavigationContainer>
    </ThemeProvider>
  </GestureHandlerRootView>
  )
}
