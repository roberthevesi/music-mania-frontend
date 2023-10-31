import React from 'react'
import { View, Text, StyleSheet, Pressable,} from 'react-native'

const CustomButton = ({onPress, text, type = "PRIMARY" }) => {
    return(
        <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
            <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
        </Pressable>
    )
}

const styles =  StyleSheet.create({
    container: {
        backgroundColor: '#3b71f3',

        width: '80%',

        padding: 15,
        marginVertical: 40,

        alignItems: 'center',
        borderRadius: 10,
    },

    container_PRIMARY: {
        backgroundColor: '#3b71f3',
    },

    container_TERTIARY:{
        backgroundColor: 'transparent',
        
    },

    text: {
        fontWeight: 'bold',
        color: 'white',
    },

    text_TERTIARY: {
        color: 'gray',
        textDecorationLine: 'underline',
    },

});

export default CustomButton