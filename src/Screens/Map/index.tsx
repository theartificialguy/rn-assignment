import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './styles';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Statusbar from '../../Components/Statusbar';

const Map = () => {
    const records = useSelector(state => state.realm.records);
    const [parsedRecords, setParsedRecords] = useState([]);

    useEffect(() => {
        const _parsedRecords = records.map(item => {
            const address = JSON.parse(item?.address);
            return {
                latitude: address?.latitude,
                longitude: address?.longitude,
                place: address?.display_name,
            };
        });
        setParsedRecords(_parsedRecords);
    }, []);

    return (
        <View style={styles.container}>
            <Statusbar />
            {parsedRecords.length > 0 && (
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                        latitude: parsedRecords[0]?.latitude,
                        longitude: parsedRecords[0]?.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    followsUserLocation={true}
                    showsCompass={true}
                    scrollEnabled={true}
                    zoomEnabled={true}
                    pitchEnabled={true}
                    rotateEnabled={true}>
                    {parsedRecords.map((item, index) => (
                        <Marker
                            key={index}
                            title={item?.place}
                            coordinate={{
                                latitude: item?.latitude,
                                longitude: item?.longitude,
                            }}
                        />
                    ))}
                </MapView>
            )}
        </View>
    );
};

export default Map;
