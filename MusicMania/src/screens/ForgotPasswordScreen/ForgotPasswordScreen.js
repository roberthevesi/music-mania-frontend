import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { AntDesign } from '@expo/vector-icons'; // Import AntDesign icons
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
    const [username, setUsername] = useState('');

    const navigation = useNavigation();

    const onSendPressed = () => {
        navigation.navigate('NewPassword');
    }
    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    }

  
   


    return (
        <ScrollView contentContainerStyle={styles.root}>
            <Text style={styles.title}>Reset your password</Text>
            
            <CustomInput placeholder="Username" value={username} setValue={setUsername} />
           

           
            <CustomButton text="Send" onPress={onSendPressed} />
            
           
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
