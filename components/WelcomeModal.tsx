import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';

interface WelcomeModalProps {
    visible: boolean;
    onClose: () => void;
    userName: string;
}

export const WelcomeModal = ({ visible, onClose, userName }: WelcomeModalProps) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Welcome to your new financial life</Text>

                    <Text style={styles.message}>
                        Hello, {userName}! We are thrilled to have you with us.
                        Explore the app to manage your finances, pay bills, and track your expenses with ease.
                    </Text>

                    <View style={styles.divider} />

                    <Text style={styles.subMessage}>
                        Your journey to financial freedom starts now.
                    </Text>

                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 24,
        width: '100%',
        maxWidth: 340,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 16,
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 22,
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: '#EEE',
        marginBottom: 20,
    },
    subMessage: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        marginBottom: 24,
    },
    button: {
        backgroundColor: Colors.primary,
        borderRadius: 30,
        paddingVertical: 12,
        paddingHorizontal: 32,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
