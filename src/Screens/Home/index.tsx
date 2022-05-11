import { View, Text, Button, StatusBar, Image } from 'react-native';
import React from 'react';
import { auth } from '../../../firebase/firebase-config';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles';
import { signOut } from '../../utils/auth';

const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor="transparent"
            />
            <Text style={styles.title}>Home Page</Text>

            <View style={styles.profileImageContainer}>
                <Image
                    source={{ uri: user.photoURL }}
                    resizeMode="contain"
                    style={{ height: 200, width: 200, borderRadius: 150 }}
                />
            </View>

            <Text style={styles.text}>{user.email}</Text>
            <Text style={styles.text}>{user.phone}</Text>

            <Button title="Logout" onPress={signOut(dispatch, auth)} />
        </View>
    );
};

export default Home;
