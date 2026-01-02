import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { quitarDelCarrito, vaciarCarrito } from "../redux/carritoSlice";
import { database } from "../firebase"; 
import { ref, get, update, push } from "firebase/database";


const Ventas = ({ navigation }) => {
  const dispatch = useDispatch();

  const cartItemsObject = useSelector((state) => state.carritoReducer.items);
  const cartItems = Object.values(cartItemsObject);

  //  CALCULAR EL TOTAL DE LA COMPRA
  const totalCompra = cartItems.reduce((sum, item) => {
    return sum + item.precio * item.cantidad;
  }, 0);

  //  HANDLER PARA QUITAR UN PRODUCTO
  const handleQuitarItem = (id) => {
    dispatch(quitarDelCarrito(id));
  };

  //  HANDLER PARA FINALIZAR COMPRA
  const handleFinalizarCompra = () => {
    if (cartItems.length === 0) {
      Alert.alert(
        "Carrito Vacío",
        "No hay productos para finalizar la compra."
      );
      return;
    }

    Alert.alert(
    "Confirmar Venta",
    `Total: $${totalCompra.toFixed(2)}`,
    [
      { text: "Cancelar" },
      {
        text: "Confirmar",
        onPress: async () => {
          try {
            const hoy = new Date().toISOString().split('T')[0]; // Ejemplo: "2026-01-01"
            const facturaRef = ref(database, `facturacion/${hoy}`);

            // 1. Obtenemos el total acumulado actual de ese día
            const snapshot = await get(facturaRef);
            const dataActual = snapshot.val() || { totalDelDia: 0, ventas: {} };

            // 2. Actualizamos sumando el nuevo total
            const nuevoTotal = dataActual.totalDelDia + totalCompra;

            await update(facturaRef, {
              totalDelDia: nuevoTotal,
              ultimaActualizacion: new Date().toLocaleTimeString()
            });

            // 3. Opcional: Guardar el detalle de esta venta individual dentro del día
            await push(ref(database, `facturacion/${hoy}/operaciones`), {
              monto: totalCompra,
              hora: new Date().toLocaleTimeString(),
              items: cartItems
            });

            dispatch(vaciarCarrito());
            Alert.alert("Éxito", "Venta registrada en facturación.");
          } catch (error) {
            console.error(error);
            Alert.alert("Error", "No se pudo guardar la factura.");
          }
        },
      },
    ]
  );
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Ventas (Carrito)</Text>
      {/* DETALLE DEL TOTAL */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>TOTAL:</Text>
        <Text style={styles.totalAmount}>${totalCompra.toFixed(2)}</Text>
      </View>
      {/*  LISTA DE PRODUCTOS EN EL CARRITO */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.productTitle}>{item.nombre}</Text>
            <Text>Unitario: ${item.precio}</Text>
            <Text style={styles.quantityText}>Cantidad: {item.cantidad}</Text>
            <Text style={styles.subtotalText}>
               ${(item.precio * item.cantidad).toFixed(2)}
            </Text>

            {/* BOTÓN QUITAR */}
            <TouchableOpacity
              onPress={() => handleQuitarItem(item.id)}
              style={styles.removeButton}
            >
              <Text style={styles.removeButtonText}>Quitar</Text>
            </TouchableOpacity>
          </View>
        )}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
       {/* BOTÓN FINALIZAR COMPRA  */}
      <TouchableOpacity
        onPress={handleFinalizarCompra}
        style={styles.finalizarButton}
      >
        <Text style={styles.finalizarButtonText}>Finalizar Compra</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Ventas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    width: "100%",
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
  card: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
    width: "100%",
  },
  productTitle: {
    flex: 2,
    fontSize: 16,
    fontWeight: "bold",
    flexShrink: 1, 
  },
  quantityText: {
    fontSize: 14,
    marginLeft: 10,
  },
  subtotalText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  removeButton: {
    backgroundColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  finalizarButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  finalizarButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
