import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GuessTheAlbumScreen = () => {
  // State to store the album data
  const [albumData, setAlbumData] = useState({
    cover: 'https://example.com/placeholder.jpg', // Replace with  actual cover URL
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'], // Replace with actual options
  });

  // Function to handle user's selection
  const handleSelection = (selectedOption) => {
    // Check if the selectedOption is correct
    const isCorrect = selectedOption === albumData.correctAnswer;
  
    // Display a message or navigate to the next screen accordingly
    if (isCorrect) {
      
      Alert.alert('Correct!', 'Congratulations! You guessed the correct album.');
      
    } else {
      
      Alert.alert('Incorrect', 'Sorry, that was not the correct answer. Try again!');
      
    }
  };

  return (
    <LinearGradient
    colors={['#B19CD9', '#FF3F3F']}
    style={styles.container}
    >
        
    <View style={styles.container}>
      {/* Display album cover image */}
      <Image source={{ uri: albumData.cover }} style={styles.albumCover} />

      {/* Display options for the user to choose from */}
      {albumData.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionButton}
          onPress={() => handleSelection(option)}
        >
          <Text>{option}</Text>
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
  albumCover: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
});

export default GuessTheAlbumScreen;
