import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

import UserContext from '../../contexts/UserContext';
import { useContext } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';

const SignUpScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const navigation = useNavigation();

    const onRegisterPressed = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/users/send-new-user-code', {
                username: username,
                email: email,
                password: password
            });

            // console.log(response.data);

            navigation.navigate('ConfirmEmail', { email: email, username: username, password: password });


        } catch (error) {
            console.error('Error creating user: ', error);
            // setLoginError('Your email may be wrong.');

            let errorMessage = "Something went wrong. Please try again.";
            
            if (error.response && error.response.data) {
                // If the error response contains a message, use it
                errorMessage = error.response.data;
            }

            // Display the error message to the user
            Alert.alert("Error", errorMessage);


        }
        // navigation.navigate('ConfirmEmail');
    }

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    }

    const onTermsOfUsePressed = () => {
        console.warn("TermsOfUse");
    }

    const onPrivacyPolicyPressed = () => {
        console.warn("PrivacyPolicy");
    }

    const isButtonDisabled = !email || !username || !password || !confirmPassword || (password !== confirmPassword);



    return (
        <ScrollView contentContainerStyle={styles.root}>
            <Text style={styles.title}>Create an account</Text>

            <CustomInput placeholder="Email" value={email} setValue={setEmail} autoCapitalize="none" />

            <CustomInput placeholder="Username" value={username} setValue={setUsername} autoCapitalize="none" />

            <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true} autoCapitalize="none" />

            <CustomInput placeholder="Password" value={confirmPassword} setValue={setConfirmPassword} secureTextEntry={true} autoCapitalize="none" />

            <CustomButton 
                text="Register" 
                onPress={onRegisterPressed} 
                disabled={isButtonDisabled} // Pass the disabled state
            />
            
            <CustomButton text="Already have an account? Sign in" onPress={onSignInPressed} type="SECONDARY" />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 1,
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
        marginVertical: 10,
        marginHorizontal: 10,
        marginBottom:50,
        padding: 8,
    },
    link: {
        color: '#FDB075'
    }


});

export default SignUpScreen;
