import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

function Map(props) {

    
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    let assetArray = props.arg['arrToPass'];
    let text = "Loading...";

    useEffect(() => {
        (async () => {
          if (Platform.OS === 'android' && !Constants.isDevice) {
            setErrorMsg(
              'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
            );
            return;
          }
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
          
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
    }, []);    
    
    let lat = null;
    let long =  null;
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        lat = location["coords"]["latitude"];
        long = location["coords"]["longitude"];
    }
    if (lat && long) {
        return (
                <MapView
                    provider={"google"}
                    style={styles.map}
                    initialRegion={{
                        latitude: lat,
                        longitude: long,
                        latitudeDelta: 0.5,
                        longitudeDelta: 0.5
                    }}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    showsCompass={true}
                >
                    {assetArray ? assetArray.map((asset) => (
                        <Marker 
                            key={asset.filename}
                            coordinate={asset.location}
                            image={require('../assets/marker.png')}
                        />
                    )) : null }
                        <TouchableOpacity onPress={props.arg["moveToCamera"]}>
                            <Image 
                            style={styles.cameraButton} 
                            source={require("../assets/photo-camera.png")}
                            />
                        </TouchableOpacity>
                </MapView>
        );
    } else {
        return (
        <SafeAreaView styles={styles.container}>
            <Text>{text}</Text>
        </SafeAreaView>);
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    cameraButton: {
        marginBottom: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#F0F0F0",
      },
})

export default Map;