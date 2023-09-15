import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import ForgetPassword from "./Pages/ForgetPassword";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} // This line hides the header
        />
        <Stack.Screen
          name="Signup"
          component={SignupPage}
          options={{ headerShown: false }} // This line hides the header
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{ headerShown: false }} // This line hides the header
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
