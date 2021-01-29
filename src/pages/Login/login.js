import React, {Component, useEffect, useState} from 'react'
import {Image, View, TouchableOpacity, Text, Linking, TextInput} from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native';
import io from 'socket.io-client'


import style from "../style";
//import logoImg from "../../../assets/login.png";

export default function App() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigation = useNavigation();
    const router = useRoute();
    const ENDPOINT = 'http://10.99.2.152:3000';

    useEffect(() => {
        connectSocketIo();
        validateLogin();
    }, []);
    //ls
    //1234

    function connectSocketIo() {
        const socket = io(ENDPOINT);
        global.socket = socket;
        socket.on("connect", data => {
            console.log(data);
            global.socket = socket;
        });
    }

    function validateLogin() {
        console.log("validateLogin");
        socket.on("io", data => {
            console.log(data);
            navigateToHome();
        });
    }


    function login() {
        console.log(email, password);
        socket.emit("authenticate-client", {
            username: email,
            password: password
        });
        console.log("validateLogin");
        socket.on("id", data => {
            console.log(data);
            navigateToHome();
        });
    }

    function navigateToRegister() {
        navigation.navigate('Register');
    }

    function navigateToHome() {
        navigation.navigate('Home');
    }

    return (
        <View style={style.container}>

            <View style={style.inputView}>
                <TextInput
                    style={style.inputText}
                    placeholder="Email" autoCompleteType={"email"} onChangeText={text => setEmail(text)}
                    value={email}/>
            </View>

            <View style={style.inputView}>
                <TextInput
                    secureTextEntry={true}
                    style={style.inputText}
                    placeholder="Password"
                    onChangeText={text => setPassword(text)}
                    value={password}
                />
            </View>

            <TouchableOpacity style={style.loginBtn}
                              onPress={() => login()}>
                <Text>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={style.registerBtn}
                              onPress={() => navigateToRegister()}>
                <Text>Sign up</Text>
            </TouchableOpacity>

        </View>

    );

}
