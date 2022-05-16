import { Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Ionicon from 'react-native-vector-icons/Ionicons';

import Statusbar from '../Statusbar';
import styles from './styles';
import { getAddressFromCoordinates } from '../../utils/functions';

const Map = ({ route, navigation }) => {
    const { setCoords } = route.params;
    const [decodedAddress, setDecodedAddress] = useState('');
    const [position, setPosition] = useState({
        latitude: 10,
        longitude: 10,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    });

    const setAddress = async () => {
        const address = await getAddressFromCoordinates(position.latitude, position.longitude);
        setDecodedAddress(address);
    }

    useEffect(() => {
        try {
            Geolocation.getCurrentPosition(pos => {
                const crd = pos.coords;
                setPosition({
                    latitude: crd.latitude,
                    longitude: crd.longitude,
                    latitudeDelta: 0.0421,
                    longitudeDelta: 0.0421,
                });
            });
            // decode coordinates
            setAddress();
        } catch (error) {
            console.log('error while getting current location');
        }
    }, []);

    const setCoordinates = () => {
        setCoords({
            latitude: position.latitude,
            longitude: position.longitude,
            address: decodedAddress,
        });
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Statusbar />
            <View style={styles.searchContainer}>
                <GooglePlacesAutocomplete
                    renderLeftButton={() => (
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.backBtnContainer}
                            onPress={() => navigation.goBack()}>
                            <Ionicon
                                name="chevron-back"
                                color="grey"
                                size={30}
                            />
                        </TouchableOpacity>
                    )}
                    debounce={600}
                    placeholder="Search"
                    styles={{ textInput: { color: 'black' } }}
                    onPress={(data, details = null) => {
                        console.log(data, details);
                    }}
                    query={{
                        key: 'AIzaSyDQwy4Qt7SQpE0zugAyqpJQIv-DUK-SxSQ',
                        language: 'en',
                    }}
                />
            </View>

            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={position}
                region={position}
                showsUserLocation={true}
                showsMyLocationButton={true}
                followsUserLocation={true}
                showsCompass={true}
                scrollEnabled={true}
                zoomEnabled={true}
                pitchEnabled={true}
                rotateEnabled={true}>
                <Marker
                    title={decodedAddress?.display_name}
                    coordinate={position}
                />
            </MapView>

            <TouchableOpacity
                activeOpacity={0.7}
                onPress={setCoordinates}
                style={styles.setLocationBtnContainer}>
                <Text style={{ color: 'white' }}>Set Location</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Map;
