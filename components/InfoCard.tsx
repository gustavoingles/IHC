import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { DollarSign, Target } from 'lucide-react-native';

interface InfoCardProps {
    title: string;
    value: string;
    description: string;
}

export const InfoCard = ({ title, value, description }: InfoCardProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.content}>
                    <View style={styles.headerRow}>
                        <Target color={Colors.primary} size={24} />
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <Text style={styles.value}>{value}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    content: {
        gap: 10,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
    },
    value: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.text,
    },
    description: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
});
