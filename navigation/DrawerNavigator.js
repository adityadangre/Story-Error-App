import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import Profile from "../screens/Profile";
import Logout from "../screens/Logout";
import firebase from 'firebase';
import CustomSidebarMenu from '../screens/CustomSidebarMenu.js';

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            light_theme: true
        }
    }

    componentDidMount() {
        let theme;
        firebase
            .database()
            .ref('/users/' + firebase.auth().currentUser.uid)
            .on('value', function (snapshot) {
                theme = snapshot.val().current_theme
            })

        this.setState({ light_theme: theme === 'light' ? true : false })
    }

    render() {
        return (
            <Drawer.Navigator 
                drawerContent={(props) => <CustomSidebarMenu{...props}/>}
                drawerContentOptions={{activeTintColor: '#E91E63', inactiveTintColor: this.state.light_theme ? 'black' : 'white', itemStyle: {marginVertical: 5}}} 
            >
                <Drawer.Screen name="Home" component={StackNavigator} options={{unmountOnBlur: true}} />
                <Drawer.Screen name="Profile" component={Profile} options={{unmountOnBlur: true}} />
                <Drawer.Screen name="Log Out" component={Logout} options={{unmountOnBlur: true}} />
            </Drawer.Navigator>
        );
    }
};