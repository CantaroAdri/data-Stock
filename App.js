import "react-native-gesture-handler";

import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import ScreenStart from "./pages/screenStart";

import { Provider } from "react-redux";
import store from "./redux/store";


export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <SafeAreaView style={styles.safeArea}>
            <ScreenStart/>          
          </SafeAreaView>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    width: "100%",
    paddingHorizontal: 12,
    flexWrap: "wrap",
  },
  menuContainer: {
    flexDirection: "row", // 👈 los botones uno al lado del otro
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
    gap: 10, // 👈 espacio entre botones (React Native 0.71+)
  },
  button: {
    width: 120,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#dadadaff",
  },
  activeButton: {
    backgroundColor: "#527dffff",
  },
  buttonText: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "70%",
  },
});
