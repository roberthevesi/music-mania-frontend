import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, TouchableHighlight } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Home = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        <Text style={styles.boldText}>Dive into the Beat</Text> with{'\n'}
        <Text style={[styles.boldText, styles.musicManiaText]}>Music Mania!</Text>
      </Text>

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
              <TouchableOpacity style={styles.gameOption} onPress={() => navigation.navigate('GuessTheSong')}>
                <MaterialCommunityIcons name="music-note" size={30} color="#3498db" />
                <Text style={styles.gameOptionText}>Guess the Song</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.gameOption} onPress={() => navigation.navigate('GuessTheAlbum')}>
                <MaterialCommunityIcons name="album" size={30} color="#e74c3c" />
                <Text style={styles.gameOptionText}>Guess the Album</Text>
              </TouchableOpacity>

              <TouchableHighlight onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.bottomIcons}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Home')}>
          <MaterialCommunityIcons name="home" size={30} color="black" />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Leaderboard')}>
          <MaterialCommunityIcons name="trophy" size={30} color="black" />
          <Text style={styles.iconText}>Leaderboard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Profile')}>
          <MaterialCommunityIcons name="account" size={30} color="black" />
          <Text style={styles.iconText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 100,
    backgroundColor: 'lavender',
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#6c5ce7',
  },
  musicManiaText: {
    fontSize: 28,
    color: '#ff7f50',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: '#3498db',
    borderRadius: 50,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
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
  },
});

export default Home;
