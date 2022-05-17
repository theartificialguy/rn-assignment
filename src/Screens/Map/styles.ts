import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
        height: '100%',
    },
    image: {
        width: 120,
        height: 80,
    },
    scrollView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    card: {
      padding: 10,
      elevation: 2,
      backgroundColor: '#FFF',
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      marginHorizontal: 10,
      shadowColor: '#000',
      shadowRadius: 5,
      shadowOpacity: 0.3,
      shadowOffset: { x: 2, y: -2 },
      height: 100,
      width: CARD_WIDTH,
      overflow: 'hidden',
    },
    cardImage: {
      flex: 3,
      width: '100%',
      height: '100%',
      alignSelf: 'center',
    },
    cardTitle: {
      color: 'black',
      fontSize: 18,
      fontWeight: 'bold',
    },
    cardDesc: {
      fontSize: 16,
      color: '#444',
      marginVertical: 2,
    },
    markerWrap: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
    },
    marker: {
      width: 30,
      height: 30,
    },
    noRecordsContainer: {
      flex: 1,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    noRecordsText: {
      color: 'grey',
      fontSize: 18,
      fontWeight: '600',
    },
});

export default styles;
