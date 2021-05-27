import React, { useState, useEffect } from 'react';
import { Dimensions, SafeAreaView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Camera } from 'expo-camera';

function CameraScreen(props) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <SafeAreaView />;
    }

    if (hasPermission === false) {
        props.navigation.goBack();
        alert("We need access to your Camera!");
    } else {
        return (
            <SafeAreaView style={styles.container}>
              <Camera style={styles.camera} type={type}>
                <SafeAreaView style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      setType(
                        type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      );
                    }}>
                    <Text style={styles.text}> Flip </Text>
                  </TouchableOpacity>
                </SafeAreaView>
              </Camera>
            </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});

export default CameraScreen;