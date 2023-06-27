import 'react-native-gesture-handler';
import React from "react";
import { NativeBaseProvider, extendTheme, theme as nbTheme } from "native-base";
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navegacion/app.navigator';
import { LogBox } from 'react-native';
import { ImageBackground, StyleSheet, View } from "react-native";
import { Store } from "./src/navegacion/store";
import { SafeAreaProvider } from 'react-native-safe-area-context';

LogBox.ignoreLogs(['Warning: ...','NativeBase:']);

const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // prevent layout blinking when performing navigation
    background: 'transparent',
  },
};

const config = {
  useSystemColorMode: false,
  colors: {
    primary: nbTheme.colors.light,
  },
};

// extend the theme
export const theme = extendTheme({ config });

export default function App() {
  const ref = React.useRef(null);

  return (
    <SafeAreaProvider>
    <NativeBaseProvider theme={theme}>
      <View style={styles.container}>
          <Store>
            <NavigationContainer  ref={ref} theme={navigatorTheme}>
              <AppNavigator />
            </NavigationContainer>
          </Store>
        </View>
    </NativeBaseProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  }
})
