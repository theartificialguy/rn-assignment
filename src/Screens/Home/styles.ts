import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 1,
    },
    profileImageContainer: {
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContainer: {
      marginLeft: 10,  
    },
    btnsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    addressBtn: {
        padding: 7,
        borderRadius: 10,
        marginVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgrey',
    },
    addressText: {
        fontSize: 15,
        fontWeight: '500',
        color: 'grey',
    },
    addContainer: {
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgreen',
    },
    add: {
        color: 'white',
        fontSize: 26,
    },
    logoutText: {
        fontSize: 15,
        fontWeight: '500',
        color: 'red',
    },
})

export default styles