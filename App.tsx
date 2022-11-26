import { } from "./src/types/NativeOverride";
import 'react-native-get-random-values';

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from "./src/Theme";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from "react-redux"
import { store, persistor } from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import AddTask from "./src/routes/AddTask/AddTask";

export type RootStackPropsList = {
  Register: undefined,
  Login: undefined,
  Main: undefined
}

let screen = (n:number) => {
  return () => <View><Text>{n.toString()}</Text></View>
}

const E1 = screen(1);
const E2 = screen(2);
const E3 = screen(3);

function Inside() {
  const Stack = createNativeStackNavigator<RootStackPropsList>();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Register"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="Register"
          component={AddTask}
        />
        <Stack.Screen
          name="Login"
          component={E2}
        />
        <Stack.Screen
          name="Main"
          component={E3}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* <StatusBar backgroundColor={theme.elevation.dp04} style={"light"} /> */}
      <SafeAreaView style={{ flex: 1 }}>
        <PaperProvider theme={theme}>
          <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Inside />
            </PersistGate>
          </ReduxProvider>
        </PaperProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
