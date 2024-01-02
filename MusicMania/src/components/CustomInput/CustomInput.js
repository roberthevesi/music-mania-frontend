import React from 'react'
import {View, Text, TextInput, StyleSheet } from 'react-native'

const CustomInput = ({value, setValue, placeholder, secureTextEntry, autoCapitalize}) => {
    return (
        <View style={styles.container}>
            <TextInput
             value={value}
             onChangeText={setValue}
             placeholder={placeholder} 
             style={styles.input}
             secureTextEntry= {secureTextEntry}
             autoCapitalize={autoCapitalize}
             />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '85%',

        borderColor: 'e8e8e8',
        borderWidth:1,
        borderRadius: 5,

        paddingHorizontal:10,
        marginVertical:10,


    },
    input: {
        fontSize:20,
        padding: 16,
        width: '90%',
        
    },

});

export default CustomInput