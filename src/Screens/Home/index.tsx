import {
    View,
    Text,
    StatusBar,
    Image,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { auth } from '../../../firebase/firebase-config';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles';
import FloatingButton from '../../Components/FLoatingButton';
import { signOut } from '../../utils/auth';
import InputModal from '../../Components/InputModal';
import { RecordItem } from '../../models';
import Record from '../../Components/Record';
import { createTable, getDBConnection, getRecords } from '../../../db-service';
import { addRecord } from '../../utils/functions';

const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const [modalVisible, setModalVisible] = useState(false);

    const [records, setRecords] = useState<RecordItem[]>([]);

    const loadRecords = useCallback(async () => {
        try {
            const db = await getDBConnection();
            await createTable(db);

            const storedRecords = await getRecords(db);
            if (storedRecords.length) {
                setRecords(storedRecords);
            }
        } catch (error) {
            console.log('error while loading records: ', error);
        }
    }, []);

    useEffect(() => {
        loadRecords();
    }, [loadRecords]);

    const handleSubmit = async (name: string, phone: string) => {
        const _record = { name, phone };
        await addRecord(_record, records, setRecords);
    };

    const renderItem = ({ item }) => (
        <Record
            key={item.id}
            data={item}
            records={records}
            setRecords={setRecords}
        />
    );

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor="transparent"
            />
            {/* header */}
            <View style={styles.headerContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.profileImageContainer}>
                        <Image
                            source={{ uri: user.photoURL }}
                            resizeMode="contain"
                            style={{
                                height: 80,
                                width: 80,
                                borderRadius: 40,
                            }}
                        />
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.text}>{user.email}</Text>
                        <Text style={styles.text}>{user.phone}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={signOut(dispatch, auth)}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>

            {/* body */}
            <View style={styles.btnsContainer}>
                <TouchableOpacity activeOpacity={0.6} style={styles.addressBtn}>
                    <Text style={styles.addressText}>show all addresses</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.6}
                    style={styles.addContainer}
                    onPress={() => setModalVisible(true)}>
                    <Text style={styles.add}>+</Text>
                </TouchableOpacity>
            </View>

            {/* <FloatingButton setModalVisible={setModalVisible} /> */}

            <InputModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleSubmit}
            />

            {/* Records */}
            <FlatList
                data={records}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${item.id}${index}`}
            />
        </View>
    );
};

export default Home;
