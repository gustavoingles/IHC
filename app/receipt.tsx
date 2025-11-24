import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { Colors } from '../constants/Colors';
import { X, Share2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFinancial } from '../context/FinancialContext';

export default function ReceiptScreen() {
    const router = useRouter();
    const { transactions } = useFinancial();
    const lastTransaction = transactions[0]; // Assuming the latest is first

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Comprovante de transferência para ${lastTransaction?.recipient} de R$ ${lastTransaction?.amount.toFixed(2)}`,
            });
        } catch (error) {
            console.error(error);
        }
    };

    if (!lastTransaction) {
        return (
            <View style={styles.container}>
                <SafeAreaView edges={['top']} style={styles.safeArea}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <X color={Colors.textSecondary} size={32} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.title}>Nenhuma transação encontrada.</Text>
                    </View>
                </SafeAreaView>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <X color={Colors.textSecondary} size={32} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleShare}>
                        <Share2 color={Colors.primary} size={24} />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>Comprovante de Transferência</Text>
                    <Text style={styles.date}>{new Date(lastTransaction.date).toLocaleString()}</Text>

                    <View style={styles.amountContainer}>
                        <Text style={styles.amountLabel}>Valor Transferido</Text>
                        <Text style={styles.amount}>R$ {lastTransaction.amount.toFixed(2)}</Text>
                    </View>

                    <View style={styles.detailsContainer}>
                        <Text style={styles.detailLabel}>Destinatário</Text>
                        <Text style={styles.detailValue}>{lastTransaction.recipient}</Text>

                        <View style={styles.separator} />

                        <Text style={styles.detailLabel}>Forma de Pagamento</Text>
                        <Text style={styles.detailValue}>Saldo da Conta</Text>
                    </View>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        marginBottom: 5,
    },
    date: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: 40,
    },
    amountContainer: {
        marginBottom: 30,
    },
    amountLabel: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: 5,
    },
    amount: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.text,
    },
    detailsContainer: {
        backgroundColor: Colors.lightGray,
        padding: 20,
        borderRadius: 10,
    },
    detailLabel: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: 5,
    },
    detailValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 15,
    },
    separator: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginBottom: 15,
    },
});
