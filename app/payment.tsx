import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../constants/Colors';
import { ChevronLeft, HelpCircle, Barcode, CreditCard } from 'lucide-react-native';
import { PixIcon, PayPalIcon } from '../components/Icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PaymentScreen() {
    const router = useRouter();

    const options = [
        {
            id: 1,
            title: 'Pix',
            description: 'Transferências instantâneas, 24/7.',
            icon: <PixIcon size={24} color="#000" />,
            route: '/transfer'
        },
        {
            id: 2,
            title: 'Pagar Boleto',
            description: 'Pague contas de luz, água, internet.',
            icon: <Barcode color="#000" size={24} />,
            route: '/boleto'
        },
        {
            id: 3,
            title: 'Transferir via PayPal',
            description: 'Transferências internacionais fáceis.',
            icon: <PayPalIcon size={24} color="#000" />,
            route: '/transfer'
        },
        {
            id: 4,
            title: 'Fatura do Cartão',
            description: 'Pague a fatura do seu cartão.',
            icon: <CreditCard color="#000" size={24} />,
            route: '/card-bill'
        },
    ];

    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <ChevronLeft color="#000" size={32} />
                    </TouchableOpacity>
                    <HelpCircle color="#000" size={24} />
                </View>

                <ScrollView style={styles.content}>
                    <Text style={styles.title}>Área de Pagamentos</Text>

                    <View style={styles.grid}>
                        {options.map((option) => (
                            <TouchableOpacity
                                key={option.id}
                                style={styles.card}
                                onPress={() => router.push(option.route as any)}
                            >
                                <View style={styles.iconContainer}>
                                    {option.icon}
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.cardTitle}>{option.title}</Text>
                                    <Text style={styles.cardDescription}>{option.description}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
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
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 10,
    },
    card: {
        width: '100%',
        backgroundColor: Colors.lightGray,
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 4,
    },
    cardDescription: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 40,
    },
});
