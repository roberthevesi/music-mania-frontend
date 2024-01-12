import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	StatusBar,
	Platform,
	ScrollView,
	Image,
	Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import { useContext } from "react";
import { useRoute } from "@react-navigation/native";
import CustomBottomBar from "../../components/CustomBottomBar";

const LeaderboardScreen = () => {
	const route = useRoute();
	const currentRoute = route.name;
	const { userData, setUserData } = useContext(UserContext);

	const navigation = useNavigation();

	const onHomePressed = () => {
		navigation.navigate("Home");
	};

	const onLeaderboardPressed = () => {
		// navigation.navigate('Leaderboard');
	};

	const onProfilePressed = () => {
		navigation.navigate("Profile");
	};

	const [topPlayers, setTopPlayers] = useState([]);

	useEffect(() => {
		const fetchTopPlayers = async () => {
			const fetchedPlayers = await getTop10Users();
			if (fetchedPlayers) {
				setTopPlayers(
					fetchedPlayers.map((player, index) => ({
						...player,
						rank: index + 1,
						medal:
							index === 0
								? "🥇"
								: index === 1
								? "🥈"
								: index === 2
								? "🥉"
								: null,
						totalScore: player.score,
						image: player.profilePictureURL,
					}))
				);
			}
		};

		fetchTopPlayers();
	}, []);

	const getTop10Users = async () => {
		try {
			const response = await axios.get(
				"http://ec2-3-80-112-191.compute-1.amazonaws.com:8080/api/users/get-top10-users",
				{
					headers: {
						Authorization: `Bearer ${userData.token}`,
					},
				}
			);

			console.log("Response:", response.data);
			return response.data;
		} catch (error) {
			console.error("Error Details:", error.response || error);
			// Existing alert logic...
		}
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
		<View style={styles.container}>
			<LinearGradient
				colors={["#673AB7", "#001F3F"]}
				style={styles.linearGradient}
			>
				<CustomHeader
					title="Global Leaderboard"
					showBackButton={false}
				/>

				{/* <Text style={styles.topPlayersTitle}>Global Leaderboard</Text> */}
				<ScrollView contentContainerStyle={styles.scrollContainer}>
					<View style={styles.topPlayersContainer}>
						{topPlayers.map((player) => (
							<View
								key={player.rank}
								style={[
									styles.topPlayerItem,
									player.rank <= 3 ? styles.top3Player : null,
								]}
							>
								<View style={styles.medalContainer}>
									<Text
										style={[
											styles.medal,
											player.rank <= 3
												? styles.bigMedal
												: null,
										]}
									>
										{player.rank <= 3
											? player.medal
											: `${player.rank}.`}
									</Text>
								</View>
								{player.image && (
									<TouchableOpacity
										onPress={() =>
											viewUserProfile(player.username)
										}
									>
										<Image
											source={{ uri: player.image }}
											style={styles.profilePicture}
											resizeMode="cover"
										/>
									</TouchableOpacity>
								)}
								<View style={styles.userInfo}>
									<Text
										style={[
											styles.username,
											player.rank <= 3
												? styles.bigUsername
												: null,
										]}
									>
										{player.username}
									</Text>
									<Text style={styles.totalScore}>
										Score: {player.totalScore}
									</Text>
								</View>
							</View>
						))}
					</View>
				</ScrollView>

				<CustomBottomBar />
			</LinearGradient>
		</View>
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
	},
	linearGradient: {
		flex: 1,
		width: "100%",
	},
	scrollContainer: {
		alignItems: "center",
		justifyContent: "flex-start",
		paddingHorizontal: 30,
	},
	topPlayersContainer: {
		marginTop: 100,
		justifyContent: "center",
		alignContent: "center",
	},
	topPlayersTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "white",
		marginBottom: 80,
		alignContent: "center",
	},
	topPlayerItem: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 7,
	},
	top3Player: {
		backgroundColor: "rgba(255,255,255,0.2)",
		borderRadius: 20,
		padding: 7,
	},
	medal: {
		fontSize: 20,
		marginRight: 10,
		marginLeft: 10,
		color: "white",
	},
	medalContainer: {
		marginRight: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	bigMedal: {
		fontSize: 45,
		fontWeight: "bold",
	},
	username: {
		color: "white",
		fontSize: 20,
		marginBottom: 5,
	},
	bigUsername: {
		fontSize: 25,
		color: "white",
		marginBottom: 5,
	},
	totalScore: {
		color: "white",
		fontSize: 16,
	},
	bottomIconsContainer: {
		flexDirection: "column",
		justifyContent: "flex-start",
		marginTop: "auto",
		marginLeft: 0,
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
	profilePicture: {
		width: 50,
		height: 50,
		borderRadius: 25,
		marginRight: 10,
	},
});

export default LeaderboardScreen;
