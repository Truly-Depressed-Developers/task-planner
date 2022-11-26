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
import TestContainer from "./src/routes/drawer";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import Test2 from "./src/routes/test2";
import { useSelector } from "react-redux";
import { selectAllLabels } from "./src/store/slices/tagsSlice";

const Drawer = createDrawerNavigator();



export type RootStackPropsList = {
  TestDrawer: undefined,
  Login: undefined,
  Main: undefined
}

let screen = (n: number) => {
  return () => <View><Text>{n.toString()}</Text></View>
}

const E1 = screen(1);
const E2 = screen(2);
const E3 = screen(3);

function Inside() {
  const Stack = createNativeStackNavigator<RootStackPropsList>();
  const tagList = useSelector(selectAllLabels);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            
          </DrawerContentScrollView>
        )}
      >
        <Drawer.Screen name="Home" component={TestContainer} />
        <Drawer.Screen name="Test2" component={Test2} />
      </Drawer.Navigator>
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



/* <Stack.Navigator
        initialRouteName="TestDrawer"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="TestDrawer"
          component={DrawerContainer}
        />
        <Stack.Screen
          name="Login"
          component={E2}
        />
        <Stack.Screen
          name="Main"
          component={E3}
        />
      </Stack.Navigator> */