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

const ConfirmEmailScreen = ({ route }) => {
    const [code, setCode] = useState('');

    const navigation = useNavigation();

    const email = route.params.email;
    const username = route.params.username;
    const password = route.params.password;

    const onConfirmPressed = async () => {
        // navigation.navigate('Home');
        // console.log(email);
        // console.log(username);
        // console.log(password);

        try {
            const response =  await axios.put(`http://localhost:8080/api/users/verify-new-user-code?email=${encodeURIComponent(email)}&verification_code=${encodeURIComponent(code)}`);

            console.log("code response: ", response.data);

            if(response.data){ // code is OK
                const register_response = await axios.post('http://localhost:8080/api/users/register', {
                    username: username,
                    email: email,
                    password: password
                });

                Alert.alert(
                    "Success", // Title of the alert
                    "Your account has been created successfully", // Message
                    [
                        { 
                            text: "OK", 
                            onPress: () => navigation.navigate('SignIn') // Navigate on pressing OK
                        }
                    ],
                    { cancelable: false } // This prevents dismissing the alert by tapping outside of it
                );                
            }
            else{ // code is not OK
                Alert.alert(
                    "Failure", // Title of the alert
                    "Incorrect/Used Confirmation Code", // Message
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
            console.error('Error confirming email: ', error);
            Alert.alert(
                "Failure", // Title of the alert
                "Something went wrong. Please try again.", // Message
                [
                    { 
                        text: "OK", 
                        onPress: () => navigation.navigate('SignIn') // Navigate on pressing OK
                    }
                ],
                { cancelable: false } // This prevents dismissing the alert by tapping outside of it
            );
        }
    }

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    }

    // const onResendPressed = () => {
    //     console.warn("Resend");
    // }

   
    const isButtonDisabled = !code;


    return (
        <ScrollView contentContainerStyle={styles.root}>
            <Text style={styles.title}>Confirm your email</Text>
            
            <CustomInput placeholder="Enter your confirmation code" value={code} setValue={setCode} uppercase={true} maxLength={6}/>
           
            <CustomButton 
                text="Confirm" 
                onPress={onConfirmPressed} 
                disabled={isButtonDisabled} // Pass the disabled state
            />
            {/* <CustomButton text="Resend Code" onPress={onResendPressed} type="SECONDARY" /> */}
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

export default ConfirmEmailScreen;
