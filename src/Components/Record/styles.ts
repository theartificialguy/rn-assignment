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
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 5,
    },
    desc: {
        fontSize: 16,
        fontWeight: '400',
        marginBottom: 5,
    },
});

export default styles;