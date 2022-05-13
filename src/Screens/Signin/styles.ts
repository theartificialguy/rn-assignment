import { StyleSheet } from 'react-native'
import { theme } from '../../utils/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
        backgroundColor: theme.background,
    },
    title: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    authText: {
        color: 'black',
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