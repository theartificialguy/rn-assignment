import { View, ActivityIndicator } from 'react-native';
import React from 'react';
import styles from './styles';
import Statusbar from '../Statusbar';

const Loader = () => {
    return (
        <View style={styles.container}>
            <Statusbar />
            <ActivityIndicator size={'large'} color="blue" />
        </View>
    );
};

export default Loader;
