import { StyleSheet } from "react-native"; 

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
        elevation: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    title: {
        color: 'black',
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 5,
    },
    desc: {
        color: 'grey',
        fontSize: 16,
        fontWeight: '400',
        marginBottom: 5,
    },
});

export default styles;