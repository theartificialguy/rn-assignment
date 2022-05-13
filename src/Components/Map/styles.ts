import { StyleSheet } from "react-native";
import { theme } from "../../utils/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
      searchContainer: {
        position: 'absolute',
        top: 10,
        left: 0,
        right: 0,
        zIndex: 1,
        marginHorizontal: 10,
      },
      setLocationBtnContainer: {
        position: 'absolute',
        bottom: 10,
        left: 20,
        right: 20,
        zIndex: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'lightgreen',
        justifyContent: 'center',
        alignItems: 'center',
      },
});

export default styles;