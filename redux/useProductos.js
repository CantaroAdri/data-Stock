// useProductos.js
// ...
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
import React, { useState, useEffect } from "react";
export function useProductos() {
const [productos, setProductos] = useState([]);
const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 

 useEffect(() => {
 setIsLoading(true);
 const productosRef = ref(database, "categoria/");

  const unsub = onValue(productosRef, snapshot => {
   const data = snapshot.val();
      setError(null); 
   if (data) {
    setProductos(
     Object.keys(data).map(id => ({ id, ...data[id] })).reverse()
    );
   } else {
          setProductos([]); 
      }
      setIsLoading(false); 
  }, (err) => { 
        setError(err);
        setIsLoading(false);
    });

  return () => unsub();
 }, []);

 return { productos, isLoading, error }; 
}