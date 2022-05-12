import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';
import { deleteRecord } from '../../utils/functions';

const Record = ({ data, records, setRecords }) => {

    const navigator = useNavigation();

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.4}
            onPress={() => navigator.navigate('Map')}>
            <View>
                <Text style={styles.title}>{data.name}</Text>
                <Text style={styles.desc}>{data.phone}</Text>
            </View>
            <TouchableOpacity
                activeOpacity={0.4}
                onPress={async () =>
                    await deleteRecord(data.ID, records, setRecords)
                }>
                <MCI name="delete" size={24} color="red" />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

export default Record;
