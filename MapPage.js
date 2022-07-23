import * as React from 'react';
import MapView, { Callout, Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {useEffect, useState, useLayoutEffect, useContext} from 'react';
import axios from 'axios';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ManagerContext } from "./PreferencesPage.js";


function MapPage () {
    
    
    const [location, setLocation] = useState({"lat": 37.78825, "lon": -122.4324});
    const [stuff, setStuff] = useState([]);
    const [temp, setTemp] = useState([]);
    const [set, setSet] = useState({"likes": ["Indian","Chinese","Italian","Boba"], "non": ["Burger"]});
    let state = useContext(ManagerContext);

    useEffect (() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
            }
      
            let location = await Location.getCurrentPositionAsync({});
            setLocation({"lat": location.coords.latitude, "lon": location.coords.longitude});
            
        })();
        // axios ({
        //     method: 'get',
        //     url: 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=Mexican&location={location.lat}%2C{location.lon}&radius=2000&key=AIzaSyAXwt3An7_rUfm51QMAmON6xgiQe9o5_gY'
        // }).then((response) => {
        //     // setLocation(response.data.results[0].geometry.location);
        //     setStuff(response.data.results);
            
        // });
    }, []);

    useEffect (() => {
        (async () => {
            try {
              const jsonValue = await AsyncStorage.getItem('@storage_Key');
              setSet(JSON.parse(jsonValue));
              setTemp([]);
              for (let i = 0; i < set.likes.length; i++){
                axios ({
                    method: 'get',
                    url: 'https://maps.googleapis.com/maps/api/place/textsearch/json?query={set.likes[i]}&location={location.lat}%2C{location.lon}&radius=500&key=AIzaSyAXwt3An7_rUfm51QMAmON6xgiQe9o5_gY'
                }).then((response) => {
                    let t = response.data.results;
                    setTemp(temp.concat(t));
                });
              }
              setStuff(temp);
            } catch(e) {
                
              console.log("error getting storage");
            }
            
        })();
    }, [state]);
    
    
    return (
        <View style={styles.container}>
            <MapView style={styles.map}
            
            region={{
            latitude: location.lat,
            longitude: location.lon,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }}
            
            provider = {PROVIDER_GOOGLE}
           >
           <>
           {stuff.map((place) => {
            return (
                <View key = {place.place_id}>
                <Marker coordinate = {{
                    latitude: place.geometry.location.lat,
                    longitude: place.geometry.location.lng,
                    
                }}>
                <Callout>
                    <Text>
                        {place.name}
                    </Text>
                </Callout>
                </Marker>
                </View>
            );
           })}
           </>
                <Circle center = {{
                    latitude: location.lat,
                    longitude: location.lon,
                }}
                radius = {5000}>
                </Circle>
                <Circle center = {{
                    latitude: location.lat,
                    longitude: location.lon,
                }}
                radius = {10000}>
                </Circle>
            </MapView> 
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
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });

export default MapPage;