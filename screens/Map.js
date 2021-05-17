import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Image, TouchableHighlight, Text } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

function Map(props) {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

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

    
    let text = "We need your permission to access your location"
    let lat = null;
    let long =  null;
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        lat = location["coords"]["latitude"];
        long = location["coords"]["longitude"];
        text = "Latitude: " + lat + " & Longitude: " + long;
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
            </MapView>
        );
    } else {
        return (<Text>{text}</Text>);
    }
    
}

const styles = StyleSheet.create({
    locationButton: {
        width: 70,
        height: 70,

    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        alignItems: "flex-end"
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },
})

export default Map;