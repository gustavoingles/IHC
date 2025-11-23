import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Colors } from '../../constants/Colors';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFinancial } from '../../context/FinancialContext';

export default function AmountScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { recipient } = params;
    const [amount, setAmount] = useState('');
    const { balance, addTransaction } = useFinancial();

    const handleTransfer = () => {
        const value = parseFloat(amount);
        if (isNaN(value) || value <= 0) {
            Alert.alert('Invalid Amount', 'Please enter a valid amount.');
            return;
        }
        if (value > balance) {
            Alert.alert('Insufficient Funds', 'You do not have enough balance.');
            return;
        }

        addTransaction({
            type: 'transfer',
            amount: value,
            recipient: recipient as string,
        });

        router.push('/confirmation');
    };

    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <ChevronLeft color={Colors.textSecondary} size={32} />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>How much do you want to transfer to {recipient}?</Text>
                    <Text style={styles.balance}>Available balance: ${balance.toFixed(2)}</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.currency}>$</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="0.00"
                            placeholderTextColor={Colors.textSecondary}
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={setAmount}
                            autoFocus
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.fab} onPress={handleTransfer}>
                    <ChevronRight color="#FFF" size={32} />
                </TouchableOpacity>
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
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 10,
    },
    balance: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: 40,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    currency: {
        fontSize: 40,
        color: Colors.textSecondary,
        marginRight: 5,
    },
    input: {
        fontSize: 40,
        color: Colors.primary,
        fontWeight: 'bold',
        flex: 1,
    },
    fab: {
        position: 'absolute',
        bottom: 40,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
});
