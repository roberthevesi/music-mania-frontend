import React, { useState } from "react";
import { useContext } from "react";
import { Feather } from "@expo/vector-icons";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	ScrollView,
} from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import UserContext from "../../contexts/UserContext";
import axios from "axios";
import { Alert } from "react-native";

const NewPasswordScreen = () => {
	const { userData, setUserData } = useContext(UserContext);

	const [code, setCode] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");

	const route = useRoute();
	const navigation = useNavigation();
	const received_email = route.params?.email;

	const onSubmitPressed = async () => {
		try {
			const code_response = await axios.put(
				`http://ec2-3-80-112-191.compute-1.amazonaws.com:8080/api/users/verify-forgot-password-code?email=${encodeURIComponent(
					received_email
				)}&verification_code=${encodeURIComponent(code)}`
			);

			console.log("resp: ", code_response.data);

			if (code_response.data) {
				// code is ok
				const password_response = await axios.put(
					`http://ec2-3-80-112-191.compute-1.amazonaws.com:8080/api/users/set-new-password?email=${encodeURIComponent(
						received_email
					)}&password=${encodeURIComponent(newPassword)}`
				);

				console.log("resp: ", password_response.data);
				Alert.alert(
					"Success", // Title of the alert
					"Your password has been changed successfully", // Message
					[
						{
							text: "OK",
							onPress: () => navigation.navigate("SignIn"), // Navigate on pressing OK
						},
					],
					{ cancelable: false } // This prevents dismissing the alert by tapping outside of it
				);
			}
		} catch (error) {
			console.error("Error resetting password: ", error);

			Alert.alert(
				"Error", // Title of the alert
				"Something went wrong, please try again.", // Message
				[
					{
						text: "OK",
						onPress: () => navigation.navigate("SignIn"), // Navigate on pressing OK
					},
				],
				{ cancelable: false } // This prevents dismissing the alert by tapping outside of it
			);
		}

		// navigation.navigate('Home');
	};
	const onSignInPressed = () => {
		navigation.navigate("SignIn");
	};

	const isButtonDisabled =
		!code ||
		!newPassword ||
		!confirmNewPassword ||
		newPassword !== confirmNewPassword;

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
		<ScrollView contentContainerStyle={styles.root}>
			<CustomHeader title="Reset your password" showBackButton={true} />

			{/* <Text style={styles.title}>Reset your password</Text> */}
			<View style={styles.contentContainer}>
				<CustomInput
					placeholder="Enter your confirmation code"
					value={code}
					setValue={setCode}
					uppercase={true}
					maxLength={6}
				/>
				<CustomInput
					placeholder="New password"
					value={newPassword}
					setValue={setNewPassword}
					autoCapitalize="none"
					secureTextEntry={true}
				/>
				<CustomInput
					placeholder="Repeat new password"
					value={confirmNewPassword}
					setValue={setConfirmNewPassword}
					autoCapitalize="none"
					secureTextEntry={true}
				/>

				<CustomButton
					text="Submit"
					onPress={onSubmitPressed}
					disabled={isButtonDisabled} // Pass the disabled state
				/>

				<CustomButton
					text="Back to sign in"
					onPress={onSignInPressed}
					type="TERTIARY"
				/>
			</View>
		</ScrollView>
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
		marginBottom: 190,
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

	contentContainer: {
		justifyContent: "center",
		alignItems: "center",
		padding: 1,
	},

	root: {
		flex: 1,
		// justifyContent: "center",
		// alignItems: "center",
		paddingTop: -1,
		backgroundColor: "lavender",
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
		marginVertical: -15,
		marginHorizontal: 10,
		marginBottom: 50,
	},
	link: {
		color: "#FDB075",
	},
});

export default NewPasswordScreen;
