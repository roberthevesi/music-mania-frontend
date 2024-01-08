import React, { useState } from "react";
import {
	View,
	Modal,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Alert,
} from "react-native";

const ChangePasswordModal = ({ isVisible, onClose, onChangePassword }) => {
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");

	const handleConfirm = () => {
		if (newPassword !== confirmNewPassword) {
			Alert.alert("Error", "Passwords do not match.");
			return;
		}

		// Call the method to change the password
		onChangePassword(oldPassword, newPassword);

		// Close the modal
		onClose();
		setOldPassword("");
		setNewPassword("");
		setConfirmNewPassword("");
	};

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={isVisible}
			onRequestClose={onClose}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<Text style={styles.modalTitle}>Change Password</Text>
					<TextInput
						style={styles.input}
						placeholder="Old Password"
						secureTextEntry
						value={oldPassword}
						onChangeText={setOldPassword}
					/>
					<TextInput
						style={styles.input}
						placeholder="New Password"
						secureTextEntry
						value={newPassword}
						onChangeText={setNewPassword}
					/>
					<TextInput
						style={styles.input}
						placeholder="Confirm New Password"
						secureTextEntry
						value={confirmNewPassword}
						onChangeText={setConfirmNewPassword}
					/>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={[styles.button, styles.buttonCancel]}
							onPress={onClose}
						>
							<Text style={styles.textStyle}>Cancel</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.button, styles.buttonConfirm]}
							onPress={handleConfirm}
						>
							<Text style={styles.textStyle}>Confirm</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalTitle: {
		fontSize: 19,
		fontWeight: "bold",
		marginBottom: 10,
	},
	centeredView: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
		justifyContent: "center",
		alignItems: "center",
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
		width: 310,
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		borderRadius: 10,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%", // Same width as inputs
	},
	button: {
		flex: 1, // Each button takes half of the container
		padding: 10,
		margin: 5,
		alignItems: "center",
		borderRadius: 10,
		backgroundColor: "#4CAF50", // Change as needed
	},
	buttonText: {
		color: "white",
		fontWeight: "bold",
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

export default ChangePasswordModal;
