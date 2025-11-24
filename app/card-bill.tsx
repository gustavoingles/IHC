import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../constants/Colors';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { useFinancial } from '../context/FinancialContext';

export default function CardBillScreen() {
    const router = useRouter();
    const { balance, invoiceAmount, payInvoice } = useFinancial();
    const [error, setError] = useState('');

    const handlePay = () => {
        if (invoiceAmount <= 0) {
            Alert.alert('Info', 'Nenhuma fatura para pagar.');
            return;
        }
        if (balance < invoiceAmount) {
            setError("Você não tem saldo suficiente para realizar esta operação");
            return;
        }

        payInvoice();
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
                    <Text style={styles.title}>Fatura do Cartão</Text>
                    <Text style={styles.subtitle}>Fatura Atual</Text>

                    <Text style={styles.amount}>R$ {invoiceAmount.toFixed(2)}</Text>
                    <Text style={styles.dueDate}>Vence em 25 Nov</Text>

                    <View style={{ flex: 1 }} />

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    {invoiceAmount > 0 ? (
                        <TouchableOpacity style={styles.button} onPress={handlePay}>
                            <Text style={styles.buttonText}>Pagar Fatura</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={[styles.button, { backgroundColor: Colors.success }]}>
                            <Text style={styles.buttonText}>Fatura Paga</Text>
                        </View>
                    )}
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
        marginBottom: 30,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textSecondary,
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    amount: {
        fontSize: 36,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 5,
    },
    dueDate: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 20,
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
