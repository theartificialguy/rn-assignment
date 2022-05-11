import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
    },
    title: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
    authText: {
        textDecorationLine: 'underline',
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    progressContainer: {
        height: 20, 
        marginTop: 10, 
        backgroundColor: 'green', 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    profileImageContainer: {
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles;