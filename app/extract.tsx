import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { ChevronLeft, ArrowUpRight, ArrowDownLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFinancial } from '../context/FinancialContext';

export default function ExtractScreen() {
    const router = useRouter();
    const { transactions } = useFinancial();

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.transactionItem}>
            <View style={styles.iconContainer}>
                {item.type === 'transfer' ? (
                    <ArrowUpRight color={Colors.text} size={20} />
                ) : (
                    <ArrowDownLeft color={Colors.text} size={20} />
                )}
            </View>
            <View style={styles.details}>
                <Text style={styles.recipient}>Transferência para {item.recipient}</Text>
                <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
            </View>
            <Text style={styles.amount}>-R$ {item.amount.toFixed(2)}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <ChevronLeft color={Colors.textSecondary} size={32} />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>Extrato da Conta</Text>

                    {transactions.length === 0 ? (
                        <Text style={styles.emptyText}>Nenhuma transação ainda.</Text>
                    ) : (
                        <FlatList
                            data={transactions}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.listContent}
                        />
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
        flex: 1,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 20,
    },
    listContent: {
        paddingBottom: 20,
    },
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGray,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.gray,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    details: {
        flex: 1,
    },
    recipient: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.text,
    },
    date: {
        fontSize: 12,
        color: Colors.textSecondary,
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.text,
    },
    emptyText: {
        textAlign: 'center',
        color: Colors.textSecondary,
        marginTop: 50,
        fontSize: 16,
    },
});
