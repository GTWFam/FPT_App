import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableHighlight, View, Image, Text} from 'react-native';
import * as MediaLibrary from 'expo-media-library';

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
            let allAssets = await MediaLibrary.getAssetsAsync();
            let assetArray = allAssets["assets"];
            let firstAsset = await MediaLibrary.getAssetInfoAsync(assetArray[0]);
            setFirstAsset(firstAsset);
        })();
      }, []);

      
    const pickImage = async () => {};

    let imgUri = null
    if (firstAsset) {
        console.log(firstAsset.location);
        imgUri = firstAsset.localUri;
        console.log(imgUri)
    }    

    if (imgUri) {
        return (
            <View style={styles.viewContainer}> 
                <TouchableHighlight onPress={pickImage} style={styles.addPhotoButton}>
                   <Image source={{ width: 70, height: 70, uri: imgUri }} style={styles.addPhotoButton} />
                </TouchableHighlight>
            </View>
        );
    } else {
        return (
            <View style={styles.viewContainer}> 
                <Text>Loading...</Text>
            </View>
        );
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