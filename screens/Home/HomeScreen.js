import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    const loadFonts = async () => {
        await Font.loadAsync({
            'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
        });
        setFontsLoaded(true);
        SplashScreen.hideAsync();
    };

    useEffect(() => {
        loadFonts();
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titlePart1}>Welcome to our</Text>
            <Text style={styles.titlePart2}>Party Invitation App</Text>
            <StatusBar style='auto' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titlePart1: {
        fontSize: 36,
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    titlePart2: {
        fontSize: 36,
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
    },
});
