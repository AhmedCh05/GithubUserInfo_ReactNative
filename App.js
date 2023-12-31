import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import ForgetPassword from "./Pages/ForgetPassword";
import Dashboard from "./Pages/Dashboard";
import UserDetails from './Pages/UserDetailPage';

export default function App() {
	const Stack = createNativeStackNavigator();

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Login"
					component={LoginScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Signup"
					component={SignupPage}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="ForgetPassword"
					component={ForgetPassword}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Dashboard"
					component={Dashboard}
					options={{ headerShown: false }}
				/>
        <Stack.Screen
					name="UserDetails"
					component={UserDetails}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
