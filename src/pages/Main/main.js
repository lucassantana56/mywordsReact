import React, {useEffect, useState} from 'react'
import * as Location from 'expo-location'
import socketIO from 'socket.io-client'

import {
    Image,
    View,
    TouchableOpacity,
    Text,
    Linking,
    TextInput,
    ScrollView,
    SafeAreaView,
    FlatList,
    ImageBackground
} from 'react-native'
import {FontAwesome5} from '@expo/vector-icons';
import {Entypo} from '@expo/vector-icons';
import api from "../../services/api";

import style from "../style";
import {useNavigation} from "@react-navigation/native";

//import defaultImage from "../../../assets/placeholder.jpg";

export default function App() {
    const [restaurant, setRestaurant] = useState([]);
    const [location, setLocation] = useState([]);
    const navigation = useNavigation();

    function navigateToMap(restaurant) {
        navigation.navigate('Map', {res: restaurant, userLocation: location});
    }

    async function requestDelivery(restaurant) {
        console.log("Delivery requested");
        const restaurantLocation = {latitude: restaurant.location.latitude, longitude: restaurant.location.longitude};
        const currentLocation = {latitude: location.coords.latitude, longitude: location.coords.longitude};
        console.log(currentLocation);
        const address = await Location.reverseGeocodeAsync(currentLocation);
        console.log(address[0].street);
        const street = address[0].street + ", " + address[0].city + ", " + address[0].country;
        console.log("mylocation " + address.street);
        var body =
            JSON.parse(
                '{"id":"'
                + guidGenerator()
                + '","information":{"useraddress":"'
                + street + '","restaurant":"' + restaurant.name + '" },' +
                '"restlocation": '
                + JSON.stringify(restaurantLocation) + ',' +
                '"userlocation" : {"latitude":"' + location.coords.latitude
                + '","longitude":"' + location.coords.longitude
                + '"}}');
        console.log(body);
        global.socket.emit("request", body);
        navigateToMap(restaurant);
    }

    //Generates a request id
    function guidGenerator() {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    async function loadRestaurant() {
        const response = await api.post('search?lat=38.764069&lon=-9.155356&radius=1000&category=1,5,7,9,10').then(res => {
            console.log(res.data.restaurants);
            setRestaurant(res.data.restaurants);
        }).catch(error => console.log(error));
    }

    useEffect(() => {
        loadRestaurant();
    }, []);

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
            }

            let l = await Location.getCurrentPositionAsync({});
            console.log(l);
            setLocation(l);
        })();
    }, []);

    return (
        <SafeAreaView style={style.container}>
            <View style={style.defaultView}>
                <TextInput
                    style={style.inputText}
                />
            </View>
            <FlatList
                style={style.restaurantList}
                data={restaurant}
                showsVerticalScrollIndicator={false}
                renderItem={({item: restaurant}) => (
                    <View style={style.restaurant}>
                        <TouchableOpacity
                            onPress={() => requestDelivery(restaurant.restaurant)}>
                            <ImageBackground imageStyle={{borderRadius: 10}}
                                             source={{uri: restaurant.restaurant.featured_image}}
                                             style={{
                                                 flex: 1,
                                                 height: 200,
                                                 resizeMode: "cover",
                                                 justifyContent: "flex-start", alignItems: "center"
                                             }}>
                                <Text style={{color: "#fafafa", fontSize: 40}}>{restaurant.restaurant.name}</Text>
                                <Text style={{
                                    color: "#000000",
                                    fontSize: 15
                                }}>{restaurant.restaurant.location.latitude + " " + restaurant.restaurant.location.longitude}</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}
