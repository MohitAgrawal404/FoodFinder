import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, createContext} from 'react';

export const ManagerContext = createContext(null);


export default function PreferencesPage () {

    const [pref, setPref] = useState({"likes": ["Indian","Chinese","Italian","Boba"], "non": ["Burger"]});

    useEffect(() => {

        (async () => {
            try {
              const jsonValue = await AsyncStorage.getItem('@storage_Key')
              setPref(JSON.parse(jsonValue));
              
            } catch(e) {
              console.log("error getting storage")

            }
        })();

    }, []);

    useEffect(() => {
        (async () => {
            try {
              const jsonValue = JSON.stringify(pref)
              await AsyncStorage.setItem('@storage_Key', jsonValue)
              
            } catch (e) {
              // saving error
              console.log("error storing data");
            }
        })();

    }, []);

    return(
        <ManagerContext.Provider value = {pref.likes}>
        <View>
        <Text>
            Likes: 
        </Text>
        <>
            {pref.likes.map((place) => {
                return(
                <ManagerContext.Provider value = {place}>
                <TouchableOpacity key={place}>
                    <Text>
                        {place}
                    </Text>
                </TouchableOpacity>
                </ManagerContext.Provider>
                )
            })}
        </>
        <Text>
            Dislikes:
        </Text>
        <>
            {pref.non.map((place) => {
                return(
                <TouchableOpacity key={place}>
                    <Text>
                        {place}
                    </Text>
                </TouchableOpacity>
                )
            })}
        </>
        </View>
        </ManagerContext.Provider>
    );

}