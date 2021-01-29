import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
//import {createDrawerNavigator} from "@react-navigation/drawer";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const BottomNavigation = createBottomTabNavigator();


import Main from "./pages/Main/main.js";
import theme from "@react-navigation/native/src/theming/DarkTheme";

export default function InternalRouter() {
    return (
        <BottomNavigation.Navigator
            initialRouteName="Home"
            unmountInactiveScreens={true}
            tabBarOptions={{
                activeTintColor: theme.colors.primary,
                tabStyle: {
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    marginBottom: 5,
                },
            }}>
            <BottomNavigation.Screen name="Main" component={Main} options={{
                tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="shopping" color={"green"} size={size}/>
                ),
            }}/>
        </BottomNavigation.Navigator>

    );
}
