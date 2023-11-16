import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../../assets/images/record.png';
import Logo_2 from '../../../assets/images/song.png';



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
  };

  const onProfilePressed = () => {
    navigation.navigate('Profile');
  };

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
      colors={['#B19CD9', '#FF3F3F']}
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
              {/* "Guess the Song" button */}
              <TouchableOpacity style={styles.gameOption} onPress={onGuessTheSongPressed}>
                <Image source={Logo_2} style={[styles.logo]} resizeMode="contain" />
                <Text style={styles.gameOptionText}>GUESS THE SONG</Text>
              </TouchableOpacity>

              {/* "Guess the Album" button */}
              <TouchableOpacity style={styles.gameOption} onPress={onGuessTheAlbumPressed}>
                <Image source={Logo} style={[styles.logo]} resizeMode="contain" />  
                <Text style={styles.gameOptionText}>GUESS THE ALBUM</Text>
              </TouchableOpacity>

              {/* Close button */}
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      {/* Bottom navigation icons */}
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  headerText: {
    fontSize: 24,
    textAlign: 'center',
    color: 'white', 
  },
  boldText: {
    fontWeight: 'bold',
    color: '#ecf0f1',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2, 
  },
  musicManiaText: {
    fontSize: 50,
    color: '#FF3F3F',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  playButton: {
    backgroundColor: '#2c3e50', 
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
    backgroundColor: 'lavender',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  gameOption: {
    alignItems: 'center',
    marginBottom: 15,
  },
  gameImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 5,
  },
  gameOptionText: {
    fontSize: 16,
    color: '#FF3F3F',
    marginTop: 5,
    fontWeight: 'bold', 
    fontFamily: 'System',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  closeButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 100,
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
    color: 'white', 
  },
  
});


export default Home;
