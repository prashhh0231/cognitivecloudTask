import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ContextProvider from "./src/context/index";

import Home from "./src/screens/Home";
import Parkingspace from "./src/screens/Parkingspace";
import ParkingDallocation from "./src/screens/ParkingDallocation";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="Parkingspace" component={Parkingspace} />
          <Stack.Screen
            name="ParkingDallocation"
            component={ParkingDallocation}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
