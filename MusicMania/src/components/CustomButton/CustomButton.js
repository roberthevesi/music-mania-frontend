import React from 'react'
import { View, Text, StyleSheet, Pressable,} from 'react-native'

const CustomButton = ({onPress, text, type = "PRIMARY", disabled = false }) => {
    return(
        <Pressable 
            onPress={disabled ? null : onPress} 
            style={[
                styles.container, 
                styles[`container_${type}`],
                disabled && styles.container_DISABLED
            ]}
            disabled={disabled}
        >
            <Text style={[
                styles.text, 
                styles[`text_${type}`],
                disabled && styles.text_DISABLED
            ]}>
                {text}
            </Text>
        </Pressable>
    )
}

const styles =  StyleSheet.create({
    container_DISABLED: {
        backgroundColor: 'grey', // Disabled state style
        // Other styles for disabled state
    },

    text_DISABLED: {
        color: '#ccc', // Disabled text color
    },

    container: {
        backgroundColor: '#3b71f3',

        width: '85%',

        padding: 15,
        marginVertical: 10,
        
      

        alignItems: 'center',
        borderRadius: 10,
    },

    container_PRIMARY: {
        backgroundColor: '#3b71f3',
    },

    container_TERTIARY:{
        backgroundColor: 'transparent',
        
    },
    container_SECONDARY:{
        backgroundColor: 'transparent',
        borderColor: '#3b71f3',
        borderWidth: 3,
        
    },

    text: {
        fontWeight: 'bold',
        color: 'white',
    },

    text_TERTIARY: {
        color: 'gray',
        textDecorationLine: 'underline',
    },
    text_SECONDARY: {
        color: '#3b71f3',
        
    },

});

export default CustomButton