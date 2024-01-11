import React, { useState } from "react";
import {
	Modal,
	View,
	Button,
	Image,
	Alert,
	StyleSheet,
	Text,
	TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

const ChangeProfilePictureModal = ({ isVisible, onClose, onImageSelected }) => {
	const [image, setImage] = useState(null);

	const pickImage = async () => {
		// Request permissions
		const { status } =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== "granted") {
			Alert.alert(
				"Sorry, we need camera roll permissions to make this work!"
			);
			return;
		}

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.canceled) {
			if (result.assets && result.assets.length > 0) {
				const imageUri = result.assets[0].uri;

				// Resize the image
				const resizedImage = await ImageManipulator.manipulateAsync(
					imageUri,
					[{ resize: { width: 300 } }], // Resize to width of 300 pixels
					{ compress: 1, format: ImageManipulator.SaveFormat.JPEG }
				);

				setImage(resizedImage.uri);
				console.log("Resized image URI:", resizedImage.uri);
			} else {
				console.log("No image assets found");
			}
		}
	};

	const handleConfirm = () => {
		if (image) {
			onImageSelected(image); // Pass the image URI back to the parent component
			onClose();
			setImage(null);
		} else {
			console.log("no image... :(");
			onClose();
		}
	};

	const handleCancel = () => {
		onClose();
		setImage(null);
	};

	const isButtonDisabled = !image;

	return (
		<Modal
			visible={isVisible}
			animationType="fade"
			onRequestClose={onClose}
			transparent={true}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<Text style={styles.modalTitle}>
						Change Profile Picture
					</Text>

					{image && (
						<Image
							source={{
								uri: image,
							}}
							style={styles.profilePicture}
						/>
					)}
					<Button title="Choose photo..." onPress={pickImage} />

					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={[styles.button, styles.buttonCancel]}
							onPress={handleCancel}
						>
							<Text style={styles.textStyle}>Cancel</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								styles.button,
								styles.buttonConfirm,
								isButtonDisabled && styles.buttonDisabled,
							]}
							onPress={handleConfirm}
							disabled={isButtonDisabled}
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
	profilePicture: {
		width: 120,
		height: 120,
		borderRadius: 60,
		marginBottom: 10,
	},
	buttonCancel: {
		backgroundColor: "#f44336",
	},
	buttonConfirm: {
		backgroundColor: "#4CAF50",
	},
	buttonDisabled: {
		backgroundColor: "#cccccc", // Grey color for disabled button
	},
	button: {
		flex: 1, // Each button takes half of the container
		padding: 10,
		margin: 5,
		alignItems: "center",
		borderRadius: 10,
		backgroundColor: "#4CAF50", // Change as needed
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%", // Same width as inputs
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
	modalTitle: {
		fontSize: 19,
		fontWeight: "bold",
		marginBottom: 10,
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default ChangeProfilePictureModal;
