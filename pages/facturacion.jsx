import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";

const Facturacion = () => {
  const [totalHoy, setTotalHoy] = useState(0);
  const [historial, setHistorial] = useState([]);
  const hoy = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const facturacionRef = ref(database, "facturacion/");
    
    const unsubscribe = onValue(facturacionRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Extraemos el total de hoy
        if (data[hoy]) {
          setTotalHoy(data[hoy].totalDelDia);
        }

        // Convertimos el objeto en lista para ver días anteriores
        const listaHistorica = Object.keys(data).map(fecha => ({
          fecha,
          total: data[fecha].totalDelDia
        })).reverse(); // El más reciente arriba
        
        setHistorial(listaHistorica);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.todayCard}>
        <Text style={styles.dateText}>Ventas de Hoy ({hoy}):</Text>
        <Text style={styles.amountText}>${totalHoy.toFixed(2)}</Text>
      </View>

      <Text style={styles.historyTitle}>Historial de Días Anteriores</Text>
      <FlatList
        data={historial}
        keyExtractor={(item) => item.fecha}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={styles.historyDate}>{item.fecha}</Text>
            <Text style={styles.historyAmount}>${item.total.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Facturacion;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f4f4f4" },
  todayCard: { 
    backgroundColor: "#fff", 
    padding: 20, 
    borderRadius: 15, 
    alignItems: "center",
    elevation: 4,
    marginBottom: 20
  },
  dateText: { fontSize: 16, color: "#666" },
  amountText: { fontSize: 32, fontWeight: "bold", color: "#2e7d32" },
  historyTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  historyItem: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    padding: 15, 
    backgroundColor: "#fff", 
    marginBottom: 8, 
    borderRadius: 8 
  },
  historyDate: { fontWeight: "500" },
  historyAmount: { color: "#2e7d32", fontWeight: "bold" }
});