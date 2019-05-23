import React, {Component} from "react";
import {View, Text, TouchableOpacity, Dimensions,  StyleSheet} from "react-native";

const { width, height } = Dimensions.get("window");  

export default class Todo extends Component{
    state = {
        isEditing : false,
        isCompleted : false
    };
    render() {
        const {isCompleted, isEditing} = this.state;
        return (
            <View style = {styles.container}>
                <View style= {styles.colum}>
                    <TouchableOpacity opPress={this._toggleComplete}>
                        <View 
                            style = {[
                                styles.circle, 
                                isCompleted ? styles.completedCircle : styles.uncompletedCircle
                            ]}>
                        </View>
                    </TouchableOpacity>
                    <Text style={[styles.text, 
                                isCompleted ? styles.completedText : styles.uncompletedText]}>
                                Hello I'm a To DO
                    </Text>
                </View>
                
                    {isEditing ? (
                        <View style={styles.actions}>
                            <TouchableOpacity>
                                <View srtyle= {styles.actionConatainer}>
                                    <Text style = {styles.actionText}>
                                        Check
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.actions}>
                            <TouchableOpacity onPressOut ={this._startEditing}>
                                <View style= {styles.actionConatainer}>
                                    <Text style = {styles.actionText}>
                                        Pencil
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style= {styles.actionConatainer}>
                                    <Text style = {styles.actionText}>
                                        X
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    )}
                </View>
           
        );
    }
    _toggleComplete = () => { 
        this.setState(prevState => { 
            return{
                isCompleted : !prevState.isCompleted
            };
        }); 
    };
    _startEditing = () => {
        this.setState({
            isEditing : true
        })
    }
}
const styles = StyleSheet.create({
    container : {
        width : width - 50,
        borderBottomColor : "#bbb",
        borderBottomWidth : StyleSheet.hairlineWidth,
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "space-between"
    },
    circle : {
        width : 30, 
        height : 30,
        borderRadius : 15,
        borderWidth : 3,
        marginRight : 20

    },
    completedCircle : {
        borderColor : "#bbb"
    },
    uncompletedCircle : {
        borderColor : "#F23657"
    },
    text : {
        fontWeight : "600",
        fontSize : 20,
        marginVertical : 20
    },
    completedText : {
        color : "#bbb",
        textDecorationLine : "line-through"

    },
    uncompletedText : {
        color : "#353839"
    },
    colum : {
        flexDirection : "row",
        alignItems  : "center",
        width : width/2,
        justifyContent : "space-between"
    }, 
    actions : {
        flexDirection : "row"
    },
    actionConatainer : {
        marginVertical : 20,
        marginHorizontal : 20 
    }

});
