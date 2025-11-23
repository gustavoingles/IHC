import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../constants/Colors';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFinancial } from '../context/FinancialContext';
import { ChevronLeft } from 'lucide-react-native';

export default function LoginScreen() {
    const router = useRouter();
    const { login } = useFinancial();
    const [cpf, setCpf] = useState('');

    const handleLogin = () => {
        if (!cpf) {
            Alert.alert('Error', 'Please enter your CPF.');
            return;
        }
        // Mock login with existing user data simulation
        login('Juan', 'Carlos', cpf);
        router.replace('/');
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ChevronLeft color={Colors.text} size={32} />
                </TouchableOpacity>

                <View style={styles.content}>
                    <Text style={styles.title}>Login</Text>
                    <Text style={styles.subtitle}>Enter your CPF to access your account.</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="000.000.000-00"
                        placeholderTextColor={Colors.textSecondary}
                        value={cpf}
                        onChangeText={setCpf}
                        keyboardType="numeric"
                    />

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    safeArea: {
        flex: 1,
    },
    backButton: {
        padding: 20,
    },
    content: {
        padding: 20,
        flex: 1,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textSecondary,
        marginBottom: 40,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.textSecondary,
        paddingVertical: 10,
        fontSize: 20,
        color: Colors.text,
        marginBottom: 40,
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
