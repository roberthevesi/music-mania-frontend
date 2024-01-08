import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Alert,
	StyleSheet,
	ActivityIndicator,
	Image,
	Platform,
	StatusBar,
	Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";

import UserContext from "../../contexts/UserContext";
import { useContext } from "react";
import axios from "axios";

import ChangePasswordModal from "../../components/ChangePasswordModal";

const EditProfileScreen = () => {
	const navigation = useNavigation();

	const { userData, setUserData } = useContext(UserContext);

	const [isChangePasswordModalVisible, setChangePasswordModalVisible] =
		useState(false);

	const handleChangeProfilePicture = () => {
		// Implement logic to change profile picture, Open gallery or camera, set the new profile picture using setNewProfilePicture
	};

	const alertEnd = () => {
		navigation.navigate("SignIn");
		setUserData(null);
	};

	const deleteUser = async () => {
		try {
			const code_response = await axios.delete(
				`http://localhost:8080/api/users/delete-user`,
				{
					headers: {
						Authorization: `Bearer ${userData.token}`,
					},
					params: {
						userId: userData.id,
					},
				}
			);

			Alert.alert(
				"Success", // Title of the alert
				"Your account has been successfully deleted.", // Message
				[
					{
						text: "OK",
						onPress: () => alertEnd(),
					},
				],
				{ cancelable: false } // This prevents dismissing the alert by tapping outside of it
			);
		} catch (error) {
			console.error("Error deleting user: ", error);

			Alert.alert(
				"Error", // Title of the alert
				"Something went wrong, please try again.", // Message
				[
					{
						text: "OK",
					},
				],
				{ cancelable: false } // This prevents dismissing the alert by tapping outside of it
			);
		}
	};

	const handleDeleteAccount = async () => {
		Alert.alert(
			"Confirm Delete", // Title of the alert
			"Are you sure you want to delete your account?", // Message
			[
				{
					text: "Cancel",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel",
				},
				{
					text: "OK",
					onPress: () => deleteUser(), // Replace with your function to delete the user
				},
			],
			{ cancelable: false }
		);
	};

	const CustomHeader = ({ title, showBackButton }) => {
		const navigation = useNavigation();

		return (
			<View style={styles.headerContainer}>
				{showBackButton && (
					<TouchableOpacity
						style={styles.backButton}
						onPress={() => navigation.goBack()}
					>
						<Feather name="arrow-left" size={24} color="white" />
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

	// Method to handle password change
	const handleChangePassword = async (oldPassword, newPassword) => {
		try {
			console.log("token:", userData.token);
			console.log("id:", userData.id);
			console.log("old pass:", oldPassword);
			console.log("new pass:", newPassword);

			const response = await axios.put(
				"http://localhost:8080/api/users/change-user-password",
				null, // No body content for the PUT request
				{
					params: {
						userId: userData.id,
						oldPassword: oldPassword,
						newPassword: newPassword,
					},
					headers: {
						Authorization: `Bearer ${userData.token}`,
					},
				}
			);

			Alert.alert(
				"Success", // Title of the alert
				"Your password has been successfully changed.", // Message
				[
					{
						text: "OK",
						onPress: () => setChangePasswordModalVisible(false),
					},
				],
				{ cancelable: false } // This prevents dismissing the alert by tapping outside of it
			);

			console.log("New password:", newPassword);
		} catch (error) {
			console.error("Error changing password: ", error);

			Alert.alert(
				"Error", // Title of the alert
				"Something went wrong, please try again.", // Message
				[
					{
						text: "OK",
						onPress: () => setChangePasswordModalVisible(false), // Navigate on pressing OK
					},
				],
				{ cancelable: false } // This prevents dismissing the alert by tapping outside of it
			);
		}

		// Add your API call or logic here
	};

	const handleChangePasswordPress = () => {
		setChangePasswordModalVisible(true);
	};

	// { position: "absolute", top: 60, left: 15, zIndex: 1 }
	return (
		<View style={{ flex: 1 }}>
			<LinearGradient
				colors={["#001F3F", "#1E1E1E"]}
				style={styles.container}
			>
				<CustomHeader title="Edit Profile" showBackButton={true} />
				<View style={styles.userInfo}>
					<Image
						source={{ uri: userData.profilePictureURL }}
						style={styles.profilePicture}
					/>
					<Text style={styles.username}>{userData.username}</Text>
				</View>

				<TouchableOpacity
					style={styles.changeButton}
					onPress={handleChangeProfilePicture}
				>
					<Feather
						name="camera"
						size={20}
						color="white"
						style={styles.icon}
					/>
					<Text style={styles.buttonText}>
						Change Profile Picture
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.changeButton}
					onPress={handleChangePasswordPress}
				>
					<Feather
						name="lock"
						size={20}
						color="white"
						style={styles.icon}
					/>
					<Text style={styles.buttonText}>Change Password</Text>
				</TouchableOpacity>

				<ChangePasswordModal
					isVisible={isChangePasswordModalVisible}
					onClose={() => setChangePasswordModalVisible(false)}
					onChangePassword={handleChangePassword}
				/>

				<TouchableOpacity
					style={styles.deleteButton}
					onPress={handleDeleteAccount}
				>
					<Feather
						name="trash-2"
						size={20}
						color="white"
						style={styles.icon}
					/>
					<Text style={styles.buttonText}>Delete Account</Text>
				</TouchableOpacity>
			</LinearGradient>
		</View>
	);

	// return (
	// 	<View style={styles.container}>
	// 		{/* ... other UI components ... */}

	// 		{/* Button to trigger change password modal */}
	// 		<Button
	// 			title="Change Password"
	// 			onPress={handleChangePasswordPress}
	// 		/>

	// 		{/* ChangePasswordModal component */}
	// 		<ChangePasswordModal
	// 			isVisible={isChangePasswordModalVisible}
	// 			onClose={() => setChangePasswordModalVisible(false)}
	// 			onChangePassword={handleChangePassword}
	// 		/>
	// 	</View>
	// );
};

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
		paddingBottom: 10,
		top: 65,
	},
	backButton: {
		position: "absolute",
		left: 10,
		top: 0,
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "white",
	},
	container: {
		flex: 1,
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
	userInfo: {
		marginTop: 80,
		marginBottom: 20,
		padding: 10,
	},
	bottomContainer: {
		flex: 1,
		justifyContent: "flex-end",
		marginBottom: 30,
	},
	profilePicture: {
		width: 120,
		height: 120,
		borderRadius: 60,
		marginBottom: 10,
	},
	username: {
		fontSize: 25,
		fontWeight: "bold",
		color: "white",
		marginBottom: 10,
	},
	changeButton: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		borderRadius: 5,
		marginBottom: 20,
	},
	icon: {
		marginRight: 10,
	},
	input: {
		height: 50,
		width: "90%",
		borderColor: "white",
		borderWidth: 1,
		marginBottom: 15,
		paddingHorizontal: 10,
		color: "white",
		borderRadius: 10,
	},
	saveButton: {
		backgroundColor: "#2ecc71",
		padding: 10,
		alignItems: "center",
		borderRadius: 5,
		marginTop: 10,
	},
	cancelButton: {
		backgroundColor: "#e74c3c",
		padding: 10,
		alignItems: "center",
		borderRadius: 5,
		marginTop: 10,
		marginBottom: 20,
	},
	buttonText: {
		color: "white",
		fontSize: 16,
	},
	deleteButton: {
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "flex-start",
		padding: 10,
		borderRadius: 5,
		marginBottom: 10,
	},
	modalContainer: {
		backgroundColor: "#1a1a1a",
		padding: 20,
		borderRadius: 10,
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
		color: "white",
	},
	modalButtonsContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 10,
	},
	cancelModalButton: {
		backgroundColor: "black",
		padding: 10,
		alignItems: "center",
		borderRadius: 5,
		marginRight: 10,
	},
	saveModalButton: {
		backgroundColor: "black",
		padding: 10,
		alignItems: "center",
		borderRadius: 5,
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	input: {
		width: 200,
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		borderRadius: 10,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		marginTop: 20,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		width: "40%",
	},
	buttonCancel: {
		backgroundColor: "#f44336",
	},
	buttonConfirm: {
		backgroundColor: "#4CAF50",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default EditProfileScreen;
