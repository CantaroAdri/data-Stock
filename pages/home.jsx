import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
// import { useGetCategoriaQuery } from "../redux/shopService";
import Contador from "../components/contador";
import { useProductos } from "../redux/useProductos";

const Home = ({ navigation }) => {
  // const { data: categorias, error, isLoading } = useGetCategoriaQuery();

  if (isLoading) return <Text>Cargando productos...</Text>;
  if (error) return <Text>Error al cargar productos</Text>;

  const { productos, isLoading, error } = useProductos();

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
            <Text style={styles.productTitle}>{item.nombre}</Text>
            <Text>Precio: ${item.precio}</Text>
            <Text>Cantidad: {item.cantidad}</Text>
            <Contador id={item.id} />
          </View>
        )}
        numColumns={2}
        style={styles.list} //
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: "47%",
    padding: 10,
    backgroundColor: "#fff",
    margin: 5,
    borderRadius: 8,
    elevation: 3,
    width: "47%",
  },

  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  list: {
    width: "100%",
  },

  listContent: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
