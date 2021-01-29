import React, {useState} from 'react';
import {Image, View, TouchableOpacity, Text, Linking, TextInput} from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native';


import style from "../style";

export default function App() {
    const navigation = useNavigation();
    const router = useRoute();
    const [email, setEmail] = useState();
    const [contact, setContact] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirmpass, setconfirmpass] = useState();

    function navigatioBack() {
        navigation.goBack();
    }

    function register() {
        socket.emit("register-client", {
            username: username,
            email: email,
            contact: contact,
            confirmpass: confirmpass,
            password: password
        });
    }

    return (

        <View style={style.container}>
            <View style={style.inputView}>
                <TextInput
                    style={style.inputText}
                    placeholder="Username" onChangeText={text => setUsername(text)}
                    value={username}/>
            </View>
            <View style={style.inputView}>
                <TextInput
                    style={style.inputText}
                    placeholder="Email" onChangeText={text => setEmail(text)}
                    value={email}/>
            </View>

            <View style={style.inputView}>
                <TextInput
                    style={style.inputText}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                    value={password}/>

            </View>

            <View style={style.inputView}>
                <TextInput
                    style={style.inputText}
                    placeholder="Confirm pass"
                    secureTextEntry={true}
                    onChangeText={text => setconfirmpass(text)}
                    value={confirmpass}/>

            </View>

            <View style={style.inputView}>
                <TextInput
                    style={style.inputText}
                    placeholder="Contact"
                    placeholderTextColor=""
                    onChangeText={text => setContact(text)}
                    value={contact}/>
            </View>

            <TouchableOpacity style={style.registerBtn}
                              onPress={() => register()}>
                <Text>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity style={style.backBtn}
                              onPress={() => navigatioBack()}>
                <Text>Back</Text>
            </TouchableOpacity>

        </View>
    );
}
