import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { useGetProductsQuery } from "../redux/shopService";
import AddProducts from "../components/addProducts";
import { agregarConStock } from "../redux/carritoSlice";
import { MaterialIcons } from "@expo/vector-icons";

const ProductList = ({ search = "" }) => {
  const dispatch = useDispatch();
  const { data: products, error, isLoading } = useGetProductsQuery();

  const productosFiltrados = (products ? Object.values(products) : []).filter(
    (item) => {
      const nombre = item.nombre?.toLowerCase() || "";
      return nombre.includes((search || "").toLowerCase());
    }
  );

  if (isLoading) return <Text>Cargando productos...</Text>;
  if (error) return <Text>Ocurrió un error: {JSON.stringify(error)}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Productos</Text>

      <View style={styles.redes}>
        <Image source={require("../assets/Img/icons-facebook.png")} />
        <Image source={require("../assets/Img/icons-instagram.png")} />
        <Image source={require("../assets/Img/icons-whatsapp.png")} />
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={productosFiltrados}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.info}>
                <Text style={styles.name}>{item.nombre}</Text>
                <Text style={styles.price}>${item.precio}</Text>
              </View>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => dispatch(agregarConStock(item))}
              >
                <MaterialIcons name="add" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <AddProducts />
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    paddingTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    flexWrap: "wrap",
    width: "100%",
  },
  redes: {
    flexDirection: "row",
    margin: 10,
    gap: 15,
  },
  listContainer: {    
    width: "100%",
    paddingHorizontal: 15,
  },
  menu: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    marginTop: 20,
    borderColor: "#000000",
    borderRadius: 15,
    elevation: 10,
    borderBottomWidth: 2,
    backgroundColor: "#E8E8E8",
  },

  addButtonContainer: {
    marginTop: 0,
  },
});
