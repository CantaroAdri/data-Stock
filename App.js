import "react-native-gesture-handler";

import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// 1. Importamos DefaultTheme
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import ScreenStart from "./pages/screenStart";

import { Provider } from "react-redux";
import store from "./redux/store";
import { SQLiteProvider } from "expo-sqlite";

export const initializeDB = async (db) => {
  try {
    await db.execAsync(`CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY not null,
      email TEXT NOT NULL,
      password TEXT NOT NULL);`);
  } catch (error) {}
};

// 2. Creamos el Tema Oscuro (Esto cambia el fondo por defecto de React Navigation)
const TemaOscuroBarberia = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#121212", // Gris oscuro/negro premium
    card: "#1a1a1a",       
    text: "#ffffff",       
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <SQLiteProvider databaseName="data_stock.db" onInit={initializeDB}>
        <Provider store={store}>
          {/* 3. Le pasamos el tema al contenedor de navegación */}
          <NavigationContainer theme={TemaOscuroBarberia}>
            <SafeAreaView style={styles.safeArea}>
              <ScreenStart />
            </SafeAreaView>
          </NavigationContainer>
        </Provider>
      </SQLiteProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#121212", // 4. Ponemos un color sólido real en lugar de transparente
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212", // 4. Ponemos un color sólido real en lugar de transparente
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
    color: "#fff", // 5. Acordate de darle color blanco a las letras para que se vean
  },
  menuContainer: {
    flexDirection: "row", 
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
    gap: 10, 
  },
  button: {
    width: 120,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#2a2a2a", // Cambié el gris claro viejo por uno más oscuro para el modo noche
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