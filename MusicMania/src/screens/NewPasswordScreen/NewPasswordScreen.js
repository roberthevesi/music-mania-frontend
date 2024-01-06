import React, { useState } from 'react';
import { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation, useRoute } from '@react-navigation/native';
import UserContext from '../../contexts/UserContext';
import axios from 'axios';
import { Alert } from 'react-native';

const NewPasswordScreen = () => {
    const { userData, setUserData } = useContext(UserContext);

    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const route = useRoute();
    const navigation = useNavigation();
    const received_email = route.params?.email;

    const onSubmitPressed = async () => {
        try{
            const code_response = await axios.delete(`http://localhost:8080/api/users/delete-user`, {
                params: {
                    userId: userData.id
                }
            });

            console.log('resp: ', code_response.data)

            if(code_response.data) { // code is ok
                const password_response = await axios.put(`http://localhost:8080/api/users/set-new-password?email=${encodeURIComponent(received_email)}&password=${encodeURIComponent(newPassword)}`);

                console.log('resp: ', password_response.data)
                Alert.alert(
                    "Success", // Title of the alert
                    "Your password has been changed successfully", // Message
                    [
                        { 
                            text: "OK", 
                            onPress: () => navigation.navigate('SignIn') // Navigate on pressing OK
                        }
                    ],
                    { cancelable: false } // This prevents dismissing the alert by tapping outside of it
                );
            }
        } catch (error) {
            console.error('Error resetting password: ', error);
            
            Alert.alert(
                "Error", // Title of the alert
                "Something went wrong, please try again.", // Message
                [
                    { 
                        text: "OK", 
                        onPress: () => navigation.navigate('SignIn') // Navigate on pressing OK
                    }
                ],
                { cancelable: false } // This prevents dismissing the alert by tapping outside of it
            );
        }




        // navigation.navigate('Home');

    }
    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    }

    const isButtonDisabled = !code || !newPassword || !confirmNewPassword || (newPassword !== confirmNewPassword);
  
   


    return (
        <ScrollView contentContainerStyle={styles.root}>
            <Text style={styles.title}>Reset your password</Text>
            
            <CustomInput placeholder="Enter your confirmation code" value={code} setValue={setCode} uppercase={true} maxLength={6}/>
            <CustomInput placeholder="New password" value={newPassword} setValue={setNewPassword} autoCapitalize="none" secureTextEntry={true}/>
            <CustomInput placeholder="Repeat new password" value={confirmNewPassword} setValue={setConfirmNewPassword} autoCapitalize="none" secureTextEntry={true}/>
           
            <CustomButton 
                text="Submit" 
                onPress={onSubmitPressed} 
                disabled={isButtonDisabled} // Pass the disabled state
            />
           
            <CustomButton text="Back to sign in" onPress={onSignInPressed} type="TERTIARY" />
            
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: -1,
        backgroundColor: 'lavender',
    },
    
    title: {
        
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
        marginVertical: 50,
        
    },

    text: {
        color: 'gray',
        marginVertical: -15,
        marginHorizontal: 10,
        marginBottom:50,
    },
    link: {
        color: '#FDB075'
    }


});

export default NewPasswordScreen;
