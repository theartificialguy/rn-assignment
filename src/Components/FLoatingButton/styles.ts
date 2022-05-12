import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 50,
        right: 20,
        height: 50,
        width: 50,
        elevation: 5,
        zIndex: 1,
        backgroundColor: 'lightgreen',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    add: {
        color: 'white',
        fontSize: 26,
    },
});

export default styles;
