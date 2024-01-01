import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, TextInput, StatusBar, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';

const SettingsScreen = () => {
  const [backgroundMusicEnabled, setBackgroundMusicEnabled] = useState(true);
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isChangePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const toggleBackgroundMusic = () => setBackgroundMusicEnabled((prev) => !prev);
  const toggleSoundEffects = () => setSoundEffectsEnabled((prev) => !prev);
  const toggleDarkMode = () => setDarkModeEnabled((prev) => !prev);
  const toggleNotifications = () => setNotificationsEnabled((prev) => !prev);



  const handleContactSupport = () => {
    // cum facem aici
    console.log('Contacting Support...');
  };

  return (
    <LinearGradient colors={['#001F3F', '#1E1E1E']} style={styles.container}>
      <Text style={styles.sectionTitle}>Sound Settings</Text>
      <View style={styles.settingRow}>
        <Text>Background Music</Text>
        <Switch value={backgroundMusicEnabled} onValueChange={toggleBackgroundMusic} />
      </View>
      <View style={styles.settingRow}>
        <Text>Sound Effects</Text>
        <Switch value={soundEffectsEnabled} onValueChange={toggleSoundEffects} />
      </View>

      <Text style={styles.sectionTitle}>Appearance Settings</Text>
      <View style={styles.settingRow}>
        <Text>Dark Mode</Text>
        <Switch value={darkModeEnabled} onValueChange={toggleDarkMode} />
      </View>

      <Text style={styles.sectionTitle}>Notifications</Text>
      <View style={styles.settingRow}>
        <Text>Enable Notifications</Text>
        <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
      </View>

    

      <TouchableOpacity style={styles.helpButton} onPress={handleContactSupport}>
        <Feather name="help-circle" size={20} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Contact Support</Text>
      </TouchableOpacity>


    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 100,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'white',
  },
  settingRow: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 5,
    padding: 10,
  },
 
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  icon: {
    marginRight: 10,
  },
  
 
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SettingsScreen;
