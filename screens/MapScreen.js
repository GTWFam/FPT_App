import React, { useState, useEffect } from 'react';
import { StyleSheet, Text} from 'react-native';
import * as MediaLibrary from 'expo-media-library';

import Map from './Map';

let assetArr = [];

function MapScreen(props) {

    const [firstAsset, setFirstAsset] = useState(null);
    function moveToCamera() {
        props.navigation.navigate("Camera");
    }

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await MediaLibrary.requestPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
            let allAssets = await MediaLibrary.getAssetsAsync({first: 50});
            let assetArray = allAssets["assets"];
            assetArray.forEach(async (asset) => {
                let anAsset = await MediaLibrary.getAssetInfoAsync(asset);
                setFirstAsset(anAsset);
            })
            
        })();
      }, []);

    let arrToPass = [];

    if (firstAsset) {
        assetArr.push(firstAsset);
    }    
    if (assetArr.length === 50) {
        assetArr.forEach((asset) => {
            if (asset.location !== null) {
                arrToPass.push(asset)
            }
        });
        return (
            <Map arg={{arrToPass, moveToCamera}} ></Map>
        );
    } else {
        return (<Text>Loading...</Text>);
    }
    
}

export default MapScreen;