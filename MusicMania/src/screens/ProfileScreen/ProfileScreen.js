import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar, Platform, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Logo from '../../../assets/images/record.png';
import Logo_2 from '../../../assets/images/song.png';


const ProfileScreen = ({ route }) => {
  const { username = 'Guest', profilePicture, totalScore } = route.params ?? {};
  const navigation = useNavigation();

  const [recentlyPlayedGames, setRecentlyPlayedGames] = useState([
    { id: 1, title: 'Guess the Song', thumbnail: Logo_2, lastPlayed: '2 hours ago' },
    { id: 2, title: 'Guess the Album', thumbnail: Logo, lastPlayed: '1 day ago' },
  ]);

  const onLogOutPressed = () => {
    navigation.navigate('SignIn');
  };

  const onSettingsPressed = () => {
    navigation.navigate('Settings');
  };

  const onEditProfilePressed = () => {
    const userData = {
      username: 'JohnDoe',
      profilePicture: 'https://source.unsplash.com/200x200/?portrait',
      totalScore: 500,
    };

    navigation.navigate('EditProfile');
  };
  const onGuessTheSongPressed = () => {
    
    navigation.navigate('GuessTheSong');
  };

  const onGuessTheAlbumPressed = () => {
   
    navigation.navigate('GuessTheAlbum');
  };

  return (
    <LinearGradient
    colors={['#001F3F', '#1E1E1E']}
    style={styles.container}
  >
    <View style={styles.userInfo}>
      {profilePicture && (
        <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
      )}
      <Text style={styles.username}>{username}</Text>

      <View style={styles.totalScoreContainer}>
        <View style={styles.totalScoreSquare}>
          <Text style={styles.totalScoreLabel}>Total Score:</Text>
          <Text style={styles.totalScore}>{totalScore} <Feather name="star" size={20} color="red" style={styles.starIcon} /></Text>
        </View>
      </View>
    </View>

    <View style={styles.recentlyPlayedFrame}>
      <Text style={styles.sectionTitle}>Recently Played</Text>
      {recentlyPlayedGames.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.recentlyPlayedItem}
          onPress={item.title === 'Guess the Song' ? onGuessTheSongPressed : onGuessTheAlbumPressed}
        >
          <Image source={item.thumbnail} style={styles.gameThumbnail} />
          <View style={{ flex: 1 }}>
            <Text style={styles.gameTitle}>{item.title}</Text>
            <Text style={styles.timestamp}>{item.lastPlayed}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>

    <View style={styles.bottomButtonsContainer}>
      <TouchableOpacity style={styles.bottomButton} onPress={onEditProfilePressed}>
        <Feather name="edit" size={20} color="white" />
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.bottomButton} onPress={onSettingsPressed}>
        <Feather name="settings" size={20} color="white" />
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.bottomButton} onPress={onLogOutPressed}>
        <Feather name="log-out" size={20} color="white" />
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  userInfo: {
    alignItems: 'center',
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
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  totalScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  starIcon: {
    marginLeft: 5,
  },
  totalScoreSquare: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  totalScore: {
    fontSize: 24,
    color: '#FF3F3F',
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  totalScoreLabel: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recentlyPlayedFrame: {
    
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
    padding: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 19,
  },
  recentlyPlayedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  gameThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  gameTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  timestamp: {
    color: 'gray',
    fontSize: 14,
  },
  bottomButtonsContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 'auto',
    marginLeft: 0,
  },
  bottomButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    marginRight: 200,
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default ProfileScreen;