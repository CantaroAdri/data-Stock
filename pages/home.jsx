import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { useGetCategoriaQuery } from "../service/shopService"; // 👈 IMPORTANTE
import TabNavigator from "../Navigation/TabNavigator";
import Contador from "../components/contador";

const Home = ({ navigation }) => {
  const { data: categorias, error, isLoading } = useGetCategoriaQuery();

  if (isLoading) return <Text>Cargando productos...</Text>;
  if (error) return <Text>Error al cargar productos</Text>;

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Home!</Text>

        <View style={styles.redes}>
          <Image source={require("../assets/Img/icons-facebook.png")} />
          <Image source={require("../assets/Img/icons-instagram.png")} />
          <Image source={require("../assets/Img/icons-whatsapp.png")} />
        
        </View>
      </View>

      {/* BOTONES DEL MENU */}
      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ProductList")}
        >
          <Text style={styles.buttonText}>Productos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Ventas")}
        >
          <Text style={styles.buttonText}>Ventas</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.textoSecundario}>Productos disponibles:</Text>

      {/*  LISTA DE PRODUCTOS (desde Firebase) */}
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.Image }} style={styles.productImg} />
            <Text style={styles.productTitle}>{item.title}</Text>
            <Contador id={item.id} />

          </View>
        )}
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
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    justifyContent: "space-between", // 👈 mantiene todo arriba
    alignItems: "center", // 👈 muy poco espacio debajo del título
    textAlign: "center",
    flexWrap: "wrap",
    width: "100%",
  },
  redes: {
    flexDirection: "row",
    margin: 10,
    gap: 15,
  },
  menu: {
    flexDirection: "row", // para poner botones lado a lado
    justifyContent: "center",
    alignItems: "center",
    gap: 10, // espacio horizontal entre botones (RN 0.71+)
    paddingVertical: 10,
    marginTop: 150,
    borderColor: "#000000",
    borderRadius: 15,
    elevation: 10,
    borderBottomWidth: 2,
    backgroundColor: "#E8E8E8",
  },

  addButtonContainer: {
    marginTop: 0, // 👈 elimina separación entre texto y botón
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    margin: 5,
    borderRadius: 8,
    elevation: 3,
  },
  productImg: {
    width: 50,
    height: 100,
    marginRight: 15,
    borderRadius: 5,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
