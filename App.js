import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapPage from "./MapPage";
import PreferencesPage from "./PreferencesPage";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function App () {
  return (
    <NavigationContainer>
    <Tab.Navigator
      initialRouteName = "Map"
      screenOptions = {({route}) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === "Map") {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === "Preferences") {
              iconName = focused ? 'settings' : 'settings-outline';

            } 

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
      })}

      tabBarOptions = {{
        activeTintColor: 'cyan',
        inactiveTintColor: 'grey',
        labelStyle: {
          paddingBottom: 0, fontSize: 10 
        },
        style: {padding: 10, height: 70}
      }}>

      <Tab.Screen name="Map" component={MapPage} />
      <Tab.Screen name="Preferences" component={PreferencesPage} />
    </Tab.Navigator>
    </NavigationContainer>

    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
