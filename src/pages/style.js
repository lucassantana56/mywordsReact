import { StyleSheet } from 'react-native'
import Constants from "expo-constants/src/Constants";

export default StyleSheet.create({
    inputView: {
        width: "80%",
        backgroundColor: "#465881",
        borderRadius: 5,
        height: 50,
        margin: 5,
        justifyContent: "center",
        padding: 20
    },
    defaultView: {
        width: "90%",
        backgroundColor: "#c6cdcc",
        borderRadius: 5,
        height: 50,
        marginTop: 15
    },
    inputText: {
        height: 50,
        color: "white"
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#6bfb00",
        borderRadius: 5,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
        marginBottom: 10
    },

    image: {
        marginTop: 5,
        marginBottom: 50
    },
    registerBtn: {
        width: "80%",
        backgroundColor: "#0e00fb",
        borderRadius: 5,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5
    },
    container: {
        marginTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backBtn: {
        width: "80%",
        backgroundColor: "#fb0200",
        borderRadius: 5,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5
    },
    restaurantList: {
        marginTop: 40,
    },
    restaurant: {
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom: 7,
    },
    restaurantProperty: {
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold'
    },
    restaurantValue: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 24,
        color: '#737380'
    },
    detailsButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    detailsButtonText: {
        color: '#e02041',
        fontSize: 15,
        fontWeight: 'bold'
    },
})