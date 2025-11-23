import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { Barcode, CreditCard } from 'lucide-react-native';
import { PixIcon, PayPalIcon } from './Icons';
import { useRouter } from 'expo-router';

export const ActionList = () => {
    const router = useRouter();

    const actions = [
        { id: 1, label: 'Pix Payment', icon: <PixIcon size={24} color="#000" />, route: '/transfer' },
        { id: 2, label: 'Boleto Payment', icon: <Barcode color="#000" size={24} />, route: '/boleto' },
        { id: 3, label: 'Transfer', icon: <PayPalIcon size={24} color="#000" />, route: '/transfer' },
        { id: 4, label: 'Card', icon: <CreditCard color="#000" size={24} />, route: '/card-bill' },
    ];

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {actions.map((action) => (
                    <TouchableOpacity
                        key={action.id}
                        style={styles.actionItem}
                        onPress={() => router.push(action.route as any)}
                    >
                        <View style={styles.iconContainer}>
                            {action.icon}
                        </View>
                        <Text style={styles.label}>{action.label}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    scrollContent: {
        paddingHorizontal: 20,
        gap: 20,
    },
    actionItem: {
        alignItems: 'center',
        gap: 8,
    },
    iconContainer: {
        width: 70,
        height: 70,
        backgroundColor: Colors.gray,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.text,
    },
});
