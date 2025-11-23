import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Colors } from '../constants/Colors';
import { ChevronLeft, Phone, Mail, Globe } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HelpScreen() {
    const router = useRouter();

    const contactOptions = [
        {
            id: 1,
            label: 'Call Us',
            value: '0800 123 4567',
            icon: <Phone color={Colors.primary} size={24} />,
            action: () => Linking.openURL('tel:08001234567')
        },
        {
            id: 2,
            label: 'Email Us',
            value: 'help@nuclone.com',
            icon: <Mail color={Colors.primary} size={24} />,
            action: () => Linking.openURL('mailto:help@nuclone.com')
        },
        {
            id: 3,
            label: 'Website',
            value: 'www.nuclone.com',
            icon: <Globe color={Colors.primary} size={24} />,
            action: () => Linking.openURL('https://www.nuclone.com')
        },
    ];

    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <ChevronLeft color={Colors.textSecondary} size={32} />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>Help Center</Text>
                    <Text style={styles.subtitle}>Need assistance? Contact us through any of the channels below.</Text>

                    <View style={styles.optionsContainer}>
                        {contactOptions.map((option) => (
                            <TouchableOpacity key={option.id} style={styles.optionItem} onPress={option.action}>
                                <View style={styles.iconContainer}>
                                    {option.icon}
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.optionLabel}>{option.label}</Text>
                                    <Text style={styles.optionValue}>{option.value}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
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
        marginBottom: 40,
    },
    optionsContainer: {
        gap: 20,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.lightGray,
        padding: 20,
        borderRadius: 15,
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
    optionLabel: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: 4,
    },
    optionValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
    },
});
