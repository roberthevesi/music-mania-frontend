import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Platform, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';


const LeaderboardScreen = () => {
  const navigation = useNavigation();

  const onHomePressed = () => {
    navigation.navigate('Home');
  };

  const onLeaderboardPressed = () => {
    navigation.navigate('Leaderboard');
  };

  const onProfilePressed = () => {
    navigation.navigate('Profile');
  };

  
  const topPlayers = [
    { rank: 1, username: 'Player1', medal: '🥇', totalScore: 1200, image: 'https://source.unsplash.com/200x200/?portrait' },
    { rank: 2, username: 'Player2', medal: '🥈', totalScore: 1000, image: 'https://source.unsplash.com/200x200/?portrait' },
    { rank: 3, username: 'Player3', medal: '🥉', totalScore: 800, image: 'https://source.unsplash.com/200x200/?portrait' },
    { rank: 4, username: 'Player4', medal: '🏅', totalScore: 750, image: 'https://source.unsplash.com/200x200/?portrait' },
    { rank: 5, username: 'Player5', medal: '🏅', totalScore: 720, image: 'https://source.unsplash.com/200x200/?portrait' },
    { rank: 6, username: 'Player6', medal: '🏅', totalScore: 690, image: 'https://source.unsplash.com/200x200/?portrait' },
    { rank: 7, username: 'Player7', medal: '🏅', totalScore: 660, image: 'https://source.unsplash.com/200x200/?portrait' },
    { rank: 8, username: 'Player8', medal: '🏅', totalScore: 630, image: 'https://source.unsplash.com/200x200/?portrait' },
    { rank: 9, username: 'Player9', medal: '🏅', totalScore: 600, image: 'https://source.unsplash.com/200x200/?portrait' },
    { rank: 10, username: 'Player10', medal: '🏅', totalScore: 580, image: 'https://source.unsplash.com/200x200/?portrait' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#673AB7', '#001F3F']}
        style={styles.linearGradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.topPlayersContainer}>
            <Text style={styles.topPlayersTitle}>Global Leaderboard</Text>
            {topPlayers.map((player) => (
  <View key={player.rank} style={styles.topPlayerItem}>
    <View style={styles.medalContainer}>
      <Text style={[styles.medal, player.rank <= 3 ? styles.bigMedal : null]}>
        {player.medal}
      </Text>
    </View>
    {player.image && (
      <TouchableOpacity onPress={() => viewUserProfile(player.username)}>
        <Image
          source={{ uri: player.image }}
          style={styles.profilePicture}
          resizeMode="cover"
        />
      </TouchableOpacity>
    )}
    <View style={styles.userInfo}>
      <Text style={styles.username}>{player.username}</Text>
      <Text style={styles.totalScore}>Total Score: {player.totalScore}</Text>
    </View>
  </View>
))}

          </View>
        </ScrollView>

        <View style={styles.bottomIconsContainer}>
          <View style={styles.bottomIcons}>
            <TouchableOpacity style={styles.iconButton} onPress={onHomePressed}>
              <MaterialCommunityIcons name="home" size={30} color="white" />
              <Text style={styles.iconText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton} onPress={onLeaderboardPressed}>
              <MaterialCommunityIcons name="trophy" size={30} color="white" />
              <Text style={styles.iconText}>Leaderboard</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton} onPress={onProfilePressed}>
              <MaterialCommunityIcons name="account" size={30} color="white" />
              <Text style={styles.iconText}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  linearGradient: {
    flex: 1,
    width: '100%',
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  topPlayersContainer: {
    marginTop: 100,
  },
  topPlayersTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 80,
  },
  topPlayerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  medal: {
    fontSize: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  medalContainer: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigMedal: {
    fontSize: 45, 
    fontWeight: 'bold', 
  },
  
  
  username: {
    color: 'white',
    fontSize: 20,
    marginBottom: 15,
  },
  bottomIconsContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 'auto',
    marginLeft: 0,
    width: '100%',
    height: 80,
    backgroundColor: '#673AB7',
    paddingBottom: 35,
  },
  bottomIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    bottom: 0,
    width: '100%',
  },
  iconButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  iconText: {
    fontSize: 13,
    marginTop: 8,
    textAlign: 'center',
    color: 'white',
  },
  profilePicture: {
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    marginRight: 10,
  },
  
});

export default LeaderboardScreen;
