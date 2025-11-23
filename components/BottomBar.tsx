import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { Home, ArrowRightLeft } from 'lucide-react-native';
import { useRouter, usePathname } from 'expo-router';

export const BottomBar = () => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <View style={styles.container}>
            <View style={styles.bar}>
                <TouchableOpacity
                    style={[styles.button, pathname === '/' ? styles.activeButton : styles.inactiveButton]}
                    onPress={() => router.push('/')}
                >
                    <Home color={pathname === '/' ? '#FFF' : 'rgba(255,255,255,0.5)'} size={24} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, pathname.startsWith('/payment') || pathname.startsWith('/transfer') ? styles.activeButton : styles.inactiveButton]}
                    onPress={() => router.push('/payment')}
                >
                    <ArrowRightLeft color={pathname.startsWith('/payment') || pathname.startsWith('/transfer') ? '#FFF' : 'rgba(255,255,255,0.5)'} size={24} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        paddingBottom: 30, // Safe area padding approximation
    },
    bar: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.3)', // Semi-transparent gray/black
        borderRadius: 30,
        padding: 10,
        gap: 40,
        width: 200,
        justifyContent: 'center',
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeButton: {
        backgroundColor: Colors.primary,
    },
    inactiveButton: {
        backgroundColor: 'transparent',
    },
});
