// CustomBottomBar.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const CustomBottomBar = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const currentRoute = route.name;

	return (
		<View style={styles.bottomIconsContainer}>
			<View style={styles.bottomIcons}>
				{/* Home Button */}
				<TouchableOpacity
					style={styles.iconButton}
					onPress={() => navigation.navigate("Home")}
				>
					<MaterialCommunityIcons
						name="home"
						size={currentRoute === "Home" ? 35 : 30}
						color={currentRoute === "Home" ? "#ffb5fe" : "white"}
					/>
					<Text
						style={[
							styles.iconText,
							{
								color:
									currentRoute === "Home"
										? "#ffb5fe"
										: "white",
							},
						]}
					>
						Home
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.iconButton}
					onPress={() => navigation.navigate("Leaderboard")}
				>
					<MaterialCommunityIcons
						name="trophy"
						size={currentRoute === "Leaderboard" ? 35 : 30}
						color={
							currentRoute === "Leaderboard" ? "#ffb5fe" : "white"
						} // Change color when active
					/>
					<Text
						style={[
							styles.iconText,
							{
								color:
									currentRoute === "Leaderboard"
										? "#ffb5fe"
										: "white",
							},
						]}
					>
						Leaderboard
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.iconButton}
					onPress={() => navigation.navigate("Profile")}
				>
					<MaterialCommunityIcons
						name="account"
						size={currentRoute === "Profile" ? 35 : 30}
						color={currentRoute === "Profile" ? "#ffb5fe" : "white"} // Change color when active
					/>
					<Text
						style={[
							styles.iconText,
							{
								color:
									currentRoute === "Profile"
										? "#ffb5fe"
										: "white",
							},
						]}
					>
						Profile
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

// You should move the relevant styles here from your main StyleSheet
const styles = StyleSheet.create({
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

export default CustomBottomBar;
