import {
    Modal,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    View,
    Keyboard,
    TouchableOpacity,
    Text,
} from 'react-native';
import React, { useState } from 'react';
import styles from './styles';

const InputModal = ({ visible, onClose, onSubmit }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleModalClose = () => {
        Keyboard.dismiss();
    };

    const handleSubmit = async () => {
        if (!name.trim() && !phone.trim()) return onClose();
        onSubmit(name, phone);
        setName('');
        setPhone('');
        onClose();
    };

    const handleCancel = () => {
        setName('');
        setPhone('');
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.container}>
                <TextInput
                    style={styles.textinput}
                    placeholder="Enter Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.textinput}
                    placeholder="Enter Phone Number"
                    value={phone}
                    onChangeText={setPhone}
                />
                <TextInput style={styles.textinput} placeholder="Add Address" />

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
        </Modal>
    );
};

export default InputModal;
