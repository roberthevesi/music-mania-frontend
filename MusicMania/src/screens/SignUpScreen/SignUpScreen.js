import React, { useState } from "react";
import {
	View,
	TouchableOpacity,
	Text,
	StyleSheet,
	Dimensions,
	ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import UserContext from "../../contexts/UserContext";
import { useContext } from "react";
import axios from "axios";
import { Alert } from "react-native";

const SignUpScreen = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const navigation = useNavigation();

	const onRegisterPressed = async () => {
		try {
			const response = await axios.post(
				"http://ec2-3-80-112-191.compute-1.amazonaws.com:8080/api/users/send-new-user-code",
				{
					username: username,
					email: email,
					password: password,
				}
			);

			// console.log(response.data);

			navigation.navigate("ConfirmEmail", {
				email: email,
				username: username,
				password: password,
			});
		} catch (error) {
			console.error("Error creating user: ", error);
			// setLoginError('Your email may be wrong.');

			let errorMessage = "Something went wrong. Please try again.";

			if (error.response && error.response.data) {
				// If the error response contains a message, use it
				errorMessage = error.response.data;
			}

			// Display the error message to the user
			Alert.alert("Error", errorMessage);
		}
		// navigation.navigate('ConfirmEmail');
	};

	const onSignInPressed = () => {
		navigation.navigate("SignIn");
	};

	const onTermsOfUsePressed = () => {
		console.warn("TermsOfUse");
	};

	const onPrivacyPolicyPressed = () => {
		console.warn("PrivacyPolicy");
	};

	const isButtonDisabled =
		!email ||
		!username ||
		!password ||
		!confirmPassword ||
		password !== confirmPassword;

	const CustomHeader = ({ title, showBackButton }) => {
		const navigation = useNavigation();

		return (
			<View style={styles.headerContainer}>
				{showBackButton && (
					<TouchableOpacity
						style={styles.backButton}
						onPress={() => navigation.goBack()}
					>
						<Feather name="arrow-left" size={24} color="#051C60" />
					</TouchableOpacity>
				)}

				{title && (
					<View style={styles.titleContainer}>
						<Text style={styles.headerTitle}>{title}</Text>
					</View>
				)}
			</View>
		);
	};

	return (
		<View style={styles.root}>
			{/* <CustomHeader title="Create an account" showBackButton={true} /> */}
			<CustomHeader title="Create an account" showBackButton={true} />

			{/* <Text style={styles.title}>Create an account</Text> */}
			<ScrollView>
				<View style={styles.contentContainer}>
					<CustomInput
						placeholder="Email"
						value={email}
						setValue={setEmail}
						autoCapitalize="none"
					/>

					<CustomInput
						placeholder="Username"
						value={username}
						setValue={setUsername}
						autoCapitalize="none"
					/>

					<CustomInput
						placeholder="Password"
						value={password}
						setValue={setPassword}
						secureTextEntry={true}
						autoCapitalize="none"
					/>

					<CustomInput
						placeholder="Password"
						value={confirmPassword}
						setValue={setConfirmPassword}
						secureTextEntry={true}
						autoCapitalize="none"
					/>

					<CustomButton
						text="Register"
						onPress={onRegisterPressed}
						disabled={isButtonDisabled} // Pass the disabled state
					/>

					<CustomButton
						text="Already have an account? Sign in"
						onPress={onSignInPressed}
						type="SECONDARY"
					/>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
		paddingBottom: 10,
		width: "100%",
		marginTop: 60,
		marginBottom: 160,
	},
	backButton: {
		paddingLeft: 10,
		zIndex: 1,
		alignItems: "center",
		marginTop: 0,
	},
	titleContainer: {
		position: "absolute",
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		zIndex: 0,
		marginTop: 0,
	},
	headerTitle: {
		marginTop: -3,
		fontSize: 21,
		fontWeight: "bold",
		color: "#051C60",
		alignItems: "center",
	},

	root: {
		flex: 1,
		// justifyContent: "center",
		// alignItems: "center",
		paddingTop: 1,
		backgroundColor: "lavender",
	},

	contentContainer: {
		justifyContent: "center",
		alignItems: "center",
		padding: 1,
	},

	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#051C60",
		margin: 10,
		marginVertical: 50,
	},

	text: {
		color: "gray",
		marginVertical: 10,
		marginHorizontal: 10,
		marginBottom: 50,
		padding: 8,
	},
	link: {
		color: "#FDB075",
	},
});

export default SignUpScreen;
