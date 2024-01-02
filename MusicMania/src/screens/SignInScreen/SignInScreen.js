import React, { useState } from 'react';
import { useContext } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Logo from '../../../assets/images/Logo_4.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import UserContext from '../../contexts/UserContext';
import base64 from 'react-native-base64';

const SignInScreen = () => {
    const [loginError, setLoginError] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { userData, setUserData } = useContext(UserContext);

    const { height } = Dimensions.get('window');
    const navigation = useNavigation();

    const onSignInPressed = async () => {
        try {

            const response = await axios.get('http://localhost:8080/api/users/get-user', {
                params: {
                    email: email,
                    password: password
                }
            });

            // setUserData(response.data);

            var obtained_data = response.data;

            // const obtained_username = response.data.username;
            // const obtained_password = password;

            try{
                console.log('username:', obtained_data.username, password);
                const authHeader = 'Basic ' + base64.encode(obtained_data.username + ':' + password); // did this because we need
                                                                                                 // username (user logs in with email)
                                                                                                 // and RAW password, not encrypted
                                                                                                 // (which we have in response)

                const token_response = await axios.get('http://localhost:8080/api/users/get-token', {
                    headers: {
                        'Authorization': authHeader
                    }
                });

                const updated_user_data = {
                    ...obtained_data,
                    token: token_response.data
                }; 

                setUserData(updated_user_data);

                console.log('Token: ', token_response.data);
                console.log('userData: ', updated_user_data);

                navigation.navigate('Home');
                setLoginError('');
                setEmail('');
                setPassword('');

            } catch (error) {
                console.error('Error fetching token: ', error);
                setLoginError('An error occured. Please try again.');
            }

            
        } catch (error) {
            console.error('Error fetching data: ', error);
            setLoginError('Invalid Email or Password.');
        }
    }

    const onForgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword');

    }

    const onSignUpPressed = () => {
        navigation.navigate('SignUp');

    }

    return (
        <ScrollView contentContainerStyle={styles.root}>

            <Image source={Logo} style={[styles.logo, { height: height * 0.3 }]} resizeMode="contain" />

            <View style={styles.inputContainer}>
                <AntDesign name="user" size={24} color="black" style={styles.icon} />
                <CustomInput placeholder="Email" value={email} setValue={setEmail} autoCapitalize="none"/>
            </View>

            <View style={styles.inputContainer}>
                <AntDesign name="lock" size={24} color="black" style={styles.icon} />
                <CustomInput placeholder="Password" value={password} setValue={setPassword} autoCapitalize="none" secureTextEntry={true} />
            </View>
           
            <CustomButton text="Sign In" onPress={onSignInPressed} />

            {loginError ? <Text style={styles.errorMessage}>{loginError}</Text> : null}


            <View style={styles.forgotPasswordContainer}>
                <CustomButton text="Forgot Password?" onPress={onForgotPasswordPressed} type="TERTIARY" />
            </View>
            
            <CustomButton text="Don't have an account? Create one" onPress={onSignUpPressed} type="TERTIARY" />
            
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    errorMessage: {
        color: 'red', // Choose an appropriate color for error messages
        marginVertical: 10, // Adjust spacing as needed
    },
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: 'lavender',
    },
    logo: {
        
        width: '30%',
        height: 100,
        maxWidth: 300,
        maxHeight: 200,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'gray',
        marginVertical: 10,
    },
    icon: {
        marginRight: 10,
    },
    forgotPasswordContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start', 
        marginVertical: 10,
    },
    signupContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
});

export default SignInScreen;
