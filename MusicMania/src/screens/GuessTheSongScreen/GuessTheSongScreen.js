import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const GuessTheSongScreen = () => {
  const navigation = useNavigation();

  const [songData, setSongData] = useState({
    snippet: 'https://i.imgur.com/SongSnippet.jpg', // Replace with the actual song snippet URL
    options: ['Shape of You - Ed Sheeran', 'Blinding Lights - The Weeknd', 'Someone You Loved - Lewis Capaldi', 'Watermelon Sugar - Harry Styles'],
    correctAnswer: 'Blinding Lights - The Weeknd',
  });

  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSelection = (selectedOption) => {
    const isCorrect = selectedOption === songData.correctAnswer;
    setSelectedOption(selectedOption);

    if (isCorrect) {
      Alert.alert('Correct!', 'Congratulations! You guessed the correct song.');
    } else {
      Alert.alert('Incorrect', 'Sorry, that was not the correct answer.');
    }
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <LinearGradient
      colors={['#673AB7', '#001F3F']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.backButton}>
            <Text style={styles.backArrow}>X</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.innerContainer}>
        <Image
          source={{ uri: songData.snippet }}
          style={styles.songSnippet}
          onLoad={handleImageLoad}
          onLoadEnd={handleImageLoad}
        />
        {loading && <ActivityIndicator style={styles.loadingIndicator} size="large" color="white" />}
        {!loading && songData.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === option && (option === songData.correctAnswer ? styles.correctOption : styles.incorrectOption),
            ]}
            onPress={() => handleSelection(option)}
            disabled={selectedOption !== null}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 60,
    left: 20,
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  innerContainer: {
    alignItems: 'center',
  },
  songSnippet: {
    width: 250,
    height: 250,
    marginBottom: 40,
    borderRadius: 10,
  },
  optionButton: {
    backgroundColor: 'lavender',
    paddingVertical: 2,
    paddingHorizontal: 40,
    marginVertical: 10,
    borderRadius: 10,
    width: '40%',
    alignItems: 'flex-start',
    height: 80,
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
  },
  correctOption: {
    backgroundColor: 'green',
  },
  incorrectOption: {
    backgroundColor: 'red',
  },
  loadingIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GuessTheSongScreen;
