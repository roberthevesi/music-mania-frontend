import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';


const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  

  const onLeaderboardPressed = () => {
   navigation.navigate('Leaderboard');

  }

  const onProfilePressed = () => {
    navigation.navigate('Profile');
 
 }

 const onGuessTheSongPressed = () => {
  closeModal(); // Close the modal
  navigation.navigate('GuessTheSong');
};

const onGuessTheAlbumPressed = () => {
  closeModal(); // Close the modal
  navigation.navigate('GuessTheAlbum');
};

  return (
    <LinearGradient
      colors={['#3498db', '#e74c3c']} // Adjust these colors as per your preference
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          <Text style={styles.boldText}>Welcome to</Text>{'\n'}
          <Text style={[styles.boldText, styles.musicManiaText]}>Music Mania!</Text>
        </Text>
      </View>

      <View style={styles.centeredContent}>
        <TouchableOpacity style={styles.playButton} onPress={openModal}>
          <MaterialCommunityIcons name="play" size={50} color="white" />
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.gameOption} onPress={onGuessTheSongPressed}>
                <MaterialCommunityIcons name="music-note" size={30} color="#3498db" />
                <Text style={styles.gameOptionText}>Guess the Song</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.gameOption} onPress={onGuessTheAlbumPressed}>
                <MaterialCommunityIcons name="album" size={30} color="#e74c3c" />
                <Text style={styles.gameOptionText}>Guess the Album</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.bottomIcons}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Home')}>
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'filex-start',
    alignItems: 'center',
    marginTop: 100,
  },
  headerText: {
    fontSize: 24,
    textAlign: 'center',
    color: 'white', // Text color
  },
  boldText: {
    fontWeight: 'bold',
    color: '#ecf0f1', // Header text color
  },
  musicManiaText: {
    fontSize: 28,
    color: '#e74c3c', // Music Mania text color
    
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  playButton: {
    backgroundColor: '#2c3e50', // Play button color
    borderRadius: 50,
    padding: 20,
    alignItems: 'center',
    marginBottom: 200,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  gameOption: {
    alignItems: 'center',
    marginBottom: 15,
  },
  gameOptionText: {
    fontSize: 16,
    marginTop: 5,
  },
  closeButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  bottomIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  iconButton: {
    alignItems: 'center',
  },
  iconText: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
    color: 'white', // Icon text color
  },
});

export default Home;
