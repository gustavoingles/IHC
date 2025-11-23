
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Colors } from '../constants/Colors';
import { Eye, EyeOff, HelpCircle, Mail } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useFinancial } from '../context/FinancialContext';

import { useRouter } from 'expo-router';

export const Header = () => {
    const router = useRouter();
    const { isBalanceVisible, toggleBalanceVisibility, user } = useFinancial();

    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top']}>
                <View style={styles.content}>
                    <View style={styles.topRow}>
                        <TouchableOpacity style={styles.profileButton}>
                            <Image
                                source={require('../assets/profile.png')}
                                style={styles.profileImage}
                            />
                        </TouchableOpacity>
                        <View style={styles.rightIcons}>
                            <TouchableOpacity style={styles.iconButton} onPress={toggleBalanceVisibility}>
                                {isBalanceVisible ? (
                                    <Eye color="#FFF" size={24} />
                                ) : (
                                    <EyeOff color="#FFF" size={24} />
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/help')}>
                                <HelpCircle color="#FFF" size={24} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.greeting}>Hello, {user?.firstName || 'Guest'}</Text>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        paddingBottom: 20,
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    profileButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: 48,
        height: 48,
    },
    rightIcons: {
        flexDirection: 'row',
        gap: 20,
    },
    iconButton: {
        padding: 4,
    },
    greeting: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },
    badge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: '#8A05BE',
        width: 16,
        height: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: Colors.primary,
        fontSize: 10,
        fontWeight: 'bold',
    },
});
