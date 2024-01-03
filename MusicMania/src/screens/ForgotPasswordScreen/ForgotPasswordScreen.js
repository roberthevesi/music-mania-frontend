import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Alert } from 'react-native';

const ForgotPasswordScreen = () => {
    const [loginError, setLoginError] = useState('');
    const [email, setEmail] = useState('');

    const navigation = useNavigation();

    const onSendPressed = async () => {
        console.log("email:", email);
        try {


            const url = `http://localhost:8080/api/users/send-forgot-password-code?email=${encodeURIComponent(email)}`;

            const response = await axios.post(url);

            // const response = await axios.post('http://localhost:8080/api/users/send-forgot-password-code', {
            //     email: email
            // });

            // const code = response.data.code;

            // console.log(response.data.code);
            navigation.navigate('NewPassword', { email: email });
            setLoginError('');

        } catch (error) {
            console.error('Error sending code: ', error);
            Alert.alert("Error", "Your email may be wrong.");
        }

    }

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    }

    const isButtonDisabled = !email;
   


    return (
        <ScrollView contentContainerStyle={styles.root}>
            <Text style={styles.title}>Reset your password</Text>
            
            <CustomInput placeholder="Email" value={email} setValue={setEmail} autoCapitalize="none" />
           
            <CustomButton 
                text="Get code" 
                onPress={onSendPressed} 
                disabled={isButtonDisabled} // Pass the disabled state
            />

            {loginError ? <Text style={styles.errorMessage}>{loginError}</Text> : null}
           
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

export default ForgotPasswordScreen;
