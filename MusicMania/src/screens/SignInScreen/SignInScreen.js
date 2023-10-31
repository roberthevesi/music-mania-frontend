import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Logo from '../../../assets/images/Logo_4.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { AntDesign } from '@expo/vector-icons'; // Import AntDesign icons

const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { height } = Dimensions.get('window');

    const onSignInPressed = () => {
        console.warn("Sign in");
    }

    const onForgotPasswordPressed = () => {
        console.warn("ForgotPass");
    }

    const onSignUpPressed = () => {
        console.warn("Sign Up");
    }

    return (
        <ScrollView contentContainerStyle={styles.root}>
            <Image source={Logo} style={[styles.logo, { height: height * 0.3 }]} resizeMode="contain" />
            <View style={styles.inputContainer}>
                <AntDesign name="user" size={24} color="black" style={styles.icon} />
                <CustomInput placeholder="Username" value={username} setValue={setUsername} />
            </View>
            <View style={styles.inputContainer}>
                <AntDesign name="lock" size={24} color="black" style={styles.icon} />
                <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true} />
            </View>
            <View style={styles.forgotPasswordContainer}>
                <CustomButton text="Forgot Password?" onPress={onForgotPasswordPressed} type="TERTIARY" />
            </View>
            <CustomButton text="Sign In" onPress={onSignInPressed} />
            
            <CustomButton text="Don't have an account? Create one" onPress={onSignUpPressed} type="TERTIARY" />
            
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
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
        justifyContent: 'flex-start', // Align to the left
        marginVertical: -50,
    },
    signupContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
});

export default SignInScreen;
