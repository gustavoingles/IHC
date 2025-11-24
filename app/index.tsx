import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Header } from '../components/Header';
import { ActionList } from '../components/ActionList';
import { InfoCard } from '../components/InfoCard';
import { BottomBar } from '../components/BottomBar';
import { Colors } from '../constants/Colors';
import { ChevronRight, Eye, EyeOff } from 'lucide-react-native';
import { WelcomeModal } from '../components/WelcomeModal';

import { useFinancial } from '../context/FinancialContext';
import { Redirect, useRouter } from 'expo-router';

export default function HomeScreen() {
    const router = useRouter();
    const { balance, isBalanceVisible, user, creditLimit, toggleBalanceVisibility } = useFinancial();
    const [showWelcome, setShowWelcome] = React.useState(false);

    React.useEffect(() => {
        if (user) {
            // Show welcome modal on mount
            setShowWelcome(true);
        }
    }, [user]);

    if (!user) {
        return <Redirect href="/landing" />;
    }

    return (
        <View style={styles.container}>
            <Header />
            <WelcomeModal
                visible={showWelcome}
                onClose={() => setShowWelcome(false)}
                userName={user.firstName}
            />
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Balance Section */}
                <View style={styles.balanceContainer}>
                    <Text style={styles.balanceLabel}>Saldo da Conta</Text>
                    <View style={styles.balanceRow}>
                        <Text style={styles.balanceValue}>
                            {isBalanceVisible ? `R$ ${balance.toFixed(2)}` : '••••'}
                        </Text>
                        <TouchableOpacity onPress={() => router.push('/extract')}>
                            <ChevronRight color={Colors.text} size={24} />
                        </TouchableOpacity>
                    </View>
                </View>

                <ActionList />

                <View style={styles.divider} />

                <InfoCard
                    title="Limite do Cartão de Crédito"
                    value={`R$ ${creditLimit.toFixed(2)}`}
                    description="Limite disponível para compras."
                />

            </ScrollView>
            <BottomBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollContent: {
        paddingBottom: 100, // Space for BottomBar
    },
    balanceContainer: {
        padding: 20,
        paddingTop: 30,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    balanceLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.text,
    },
    balanceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    balanceValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.text,
    },
    divider: {
        height: 2,
        backgroundColor: '#F0F1F5',
        marginHorizontal: 20,
        marginTop: 20,
    },
});
