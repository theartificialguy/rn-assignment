import { View, Text } from 'react-native';
import React from 'react';

import styles from './styles';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Statusbar from '../../Components/Statusbar';

const Map = ({ route }) => {
    const { records } = route.params;
    
    // const decodeRecords = () => {
        const parsedRecords = records.map(item => console.log(item));
    // }

    return (
        <View style={styles.container}>
            <Statusbar />
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: 22,
                    longitude: 77,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }}
                region={{
                    latitude: 22,
                    longitude: 77,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }}
                showsUserLocation={true}
                showsMyLocationButton={true}
                followsUserLocation={true}
                showsCompass={true}
                scrollEnabled={true}
                zoomEnabled={true}
                pitchEnabled={true}
                rotateEnabled={true}>
                {/* <Marker
                    title={decodedAddress?.display_name}
                    coordinate={position}
                /> */}
            </MapView>
        </View>
    );
};

export default Map;
