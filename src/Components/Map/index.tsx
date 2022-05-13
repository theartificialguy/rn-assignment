import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// import { getAddressFromCoordinates } from '../../utils/functions'
import Statusbar from '../Statusbar';
import styles from './styles';

const Map = ({ route, navigation }) => {
    const { setCoords } = route.params;
    const [position, setPosition] = useState({
        latitude: 10,
        longitude: 10,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    });

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
            // getAddressFromCoordinates(position.latitude, position.longitude);
        } catch (error) {
            console.log('error while getting current location');
        }
    }, []);

    const setCoordinates = () => {
      setCoords({
        latitude: position.latitude,
        longitude: position.longitude,
      });
      navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Statusbar />
            <View style={styles.searchContainer}>
                <GooglePlacesAutocomplete
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
                    title={`You are here lat: ${Math.round(
                        position.latitude,
                    )}, long: ${Math.round(position.longitude)} `}
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
