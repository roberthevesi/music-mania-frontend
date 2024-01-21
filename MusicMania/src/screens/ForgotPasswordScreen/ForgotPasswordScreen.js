import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Alert } from "react-native";

const ForgotPasswordScreen = () => {
	const [loginError, setLoginError] = useState("");
	const [email, setEmail] = useState("");

	const navigation = useNavigation();

	const onSendPressed = async () => {
		console.log("email:", email);
		try {
			const url = `http://ec2-3-80-112-191.compute-1.amazonaws.com:8080/api/users/send-forgot-password-code?email=${encodeURIComponent(
				email
			)}`;

			const response = await axios.post(url);

			// console.log(response.data.code);
			navigation.navigate("NewPassword", { email: email });
			setLoginError("");
		} catch (error) {
			console.error("Error sending code: ", error);
			Alert.alert("Error", "Your email may be wrong.");
		}
	};

	const onSignInPressed = () => {
		navigation.navigate("SignIn");
	};

	const isButtonDisabled = !email;

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

			<View style={styles.contentContainer}>
				<CustomInput
					placeholder="Email"
					value={email}
					setValue={setEmail}
					autoCapitalize="none"
				/>

				<CustomButton
					text="Get code"
					onPress={onSendPressed}
					disabled={isButtonDisabled} // Pass the disabled state
				/>

				{loginError ? (
					<Text style={styles.errorMessage}>{loginError}</Text>
				) : null}

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
		marginBottom: 280,
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
		paddingTop: -1,
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
		marginVertical: -15,
		marginHorizontal: 10,
		marginBottom: 50,
	},
	link: {
		color: "#FDB075",
	},
});

export default ForgotPasswordScreen;
