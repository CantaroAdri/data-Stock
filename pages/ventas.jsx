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
    `Total a pagar: $${totalCompra.toFixed(2)}. ¿Confirmar?`,
    [
      { text: "Cancelar" },
      {
        text: "Confirmar",
        onPress: async () => {
          try {
            const hoy = new Date().toISOString().split('T')[0];
            
            // 1. ACTUALIZAR STOCK EN FIREBASE (Esto es lo nuevo)
            // Usamos un bucle for...of para poder usar await dentro
            for (const item of cartItems) {
              const productoRef = ref(database, `categoria/${item.id}`);
              
              // a) Leemos el stock actual de la base de datos para no tener errores
              const snapshot = await get(productoRef);
              const productoData = snapshot.val();
              
              if (productoData) {
                // Si en tu base de datos el stock se llama 'cantidad' o 'stock', ajusta aquí:
                // Asumo que en Firebase la propiedad de stock se llama 'cantidad' (según tu archivo Faltante)
                const stockActual = productoData.cantidad || 0;
                const cantidadVendida = item.cantidad;
                const nuevoStock = stockActual - cantidadVendida;

                // b) Guardamos el nuevo stock
                await update(productoRef, {
                  cantidad: nuevoStock >= 0 ? nuevoStock : 0 // Evitamos negativos
                });
              }
            }

            // 2. GUARDAR EN FACTURACIÓN (Tu código anterior)
            const facturaRef = ref(database, `facturacion/${hoy}`);
            const snapshotFactura = await get(facturaRef);
            const dataFactura = snapshotFactura.val() || { totalDelDia: 0 };
            
            await update(facturaRef, {
              totalDelDia: dataFactura.totalDelDia + totalCompra,
              ultimaActualizacion: new Date().toLocaleTimeString()
            });

            await push(ref(database, `facturacion/${hoy}/operaciones`), {
              monto: totalCompra,
              hora: new Date().toLocaleTimeString(),
              items: cartItems
            });

            // 3. LIMPIEZA
            dispatch(vaciarCarrito());
            Alert.alert("¡Venta Exitosa!", "El stock y la caja han sido actualizados.");

          } catch (error) {
            console.error(error);
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
      
        <View style={styles.propinaInputContainer}>
          <Text style={styles.propinaLabel}>Propina $</Text>
          <TextInput
            style={styles.inputPropina}
            placeholder="0"
            keyboardType="numeric"
            value={propina.toString()} // Importante: convertir a string
            onChangeText={(value) => setPropina(value)}
          />
        </View>


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
    backgroundColor: "#f0f0f0", // Gris clarito para que se note
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
