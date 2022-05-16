import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 15,
    },
    textinput: {
        color: 'black',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
    },
    modalBg: {
        flex: 1,
        zIndex: -1,
    },
    btnsContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    btn: {
        padding: 7,
        borderRadius: 10,
        elevation: 2,
    },
    text: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    },
    location: {
        marginTop: 20,
        padding: 10,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: 'lightgrey',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E9E9E9',
    },
    locationText: {
        fontSize: 15,
        color: 'grey',
        fontWeight: '400',
    },
    locationContainer: {
        margin: 5,
        marginTop: 10,
    },
});

export default styles;