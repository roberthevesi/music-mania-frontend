import React, { useState } from "react";
import { useContext } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	Alert,
	StyleSheet,
	StatusBar,
	Platform,
	FlatList,
	ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import UserContext from "../../contexts/UserContext";

import Logo from "../../../assets/images/record.png";
import Logo_2 from "../../../assets/images/song.png";

const ProfileScreen = ({ route }) => {
	const { userData, setUserData } = useContext(UserContext);

	const {
		username = "Guest",
		profilePicture,
		totalScore,
	} = route.params ?? {};
	const navigation = useNavigation();

	const logoutUser = () => {
		setUserData({});
		navigation.navigate("SignIn");
	};

	const onLogOutPressed = () => {
		Alert.alert(
			"Logout", // Title of the alert
			"Are you sure you want to logout?", // Message
			[
				{
					text: "Cancel",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel",
				},
				{
					text: "OK",
					onPress: () => logoutUser(), // Replace with your function to delete the user
				},
			],
			{ cancelable: false }
		);
	};

	const onEditProfilePressed = () => {
		const userData = {
			username: "JohnDoe",
			profilePicture: "https://source.unsplash.com/200x200/?portrait",
			totalScore: 500,
		};

		navigation.navigate("EditProfile");
	};
	const onGuessTheSongPressed = () => {
		navigation.navigate("GuessTheSong");
	};

	const onGuessTheAlbumPressed = () => {
		navigation.navigate("GuessTheAlbum");
	};

	const onLeaderboardPressed = () => {
		navigation.navigate("Leaderboard");
	};

	const onProfilePressed = () => {
		navigation.navigate("Profile");
	};

	const onHomePressed = () => {
		navigation.navigate("Home");
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
				<Text style={styles.headerTitle}>{title}</Text>
			</View>
		);
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<LinearGradient
				colors={["#001F3F", "#1E1E1E"]}
				style={styles.linearGradient}
			>
				<CustomHeader title="Profile" showBackButton={false} />
				<View style={styles.userInfo}>
					{profilePicture && (
						<Image
							source={{ uri: userData.profilePictureURL }}
							style={styles.profilePicture}
						/>
					)}

					<Text style={styles.username}>{userData.username}</Text>

					<View style={styles.totalScoreContainer}>
						<View style={styles.totalScoreSquare}>
							<Text style={styles.totalScoreLabel}>
								Total Score:
							</Text>
							<Text style={styles.totalScore}>
								{userData.score}{" "}
								<Feather
									name="star"
									size={20}
									color="red"
									style={styles.starIcon}
								/>
							</Text>
						</View>
					</View>
				</View>

				<View style={styles.bottomButtonsContainer}>
					<TouchableOpacity
						style={styles.bottomButton}
						onPress={onEditProfilePressed}
					>
						<Feather name="edit" size={20} color="white" />
						<Text style={styles.buttonText}>Edit Profile</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.bottomButton}
						onPress={onLogOutPressed}
					>
						<Feather name="log-out" size={20} color="white" />
						<Text style={styles.buttonText}>Logout</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.bottomIconsContainer}>
					<View style={styles.bottomIcons}>
						<TouchableOpacity
							style={styles.iconButton}
							onPress={() => navigation.navigate("Home")}
						>
							<MaterialCommunityIcons
								name="home"
								size={30}
								color="white"
							/>
							<Text style={styles.iconText}>Home</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.iconButton}
							onPress={onLeaderboardPressed}
						>
							<MaterialCommunityIcons
								name="trophy"
								size={30}
								color="white"
							/>
							<Text style={styles.iconText}>Leaderboard</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.iconButton}
							onPress={onProfilePressed}
						>
							<MaterialCommunityIcons
								name="account"
								size={30}
								color="white"
							/>
							<Text style={styles.iconText}>Profile</Text>
						</TouchableOpacity>
					</View>
				</View>
			</LinearGradient>
		</ScrollView>
	);
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
		alignItems: "center",
		justifyContent: "flex-start",
		paddingHorizontal: 0,
	},
	linearGradient: {
		flex: 1,
		width: "100%",
	},
	userInfo: {
		alignItems: "center",
		marginTop: 100,
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
		marginBottom: 20,
	},
	totalScoreContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
	starIcon: {
		marginLeft: 5,
	},
	totalScoreSquare: {
		backgroundColor: "rgba(255, 255, 255, 0.1)",
		borderRadius: 8,
		paddingVertical: 15,
		paddingHorizontal: 20,
	},
	totalScore: {
		fontSize: 24,
		color: "#FF3F3F",
		fontWeight: "bold",
		justifyContent: "center",
	},
	totalScoreLabel: {
		fontSize: 16,
		color: "white",
		fontWeight: "bold",
		marginBottom: 5,
	},
	recentlyPlayedFrame: {
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "white",
		padding: 15,
		marginTop: 20,
		marginBottom: 20,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "white",
		marginBottom: 19,
	},
	recentlyPlayedItem: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 15,
	},
	gameThumbnail: {
		width: 50,
		height: 50,
		borderRadius: 25,
		marginRight: 15,
	},
	gameTitle: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 5,
	},
	timestamp: {
		color: "gray",
		fontSize: 14,
	},
	bottomButtonsContainer: {
		flexDirection: "column",
		justifyContent: "flex-start",
		marginTop: "auto",
		marginLeft: 0,
	},
	bottomButton: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		padding: 20,
		borderRadius: 8,
		marginBottom: 20,
		marginRight: 200,
	},

	button: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "rgba(255, 255, 255, 0.1)",
		padding: 15,
		borderRadius: 8,
		marginBottom: 10,
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		marginLeft: 10,
	},
	bottomIconsContainer: {
		width: "100%",
		height: 80,
		backgroundColor: "#673AB7",
		paddingBottom: 35,
	},
	bottomIcons: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		bottom: 0,
		width: "100%",
	},

	iconButton: {
		marginTop: 10,
		alignItems: "center",
	},
	iconText: {
		fontSize: 13,
		marginTop: 8,
		textAlign: "center",
		color: "white",
	},
});

export default ProfileScreen;
