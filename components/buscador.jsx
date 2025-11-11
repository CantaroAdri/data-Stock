import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

const Buscador = ({ placeholder }) => {
  const [texto, setTexto] = useState("");
  const [error, setError] = useState("");

  const validarTexto = (input) => {
    setTexto(input); // actualiza siempre
    if (!input || input.trim() === "") {
      setError("El campo de búsqueda no puede estar vacío.");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder={placeholder || "Buscar..."}
        onChangeText={validarTexto}
        value={texto}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({

    container: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#8F09C8",
    boxShadow: "0px 2px 6px #8F09C8",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  inputError: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
});

export default buscador;