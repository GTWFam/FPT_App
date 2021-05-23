import React, { useState, useEffect } from 'react';
import { StyleSheet, Text} from 'react-native';
import * as MediaLibrary from 'expo-media-library';

import Map from './Map';

let assetArr = [];

function Photos(props) {

    const [firstAsset, setFirstAsset] = useState(null);

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
            <Map arr={{arrToPass}} ></Map>
        );
    } else {
        return (<Text>Loading...</Text>);
    }
    
}

const styles = StyleSheet.create({
    viewContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    addPhotoButton: {
        width: 70,
        height: 70,
        borderRadius: 250,
    },

})

export default Photos;