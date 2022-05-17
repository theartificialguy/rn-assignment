import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import { deleteRecord } from '../../utils/realm-functions';
import styles from './styles';

const Record = ({ data }) => {
    const { address } = JSON.parse(data.address);
    return (
        <View style={styles.container}>
            <View style={{ flex: 0.9 }}>
                <Text style={styles.title}>{data?.name}</Text>
                <Text style={styles.desc}>{data?.phone}</Text>
                <Text style={styles.desc}>{address?.display_name}</Text>
            </View>
            <TouchableOpacity
                activeOpacity={0.4}
                onPress={() => deleteRecord(data)}>
                <MCI name="delete" size={24} color="red" />
            </TouchableOpacity>
        </View>
    );
};

export default Record;
