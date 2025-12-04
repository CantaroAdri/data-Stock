import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setProductos } from "../redux/stockSlice"; 

export default function useProductos() {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("tu_url_de_firebase.json");
        const json = await res.json();

        if (json) {
          const lista = Object.keys(json).map(id => ({
            id,
            ...json[id],
          }));

       
          dispatch(setProductos(lista));

          setData(lista);
        }

      } catch (error) {
        console.log("Error cargando productos", error);
      }
    };

    fetchProductos();
  }, []);

  return data;
}
