import React, {Component} from "react";
import {View, Text, TouchableOpacity,Dimensions,  StyleSheet} from "react-native";

const { width, height } = Dimensions.get("window");  

export default class Todo extends Component{
    state = {
        isEditing : false
    };
    render() {
        return (
            <View style = {styles.container}>
                <Text>Hello I'm a To DO</Text>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container : {

    }
});
