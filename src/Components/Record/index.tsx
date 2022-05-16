import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';
import { deleteRecord } from '../../utils/functions';

const Record = ({ data, records, setRecords }) => {
    const { address } = JSON.parse(data.coords)
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{data.name}</Text>
                <Text style={styles.desc}>{data.phone}</Text>
                <Text style={styles.desc}>{address?.display_name}</Text>
            </View>
            <TouchableOpacity
                activeOpacity={0.4}
                onPress={async () =>
                    await deleteRecord(data.id, records, setRecords)
                }>
                <MCI name="delete" size={24} color="red" />
            </TouchableOpacity>
        </View>
    );
};

export default Record;
