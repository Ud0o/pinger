import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Location from 'expo-location'
import MapView, { Circle, Marker } from 'react-native-maps';
import PingButton from './Components/PingButton';
import SliderExample from './Components/RadiusSlider';

export default function App() {
  const [mapRegion, setmapRegion] = useState<Region>();
  const [pin, setPin] = useState<Pin>({
    latitude:123,
    longitude:123
  });
  const [pinRadius, setPinRadius] = useState<number>(100);
  
  interface Pin{
    latitude:number,
    longitude:number
  }
  interface Region {
    latitude:number
    longitude:number
    latitudeDelta:number
    longitudeDelta:number
  }

  useEffect(() => {
    (async () => {
      let location = await Location.getCurrentPositionAsync({accuracy:5});
      setPin({latitude: location.coords.latitude, longitude: location.coords.longitude})
      setmapRegion({
        latitude : location.coords.latitude,
        longitude : location.coords.longitude,
        latitudeDelta : 0.01,
        longitudeDelta : 0.01
      })
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapView}
        initialRegion={mapRegion}>
        <Marker
          coordinate={pin}
          draggable={true}
          onDragStart={(e) => {
            console.log("drag start", e.nativeEvent.coordinate)
          }}
          onDragEnd={(e) => {
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            })
            console.log(pin.latitude, pin.longitude)
          }}>
        </Marker>
        <Circle 
          center={pin}
          radius={pinRadius}
          strokeColor='rgba(88, 235, 166, 0.35)'
          fillColor='rgba(88, 235, 166, 0.35)'>
        </Circle>
      </MapView>

      <View style={styles.pingView}>
        <SliderExample pinRadius={pinRadius} setPinRadius={setPinRadius}></SliderExample>
      </View>

      <PingButton></PingButton>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapView:{ 
    position: "absolute",
    top: 0,
    height: '70%',
    width: '100%'
  },
  pingView:{
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    backgroundColor:"#FFF",
    position: "absolute",
    bottom: 0,
    height:'35%',
    width: '100%',
  }
});
