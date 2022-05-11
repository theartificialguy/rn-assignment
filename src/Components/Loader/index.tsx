import { View, ActivityIndicator, StatusBar } from 'react-native';
import React from 'react';
import styles from './styles';

const Loader = () => {
    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor="transparent"
            />
            <ActivityIndicator size={'large'} color="blue" />
        </View>
    );
};

export default Loader;
