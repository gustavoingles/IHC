import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../constants/Colors';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFinancial } from '../context/FinancialContext';

export default function SignupScreen() {
    const router = useRouter();
    const { login } = useFinancial();
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [cpf, setCpf] = useState('');

    const validateCPF = (cpf: string) => {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
        let soma = 0;
        let resto;
        for (let i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;
        soma = 0;
        for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;
        return true;
    };

    const handleSignup = () => {
        if (!firstName || !surname || !cpf) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }
        if (firstName.length <= 2 || surname.length <= 2) {
            Alert.alert('Error', 'Name and Surname must be more than 2 letters.');
            return;
        }
        if (!validateCPF(cpf)) {
             Alert.alert('Error', 'Invalid CPF.');
             return;
        }

        login(firstName, surname, cpf);
        router.replace('/');
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>NuClone</Text>
                </View>

                <View style={styles.form}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: Juan"
                        placeholderTextColor={Colors.textSecondary}
                        value={firstName}
                        onChangeText={setFirstName}
                    />

                    <Text style={styles.label}>Surname</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: Carlos"
                        placeholderTextColor={Colors.textSecondary}
                        value={surname}
                        onChangeText={setSurname}
                    />

                    <Text style={styles.label}>CPF</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="000.000.000-00"
                        placeholderTextColor={Colors.textSecondary}
                        value={cpf}
                        onChangeText={setCpf}
                        keyboardType="numeric"
                    />

                    <TouchableOpacity style={styles.button} onPress={handleSignup}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.linkButton} onPress={() => router.push('/login')}>
                        <Text style={styles.linkText}>Already have an account? Login</Text>
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
        padding: 20,
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    logoText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    form: {
        gap: 15,
    },
    label: {
        fontSize: 16,
        color: Colors.text,
        fontWeight: 'bold',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.textSecondary,
        paddingVertical: 10,
        fontSize: 16,
        color: Colors.text,
        marginBottom: 10,
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    linkButton: {
        alignItems: 'center',
        marginTop: 20,
    },
    linkText: {
        color: Colors.primary,
        fontSize: 14,
    },
});
