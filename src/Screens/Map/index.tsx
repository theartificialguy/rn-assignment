import { Text, View, Animated, Dimensions, Platform } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './styles';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import Statusbar from '../../Components/Statusbar';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

const Map = () => {
    const records = useSelector(state => state.realm.records);
    const [parsedRecords, setParsedRecords] = useState([]);
    const _map = useRef(null);
    const _scrollView = useRef(null);

    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);

    useEffect(() => {
        const _parsedRecords = records.map(item => {
            const { name, phone } = item;
            const address = JSON.parse(item?.address);
            return {
                name,
                phone,
                latitude: address?.latitude,
                longitude: address?.longitude,
                place: address?.address?.display_name,
            };
        });
        setParsedRecords(_parsedRecords);
    }, []);

    // snap effect
    useEffect(() => {
        mapAnimation.addListener(({ value }) => {
            // animate 30% away from landing on the next item
            let index = Math.floor(value / CARD_WIDTH + 0.3);
            if (index >= parsedRecords.length) {
                index = parsedRecords.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            const regionTimeout = setTimeout(() => {
                if (mapIndex !== index) {
                    mapIndex = index;
                    const { latitude, longitude } = parsedRecords[index];
                    _map.current.animateToRegion(
                        {
                            latitude,
                            longitude,
                            latitudeDelta: 0.04864195044303443,
                            longitudeDelta: 0.040142817690068,
                        },
                        350,
                    );
                }
            }, 10);

            clearTimeout(regionTimeout);
        });
    });

    // scaling animations
    const interpolations = parsedRecords.map((_, index) => {
        const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            (index + 1) * CARD_WIDTH,
        ];

        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: 'clamp',
        });
        return { scale };
    });

    // press a marker to show its info
    const onMarkerPress = e => {
        const markerId = e._targetInst.return.key;

        let x = markerId * CARD_WIDTH + markerId * 20;
        if (Platform.OS === 'ios') {
            x = x - 20;
        }

        _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
    };

    return parsedRecords.length > 0 ? (
        <View style={styles.container}>
            <MapView
                ref={_map}
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
                {parsedRecords.map((item, index) => {
                    const scaleStyle = {
                        transform: [
                            {
                                scale: interpolations[index].scale,
                            },
                        ],
                    };
                    return (
                        <Marker
                            key={index}
                            onPress={e => onMarkerPress(e)}
                            coordinate={{
                                latitude: item?.latitude,
                                longitude: item?.longitude,
                            }}>
                            <Animated.View style={[styles.markerWrap]}>
                                <Animated.Image
                                    source={require('../../../assets/images/map_marker.png')}
                                    style={[styles.marker, scaleStyle]}
                                    resizeMode="cover"
                                />
                            </Animated.View>
                        </Marker>
                    );
                })}
            </MapView>

            {/* Cards */}
            <Animated.ScrollView
                ref={_scrollView}
                horizontal
                pagingEnabled
                scrollEventThrottle={1}
                snapToAlignment="center"
                snapToInterval={CARD_WIDTH + 20}
                showsHorizontalScrollIndicator={false}
                contentInset={{
                    // for iOS only
                    top: 0,
                    bottom: 0,
                    left: 20,
                    right: 20,
                }}
                contentContainerStyle={{
                    // for android only
                    paddingHorizontal: Platform.OS === 'android' ? 20 : 0,
                }}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: mapAnimation,
                                },
                            },
                        },
                    ],
                    { useNativeDriver: true },
                )}
                style={styles.scrollView}>
                {parsedRecords.map((item, index) => (
                    <View key={index} style={styles.card}>
                        <Text style={styles.cardTitle} numberOfLines={1}>
                            {item?.name}
                        </Text>
                        <Text style={styles.cardDesc} numberOfLines={1}>
                            {item?.phone}
                        </Text>
                        <Text style={styles.cardDesc} numberOfLines={1}>
                            {item?.place}
                        </Text>
                    </View>
                ))}
            </Animated.ScrollView>
        </View>
    ) : (
        <View style={styles.noRecordsContainer}>
            <Statusbar />
            <Text style={styles.noRecordsText}>
                Please add some records first!
            </Text>
        </View>
    );
};

export default Map;
