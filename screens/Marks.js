import React from 'react';
import MapView, { Marker } from 'react-native-maps';
function Marks(props) {

    let assets = props.array["assetArray"];

    console.log(assets.length);
    console.log(assets[0].location);

    return (
        assets.map((asset) => {
            <Marker 
                coordinate={asset.location} 
                image={require('../assets/marker.png')}
            /> 
        })
    );
}

export default Marks;