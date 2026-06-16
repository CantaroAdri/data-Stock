import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { quitarDelCarrito, vaciarCarrito } from "../redux/carritoSlice";
import { database } from "../firebase";
import { ref, get, update, push } from "firebase/database";
import { useState } from "react";

const Ventas = ({ navigation }) => {
  const dispatch = useDispatch();

  const [propina, setPropina] = useState(0);

  const cartItemsObject = useSelector((state) => state.carritoReducer.items);
  const cartItems = Object.values(cartItemsObject);

    const subtotal = cartItems.reduce((sum, item) => {
    return sum + item.precio * item.cantidad;
  }, 0);


  const montoPropina = parseFloat(propina) || 0;
  const totalConPropina = subtotal + montoPropina;

  const totalCompra = cartItems.reduce((sum, item) => {
    return sum + item.precio * item.cantidad;
  }, 0);

  const handleQuitarItem = (id) => {
    dispatch(quitarDelCarrito(id));
  };


const handleFinalizarCompra = () => {
  if (cartItems.length === 0) {
    Alert.alert("Carrito Vacío", "No hay productos para finalizar.");
    return;
  }

  Alert.alert(
    "Confirmar Venta",
    `Total a pagar (con propina): $${totalConPropina.toFixed(2)}. ¿Confirmar?`,
    [
      { text: "Cancelar" },
      {
        text: "Confirmar",
        onPress: async () => {
          try {
            const hoy = new Date().toISOString().split('T')[0];
         
for (const item of cartItems) {
 
  if (item.keyFirebase) {
    const productoRef = ref(database, `categoria/${item.keyFirebase}`);
    
   
    const snapshot = await get(productoRef);
    const productoData = snapshot.val();
    
    if (productoData) {
      const stockActual = productoData.cantidad || 0;
      const cantidadVendida = item.cantidad;
      const nuevoStock = stockActual - cantidadVendida;

      await update(productoRef, {
        cantidad: nuevoStock >= 0 ? nuevoStock : 0 
      });
    } else {
      console.warn(`Ojo: No se encontró el producto en la key ${item.keyFirebase}`);
    }
  } else {
    console.warn(`Ojo: El item ${item.nombre} no tiene una keyFirebase asociada.`);
  }
}

            const facturaRef = ref(database, `facturacion/${hoy}`);
            const snapshotFactura = await get(facturaRef);
            const dataFactura = snapshotFactura.val() || { totalDelDia: 0 };
            
         
            await update(facturaRef, {
              totalDelDia: dataFactura.totalDelDia + totalConPropina,
              ultimaActualizacion: new Date().toLocaleTimeString()
            });

            await push(ref(database, `facturacion/${hoy}/operaciones`), {
              subtotal: totalCompra,
              propina: montoPropina,
              montoTotal: totalConPropina,
              hora: new Date().toLocaleTimeString(),
              items: cartItems
            });

            
            dispatch(vaciarCarrito());
            setPropina(0); 
            Alert.alert("¡Venta Exitosa!", "El stock en la nube y la caja han sido actualizados permanentemente.");

          } catch (error) {
            console.error("Error en base de datos al finalizar compra:", error);
            Alert.alert("Error", "Hubo un problema al conectar con la base de datos.");
          }
        },
      },
    ]
  );
};


  return (
    <View style={styles.container}>

      <View style={{ flex: 1 }}>
          <Text style={styles.totalText}>Productos: ${subtotal.toFixed(2)}</Text>
          <Text style={[styles.totalAmount, { color: 'green' }]}>
            Total Final: ${totalConPropina.toFixed(2)}
          </Text>
        </View>
     
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
      
        <View style={styles.propinaInputContainer}>
          <Text style={styles.propinaLabel}>Propina $</Text>
          <TextInput
            style={styles.inputPropina}
            placeholder="0"
            keyboardType="numeric"
            value={propina.toString()} 
            onChangeText={(value) => setPropina(value)}
          />
        </View>

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
  propinaInputContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginLeft: 10,
  },
  propinaLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "bold",
    marginBottom: 2,
  },
  inputPropina: {
    backgroundColor: "#f0f0f0", 
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    width: 90,
    textAlign: "right",
    fontSize: 18,
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "#ccc",
    color: "#333",
  },


});
