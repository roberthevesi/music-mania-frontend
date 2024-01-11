import React, { useState, useEffect } from "react";
import {
	View,
	TouchableOpacity,
	Text,
	Image,
	StyleSheet,
	Animated,
	Easing,
	ImageBackground,
	Button,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../../assets/images/record.png";
import Logo_2 from "../../../assets/images/song.png";

const Home = () => {
	const [fadeAnimation] = useState(new Animated.Value(1));
	const [showGames, setShowGames] = useState(false);
	const navigation = useNavigation();

	useEffect(() => {
		startFadeAnimation();
	}, []);

	const startFadeAnimation = () => {
		Animated.timing(fadeAnimation, {
			toValue: 0,
			duration: 1200,
			easing: Easing.linear,
			useNativeDriver: true,
		}).start(() => {
			setShowGames(true);
		});
	};

	const onLeaderboardPressed = () => {
		navigation.navigate("Leaderboard");
	};

	const onProfilePressed = () => {
		navigation.navigate("Profile");
	};

	const onGuessTheSongPressed = () => {
		navigation.navigate("GuessTheSong");
	};

	return (
		<ImageBackground
			source={require("../../media/bg.jpg")} // Update with the correct path
			style={styles.backgroundImage}
		>
			{/* Your homepage content goes here */}
			<View style={styles.contentContainer}>
				{/* Centered button to navigate to GuessTheSong */}
				<TouchableOpacity
					style={styles.centerButton}
					onPress={() => navigation.navigate("GuessTheSong")}
				>
					<Text style={styles.buttonText}>PLAY!</Text>
				</TouchableOpacity>

				{/* ... other components ... */}
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
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		width: "100%",
		height: "100%",
	},
	contentContainer: {
		flex: 1,
		justifyContent: "center", // Centers content vertically in the container
		alignItems: "center", // Centers content horizontally in the container
	},
	centerButton: {
		marginTop: 450,
		backgroundColor: "#673AB7", // Background color for the button
		paddingVertical: 15, // Increased vertical padding for a larger button
		paddingHorizontal: 30, // Increased horizontal padding for a larger button
		borderRadius: 20, // More rounded corners
		// Add additional styling as needed
	},
	buttonText: {
		color: "#FFFFFF", // Text color
		fontSize: 20, // Larger font size
		fontWeight: "bold", // Bold text
		// Add additional styling as needed
	},

	container: {
		flex: 1,
		justifyContent: "flex-start",
		paddingTop: 50,
	},
	headerContainer: {
		alignItems: "center",
		marginTop: 40,
	},
	headerText: {
		fontSize: 30,
		color: "#FFFF",
		fontWeight: "bold",
		textShadowColor: "black",
		textShadowOffset: { width: 5, height: 5 },
		textShadowRadius: 5,
	},
	centeredContent: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	boldText: {
		alignContent: "center",
		fontWeight: "100",
		color: "#ecf0f1",
		textShadowColor: "white",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 2,
	},
	musicManiaText: {
		alignContent: "center",
		fontSize: 120,
		color: "#FF3F3F",
		textShadowColor: "black",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 10,
	},
	gameOption: {
		alignItems: "center",
		marginBottom: 5,
	},
	logo: {
		width: 450,
		height: 450,
		borderRadius: 10,
		marginBottom: 15,
		borderWidth: 0,
		borderColor: "#FFFFFF",
	},
	gameOptionText: {
		fontSize: 20,
		marginBottom: 50,
		color: "#FFFF",
		marginTop: 5,
		fontWeight: "300",
		textShadowColor: "#673AB7",
		textShadowOffset: { width: 5, height: 5 },
		textShadowRadius: 5,
		backgroundColor: "black",
	},
	bottomIconsContainer: {
		width: "100%",
		backgroundColor: "#673AB7",
		// Adjust these properties as needed
		paddingVertical: 10,
		paddingHorizontal: 20,
		position: "absolute", // Position the menu bar absolutely
		bottom: 0, // Anchor it to the bottom
		left: 0, // Align to the left
		right: 0, // Align to the right
	},
	bottomIcons: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	iconButton: {
		alignItems: "center",
	},
	iconText: {
		fontSize: 13,
		marginTop: 8,
		textAlign: "center",
		color: "white",
	},
});

export default Home;
