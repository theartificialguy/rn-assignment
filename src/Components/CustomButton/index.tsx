import { Text, Pressable } from 'react-native';
import React from 'react';
import styles from './styles';

const CustomButton = ({ title, onPress }) => {
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
};

export default CustomButton;
