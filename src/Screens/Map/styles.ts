import { StyleSheet } from "react-native";
import { theme } from "../../utils/theme";

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: theme.background,
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
})

export default styles;