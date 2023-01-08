import React from 'react';
import {Slider} from '@miblanchard/react-native-slider';
import {StyleSheet, View, Text} from 'react-native';

const RadiusSlider = (params: any) => {
     return (
        <View style={styles.container}>
            <Slider
                value={params.pinRadius}
                onValueChange={value => params.setPinRadius(Number(value))}
                step={1}
                maximumValue={500}
            />
            <Text> Ping radius: {params.pinRadius}m</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width:'80%',
        alignSelf:'center',
        marginTop:20
    },
});

export default RadiusSlider