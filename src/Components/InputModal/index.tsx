import {
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    View,
    Keyboard,
    TouchableOpacity,
    Text,
    Alert,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { theme } from '../../utils/theme';
import Statusbar from '../Statusbar';
import styles from './styles';

const InputModalScreen = ({ route }) => {
    const navigation = useNavigation();
    const { onSubmit } = route.params;

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [coords, setCoords] = useState(null);

    const handleModalClose = () => {
        Keyboard.dismiss();
    };

    const handleSubmit = async () => {
        if (name.trim() === '' || phone.trim() === '' || !coords) {
            Alert.alert('Please enter all details.')
            return;
        }
        onSubmit(name, phone, JSON.stringify(coords));
        handleCancel();
    };

    const handleCancel = () => {
        setName('');
        setPhone('');
        setCoords(null);
        navigation.goBack();
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            <Statusbar />
            <View style={styles.container}>
                <TextInput
                    style={styles.textinput}
                    placeholder="Enter Name"
                    value={name}
                    placeholderTextColor='grey'
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.textinput}
                    placeholder="Enter Phone Number"
                    value={phone}
                    placeholderTextColor='grey'
                    onChangeText={setPhone}
                />
                {
                    coords && (
                        <View style={styles.locationContainer}>
                            <Text style={styles.locationText}>Location added</Text>
                            <Text style={{ color: 'black' }}>{coords?.address?.display_name}</Text>
                        </View>
                    )
                }
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.location}
                    onPress={() => navigation.navigate('Map', { setCoords })}>
                    <Text style={styles.locationText}>
                        Choose your Location
                    </Text>
                </TouchableOpacity>

                <View style={styles.btnsContainer}>
                    <TouchableOpacity
                        style={[styles.btn, { backgroundColor: 'lightgreen' }]}
                        activeOpacity={0.7}
                        onPress={handleSubmit}>
                        <Text style={styles.text}>Submit</Text>
                    </TouchableOpacity>

                    {name.trim() || phone.trim() ? (
                        <TouchableOpacity
                            style={[styles.btn, { backgroundColor: 'red' }]}
                            activeOpacity={0.7}
                            onPress={handleCancel}>
                            <Text style={styles.text}>Cancel</Text>
                        </TouchableOpacity>
                    ) : null}
                </View>
            </View>
            <TouchableWithoutFeedback onPress={handleModalClose}>
                <View style={[styles.modalBg, StyleSheet.absoluteFillObject]} />
            </TouchableWithoutFeedback>
        </View>
    );
};

export default InputModalScreen;
