import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetCategoriaQuery } from "../redux/shopService";
import AddProducts from "../components/addProducts";
import { agregarConStock } from "../redux/carritoSlice";
import { MaterialIcons } from "@expo/vector-icons";

const ProductList = () => {
  const dispatch = useDispatch();
  const { data: products, error, isLoading, refetch } = useGetCategoriaQuery();

  const [localSearch, setLocalSearch] = useState("")

 const productosFiltrados = (products || []).filter(
  (item) => {
    const nombre = item.nombre?.toLowerCase() || "";
    return nombre.includes((localSearch || "").toLowerCase());
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

      {/* Podés guiarte con una estructura similar a esta dentro de tu JSX */}
<View style={styles.searchContainer}>
  <TextInput
    style={styles.searchInput}
    placeholder="Buscar productos en la lista..."
    value={localSearch}
    onChangeText={setLocalSearch}
  />
</View>

      <View style={styles.listContainer}>
       
      </View>

    <AddProducts datosParaLaLista={productosFiltrados} actualizarLista={refetch} />
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
    textAlign: "center",
    width: "100%",
  },
  redes: {
    flexDirection: "row",
    margin: 10,
    gap: 15,
  },
  // 👇 ESTILO DEL BUSCADOR (Igual al que usaste en Home)
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 15,
    marginBottom: 10,
    
    elevation: 2, // Sombra en Android
 
     shadowColor: "#810baf",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,

    elevation: 5,

  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  listContainer: {    
    width: "100%",
    paddingHorizontal: 15,
  },
  // 👇 ESTILOS PARA LA TARJETA DE CADA PRODUCTO
  card: {
    flexDirection: "row", // Alinea la info y el botón "+" en la misma línea
    justifyContent: "space-between", // Empuja la info a la izquierda y el botón a la derecha
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 6,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  info: {
    flex: 1, // Toma todo el espacio disponible para que el nombre no empuje al botón
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: 14,
    color: "green",
    marginTop: 4,
    fontWeight: "600",
  },
  addButton: {
    backgroundColor: "#527dffff", // Color azul premium para destacar la acción
    padding: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});