import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ConfirmEmailScreen from "../screens/ConfirmEmailScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import NewPasswordScreen from "../screens/NewPasswordScreen";
import HomeScreen from "../screens/HomeScreen";
import LeaderboardScreen from "../screens/LeaderboardScreen";
import ProfileScreen from "../screens/ProfileScreen";
//import GuessTheAlbumScreen from '../screens/GuessTheAlbumScreen';
import GuessTheSongScreen from "../screens/GuessTheSongScreen";
//import SettingsScreen from '../screens/SettingsScreen';
import EditProfileScreen from "../screens/EditProfileScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="SignIn" component={SignInScreen} />
				<Stack.Screen name="SignUp" component={SignUpScreen} />
				<Stack.Screen
					name="ConfirmEmail"
					component={ConfirmEmailScreen}
				/>
				<Stack.Screen
					name="ForgotPassword"
					component={ForgotPasswordScreen}
				/>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen
					name="NewPassword"
					component={NewPasswordScreen}
				/>
				<Stack.Screen
					name="Leaderboard"
					component={LeaderboardScreen}
				/>
				<Stack.Screen name="Profile" component={ProfileScreen} />
				<Stack.Screen
					name="GuessTheSong"
					component={GuessTheSongScreen}
				/>
				<Stack.Screen
					name="EditProfile"
					component={EditProfileScreen}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};
export default Navigation;
