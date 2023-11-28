import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = ({ route }) => {
  const { username = 'Guest', email = '', profilePicture, totalScore } = route.params ?? {};
  const navigation = useNavigation();

    const onLogOutPressed = () => {

        navigation.navigate('SignIn');
    }

    const onSettingsPressed = () => {

      navigation.navigate('Settings');
  }

  const onEditProfilePressed = () => {

    navigation.navigate('EditProfile');
}

  return (
    <LinearGradient
      colors={['#B19CD9', '#FF3F3F']}
      style={styles.container}
    >
      <View style={styles.userInfo}>
      {profilePicture && (
          <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
        )}
        <Text style={styles.username}>{username}</Text>
        {totalScore !== undefined && (
          <Text style={styles.totalScore}>Total Score: {totalScore}</Text>
        )}
        <Text style={styles.email}>{email}</Text>
      </View>

      {/* Rest of your Profile content */}

      <TouchableOpacity style={styles.buttonWithIcon} onPress={onEditProfilePressed}>
        <Feather name="edit" size={20} color="white" />
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonWithIcon} onPress={onSettingsPressed}>
        <Feather name="settings" size={20} color="white" />
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonWithIcon} onPress={onLogOutPressed}>
        <Feather name="log-out" size={20} color="white" />
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  totalScore: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: 'white',
  },
  buttonWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default ProfileScreen;
