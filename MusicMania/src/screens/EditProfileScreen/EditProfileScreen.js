import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator, Image, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

const EditProfileScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('JohnDoe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChangePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const onLogOutPressed = () => {
    navigation.navigate('SignIn');
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      
      await new Promise((resolve) => setTimeout(resolve, 2000));
      Alert.alert('Success', 'Profile updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeProfilePicture = () => {
    // Implement logic to change profile picture, Open gallery or camera, set the new profile picture using setNewProfilePicture
  };

  const handleChangePassword = () => {
    setChangePasswordModalVisible(true);
  };

  const handleSavePassword = () => {
    // Implement logic to handle the password change based on currentPassword and newPassword, close the modal when done
    setChangePasswordModalVisible(false);
  };

  const handleDeleteAccount = async () => {
    try {
      setIsLoading(true);
      
     
      await new Promise((resolve) => setTimeout(resolve, 2000));
      Alert.alert('Account Deleted', 'Your account has been successfully deleted.');
      navigation.navigate('SignIn'); 
    } catch (error) {
      console.error('Error deleting account:', error);
      Alert.alert('Error', 'Failed to delete account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#001F3F', '#1E1E1E']} style={styles.container}>
      <View style={styles.userInfo}>
        <Image source={{ uri: 'https://source.unsplash.com/200x200/?portrait' }} style={styles.profilePicture} />
        <Text style={styles.username}>{username}</Text>
      </View>

      
      <TextInput
        style={styles.input}
        placeholder="Edit Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholderTextColor="#ecf0f1"
      />
      <TextInput
        style={styles.input}
        placeholder="Edit Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholderTextColor="#ecf0f1"
      />

      
      <TouchableOpacity style={styles.changeButton} onPress={handleChangeProfilePicture}>
        <Feather name="camera" size={20} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Change Profile Picture</Text>
      </TouchableOpacity>

    
      <TouchableOpacity style={styles.changeButton} onPress={handleChangePassword}>
        <Feather name="lock" size={20} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.changeButton} onPress={onLogOutPressed}>
        <Feather name="log-out" size={20} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Feather name="trash-2" size={20} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={!username.trim() && !email.trim() && !newProfilePicture}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>

        {isLoading && <ActivityIndicator size="large" color="#fff" />}

        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <Modal isVisible={isChangePasswordModalVisible} onBackdropPress={() => setChangePasswordModalVisible(false)}>
  <View style={styles.modalContainer}>
    <Text style={styles.modalTitle}>Change Password</Text>
    <TextInput
      style={styles.input}
      placeholder="Current Password"
      secureTextEntry
      value={currentPassword}
      onChangeText={setCurrentPassword}
    />
    <TextInput
      style={styles.input}
      placeholder="New Password"
      secureTextEntry
      value={newPassword}
      onChangeText={setNewPassword}
    />

    {/* Buttons Container */}
    <View style={styles.modalButtonsContainer}>
      <TouchableOpacity style={styles.cancelModalButton} onPress={() => setChangePasswordModalVisible(false)}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveModalButton} onPress={handleSavePassword}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  userInfo: {
    marginTop: 80,
    marginBottom: 20,
    padding: 10,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
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
    marginBottom: 10,
  },
  changeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    height: 50,
    width: '90%',
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: 'white',
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: '#2ecc71',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalContainer: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    
  },
  cancelModalButton: {
    backgroundColor: 'black',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 10,
  },
  saveModalButton: {
    backgroundColor: 'black',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    
  },
});

export default EditProfileScreen;
