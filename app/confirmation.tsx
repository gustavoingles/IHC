import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { Check } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ConfirmationScreen() {
    const router = useRouter();

    const handleGoHome = () => {
        router.dismissAll();
        router.replace('/');
    };

    const handleViewReceipt = () => {
        router.push('/receipt');
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.content}>
                    <View style={styles.iconContainer}>
                        <Check color="#FFF" size={40} />
                    </View>
                    <Text style={styles.title}>Transferência realizada!</Text>
                    <Text style={styles.subtitle}>Seu dinheiro foi enviado.</Text>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.receiptButton} onPress={handleViewReceipt}>
                        <Text style={styles.receiptButtonText}>Ver Comprovante</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
                        <Text style={styles.homeButtonText}>Voltar ao Início</Text>
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
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textSecondary,
        textAlign: 'center',
    },
    footer: {
        padding: 20,
        width: '100%',
        gap: 15,
    },
    receiptButton: {
        backgroundColor: 'transparent',
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    receiptButtonText: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
    },
    homeButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
    },
    homeButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
