import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 15,
    },
    textinput: {
        borderBottomWidth: 2,
        borderBottomColor: 'blue',
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
});

export default styles;