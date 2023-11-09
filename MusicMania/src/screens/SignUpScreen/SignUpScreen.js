import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { AntDesign } from '@expo/vector-icons'; // Import AntDesign icons
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const navigation = useNavigation();

    const onRegisterPressed = () => {
        navigation.navigate('ConfirmEmail');
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


    return (
        <ScrollView contentContainerStyle={styles.root}>
            <Text style={styles.title}>Create an account</Text>
            
            <CustomInput placeholder="Username" value={username} setValue={setUsername} />
            <CustomInput placeholder="Email" value={username} setValue={setEmail} />

            <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true} />
            <CustomInput placeholder="Repeat Password" value={passwordRepeat} setValue={setPasswordRepeat} />

           
            <CustomButton text="Register" onPress={onRegisterPressed} />
            <Text style={styles.text}>
                By registering, you confirm that you accept out <Text style={styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text> and <Text style={styles.link} onPress={onPrivacyPolicyPressed}>Privacy Policy</Text>.
            </Text>
            
            <CustomButton text="Have an account? Sign in" onPress={onSignInPressed} type="TERTIARY" />
            
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
