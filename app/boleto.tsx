import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../constants/Colors';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { useFinancial } from '../context/FinancialContext';

export default function BoletoScreen() {
    const router = useRouter();
    const { addTransaction, balance } = useFinancial();
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handlePay = () => {
        if (!code) {
            Alert.alert('Erro', 'Por favor, digite o código do boleto.');
            return;
        }

        // Simple validation: Check if code is numeric and has sufficient length (e.g., 44 digits is standard, but let's say > 20 for flexibility)
        const cleanCode = code.replace(/[^0-9]/g, '');
        if (cleanCode.length < 20) {
            Alert.alert('Erro', 'Código inválido. Verifique os dígitos.');
            return;
        }

        // Mock payment logic
        const amount = 50 + Math.random() * 100; // Random amount between 50 and 150

        if (balance < amount) {
            setError("Você não tem saldo suficiente para realizar esta operação");
            return;
        }

        addTransaction({
            type: 'payment',
            amount: amount,
            recipient: 'Pagamento de Boleto',
        });

        router.push('/confirmation');
    };

    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <ChevronLeft color="#000" size={32} />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>Pagar Boleto</Text>
                    <Text style={styles.subtitle}>Digite o código de barras do boleto abaixo.</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="0000.0000.0000.0000"
                        placeholderTextColor={Colors.textSecondary}
                        keyboardType="numeric"
                        value={code}
                        onChangeText={(text) => {
                            setCode(text);
                            setError('');
                        }}
                    />

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <TouchableOpacity style={styles.button} onPress={handlePay}>
                        <Text style={styles.buttonText}>Pagar Boleto</Text>
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
    header: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    content: {
        padding: 20,
        flex: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textSecondary,
        marginBottom: 30,
    },
    input: {
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray,
        paddingVertical: 10,
        marginBottom: 40,
        color: Colors.text,
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
    errorText: {
        color: Colors.error,
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
