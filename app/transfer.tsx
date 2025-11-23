import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Colors } from '../constants/Colors';
import { ChevronLeft, HelpCircle, ArrowRight, User } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const contacts = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Carlos Ruiz' },
    { id: 4, name: 'Ana Silva' },
];

export default function TransferScreen() {
    const router = useRouter();
    const [recipient, setRecipient] = useState('');

    const handleNext = () => {
        if (!recipient) {
            Alert.alert('Error', 'Please enter a name, email, or CPF.');
            return;
        }
        router.push({ pathname: '/transfer/amount', params: { recipient } });
    };

    const handleContactSelect = (contactName: string) => {
        router.push({ pathname: '/transfer/amount', params: { recipient: contactName } });
    };

    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <ChevronLeft color="#000" size={32} />
                    </TouchableOpacity>
                    <HelpCircle color="#000" size={24} />
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>For whom do you want to make a transfer?</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Payment data:</Text>
                        <View style={styles.inputRow}>
                            <TextInput
                                style={styles.input}
                                placeholder="Name, PayPal, PicPay, etc..."
                                placeholderTextColor={Colors.textSecondary}
                                value={recipient}
                                onChangeText={setRecipient}
                                onSubmitEditing={handleNext}
                            />
                            <TouchableOpacity onPress={handleNext}>
                                <ArrowRight color={Colors.primary} size={24} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputLine} />
                    </View>

                    <ScrollView style={styles.contactList}>
                        {contacts.map((contact) => (
                            <TouchableOpacity
                                key={contact.id}
                                style={styles.contactItem}
                                onPress={() => handleContactSelect(contact.name)}
                            >
                                <ArrowRight color="#000" size={24} />
                                <View style={styles.avatar}>
                                    <User color="#FFF" size={20} />
                                </View>
                                <Text style={styles.contactName}>{contact.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <View style={styles.footerLine} />
                    <Text style={styles.footerText}>
                        The list above represents your most frequent payment contacts
                    </Text>
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
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 40,
    },
    inputContainer: {
        marginBottom: 40,
    },
    inputLabel: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: 5,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    input: {
        fontSize: 16,
        color: Colors.text,
        paddingVertical: 5,
        flex: 1,
    },
    inputLine: {
        height: 1,
        backgroundColor: Colors.textSecondary,
    },
    contactList: {
        flex: 1,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 15,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contactName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.text,
    },
    footerLine: {
        height: 2,
        backgroundColor: '#000',
        marginBottom: 20,
    },
    footerText: {
        fontSize: 14,
        color: Colors.text,
        fontWeight: '500',
    },
});
