// useProductos.js
// ...
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
import React, { useState, useEffect } from "react";
export function useProductos() {
const [productos, setProductos] = useState([]);
const [isLoading, setIsLoading] = useState(true); // 👈 Añadir estado de carga
  const [error, setError] = useState(null); // 👈 Añadir estado de error

 useEffect(() => {
 setIsLoading(true);
 const productosRef = ref(database, "categoria/");

  const unsub = onValue(productosRef, snapshot => {
   const data = snapshot.val();
      setError(null); // Resetear error si hay data
   if (data) {
    setProductos(
     Object.keys(data).map(id => ({ id, ...data[id] })).reverse()
    );
   } else {
          setProductos([]); // Si no hay data, lista vacía
      }
      setIsLoading(false); // La carga terminó
  }, (err) => { // Manejo de errores
        setError(err);
        setIsLoading(false);
    });

  return () => unsub();
 }, []);

 return { productos, isLoading, error }; // 👈 Retornar los tres estados
}