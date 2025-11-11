import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
const InicioSesion = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Lógica de inicio de sesión aquí
        console.log('Iniciando sesión con:', username, password);}
}


        // expo install react-native-safe-area-context