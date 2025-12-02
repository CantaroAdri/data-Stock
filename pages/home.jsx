import {
  View,
  Text,

  StyleSheet,
  FlatList,
  Image,
} from "react-native";

import Contador from "../components/contador";
import { useProductos } from "../redux/useProductos";

const Home = ({ navigation }) => {
  const { productos, isLoading, error } = useProductos();

  if (isLoading)
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando productos...</Text>
      </View>
    );
  if (error)
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>
          Error al cargar productos: {error.message || "Error desconocido"}
        </Text>
      </View>
    );
  if (productos.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>No hay productos disponibles.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home!</Text>

      <View style={styles.redes}>
        <Image source={require("../assets/Img/icons-facebook.png")} />
        <Image source={require("../assets/Img/icons-instagram.png")} />
        <Image source={require("../assets/Img/icons-whatsapp.png")} />
      </View>
      <Text style={styles.textoSecundario}>Productos disponibles:</Text>

      {/*  LISTA DE PRODUCTOS (desde Firebase) */}
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={[styles.productTitle, { color: "black" }]}>
              {item.nombre}
            </Text>
            <Text style={{ color: "black" }}>Precio: ${item.precio}</Text>
            <Text style={{ color: "black" }}>Cantidad: {item.cantidad || 0}</Text>
            <Contador item={item} />
          </View>
        )}
        numColumns={2}
        style={styles.list} 
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    width: "100%",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    flexWrap: "wrap",
    width: "100%",
  },
  redes: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
    gap: 15,
  },

  addButtonContainer: {
    marginTop: 0,
  },

  card: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
    margin: 5,
    borderRadius: 8,
    elevation: 3,

    borderWidth: 1, 
    borderColor: "red",
  },

  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  list: {
    width: "100%",
  },

  listContent: {
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 5,
    alignItems: "stretch",
    justifyContent: "space-between",
  },
});
