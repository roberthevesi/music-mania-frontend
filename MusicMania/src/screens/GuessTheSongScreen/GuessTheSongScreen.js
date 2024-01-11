import React, { useState, useEffect, createRef } from "react";
import {
	View,
	Button,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	Alert,
	ActivityIndicator,
	Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import { useContext } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const GuessTheSongScreen = () => {
	const navigation = useNavigation();

	const [songs, setSongs] = useState([]);
	const [sound, setSound] = useState();
	const [currentSong, setCurrentSong] = useState(null);
	const { userData, setUserData } = useContext(UserContext);

	const [wrongAttempts, setWrongAttempts] = useState(0);

	const fetchSongsAndSetRandomSong = async () => {
		try {
			const response = await axios.get(
				"http://localhost:8080/api/songs/get-songs",
				{
					params: {
						user_id: userData.id,
					},
					headers: {
						Authorization: `Bearer ${userData.token}`,
					},
				}
			);
			setSongs(response.data);
			console.log("RESPONSE DATA: ", response.data);
			if (response.data.length > 0) {
				const randomIndex = Math.floor(
					Math.random() * response.data.length
				);
				setCurrentSong(response.data[randomIndex]);
			}
		} catch (error) {
			console.error("Error fetching songs:", error);
		}
	};

	const playRandomSong = async () => {
		if (currentSong && currentSong.fileURL) {
			try {
				const { sound: newSound } = await Audio.Sound.createAsync(
					{ uri: currentSong.fileURL },
					{ shouldPlay: true }
				);
				setSound(newSound);
			} catch (error) {
				console.error("Error loading song:", error);
			}
		}
	};

	// Clean up the sound when component unmounts
	useEffect(() => {
		return () => {
			if (sound) {
				sound.unloadAsync();
			}
		};
	}, [sound]);

	const updateUserScore = async (userId, newScore) => {
		try {
			const response = await axios.put(
				`http://localhost:8080/api/users/update-user-score?userId=${userId}&newScore=${newScore}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${userData.token}`,
					},
				}
			);
			console.log("Score updated:", response.data);
			setUserData({ ...userData, score: newScore });
			// Handle the response as needed
		} catch (error) {
			console.error("Error updating user score:", error);
		}
	};

	const handleGuess = async (song) => {
		const calculatePoints = (attempts) => {
			switch (attempts) {
				case 0:
					return 5; // First attempt
				case 1:
					return 2; // Second attempt
				case 2:
					return 1; // Third attempt
				default:
					return 0; // Fourth attempt
			}
		};

		if (song.id === currentSong.id) {
			const points = calculatePoints(wrongAttempts);

			try {
				updateUserScore(userData.id, userData.score + points);
			} catch (error) {
				console.error("Error updating user points:", error);
			}

			Alert.alert(
				"Correct!",
				`Congratulations! You guessed the correct song. Your earned ${points} points.`
			);
			setWrongAttempts(0);
			fetchSongsAndSetRandomSong();
		} else {
			Alert.alert("Wrong", "Sorry, that was not the correct answer.");
			setWrongAttempts(wrongAttempts + 1);

			// Disable the incorrect choice
			const updatedSongs = songs.map((s) =>
				s.id === song.id ? { ...s, disabled: true } : s
			);
			setSongs(updatedSongs);

			// Check if all other options are exhausted
			const remainingOptions = updatedSongs.filter(
				(s) => !s.disabled
			).length;
			if (remainingOptions === 0) {
				fetchSongsAndSetRandomSong();
			}
		}
	};

	useEffect(() => {
		fetchSongsAndSetRandomSong();
	}, []);

	const CustomHeader = ({ title, showBackButton }) => {
		const navigation = useNavigation();

		return (
			<View style={styles.headerContainer}>
				{showBackButton && (
					<TouchableOpacity
						style={styles.backButton}
						onPress={() => navigation.goBack()}
					>
						<Feather name="arrow-left" size={24} color="#FFF" />
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
		<LinearGradient
			colors={["#673AB7", "#001F3F"]}
			style={styles.container}
		>
			<CustomHeader
				title="Guess The Song"
				showBackButton={true}
				style={styles.header}
			/>

			<View style={styles.contentContainer}>
				<TouchableOpacity
					style={styles.playContainer}
					onPress={playRandomSong}
				>
					<Ionicons name="play-circle" size={50} color="#673AB7" />
					<Text style={styles.playText}>PLAY SONG!</Text>
				</TouchableOpacity>

				{/* {currentSong && (
				<Text>
					Now Playing: {currentSong.title} by {currentSong.artist}
				</Text>
			)} */}

				<View style={styles.gridContainer}>
					{songs.map((song, index) => (
						<TouchableOpacity
							key={index}
							style={[
								styles.buttonContainer,
								{ opacity: song.disabled ? 0.5 : 1 },
							]}
							onPress={() => handleGuess(song)}
							disabled={song.disabled}
						>
							<Image
								source={{ uri: song.imageURL }}
								style={styles.songImage}
							/>
							<Text style={styles.songTitle}>
								{song.title} by {song.artist}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</View>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	// container: {
	// 	flex: 1, // This makes sure the container takes up the whole screen
	// },
	header: {
		// Style your header if needed
	},
	contentContainer: {
		flex: 1,
		justifyContent: "center", // This centers content vertically
		alignItems: "center", // This centers content horizontally
		width: "100%", // This ensures the content takes up the full width of the screen
		// Adjust padding or margin as needed
	},
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
		paddingBottom: 10,
		width: "100%",
		marginTop: 60,
		marginBottom: 0,
		// flex: 1,
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
		color: "#FFF",
		alignItems: "center",
	},
	playContainer: {
		justifyContent: "center",
		alignItems: "center",
		padding: 15,
		// marginVertical: 10,
		margin: 50,
		backgroundColor: "#FFF", // Background color for the play box
		borderColor: "#673AB7", // Outline color
		borderWidth: 1,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	playText: {
		marginTop: 5,
		color: "#673AB7", // Text color that matches the box border
		fontWeight: "bold",
		fontSize: 16,
	},
	gridContainer: {
		width: "90%",
		marginLeft: 30,
		marginBottom: 80,
		// alignItems: "center",
		justifyContent: "center",
	},
	buttonContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		width: "90%", // Adjust the width as needed
		marginVertical: 5,
		padding: 10,
		backgroundColor: "#FFF",
		borderColor: "#673AB7",
		borderWidth: 1,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		// Ensure a consistent width for all containers
		alignSelf: "stretch", // This will stretch the button to fill the parent width
	},
	songImage: {
		width: 50, // Adjust the width as needed
		height: 50, // Adjust the height as needed
		marginRight: 10,
		// Optional: Set a small borderRadius for slightly rounded corners, or remove this line for completely rectangular images
		borderRadius: 5, // Adjust or remove this line
	},
	songTitle: {
		// Add styles for your song title text if needed
	},
	container: {
		flex: 1,
		// alignItems: "center",
		justifyContent: "center",
	},
	header: {
		position: "absolute",
		top: 60,
		left: 20,
	},
	backButton: {
		// backgroundColor: "rgba(255, 255, 255, 0.5)",
		borderRadius: 20,
		width: 40,
		height: 40,
		alignItems: "center",
		justifyContent: "center",
	},
	backArrow: {
		color: "white",
		fontWeight: "bold",
		fontSize: 20,
	},
	innerContainer: {
		alignItems: "center",
	},
	songSnippet: {
		width: 250,
		height: 250,
		marginBottom: 40,
		borderRadius: 10,
	},
	optionButton: {
		backgroundColor: "lavender",
		paddingVertical: 2,
		paddingHorizontal: 40,
		marginVertical: 10,
		borderRadius: 10,
		width: "40%",
		alignItems: "flex-start",
		height: 80,
		justifyContent: "center",
	},
	optionText: {
		fontSize: 14,
		fontWeight: "700",
		color: "#333",
		alignContent: "flex-start",
		justifyContent: "flex-start",
	},
	correctOption: {
		backgroundColor: "green",
	},
	incorrectOption: {
		backgroundColor: "red",
	},
	loadingIndicator: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default GuessTheSongScreen;
