import React, {Component} from "react";
import {View,
        Text, 
        TouchableOpacity, 
        Dimensions,  
        StyleSheet,
        TextInput
} from "react-native";
import PropTypes from "prop-types";


const { width, height } = Dimensions.get("window");  


export default class Todo extends Component{
    constructor(props){
        super(props);
        this.state = { isEditing : false, toDoValue : props.text};
    }

    static propTypes = {
        id : PropTypes.string.isRequired,
        text : PropTypes.string.isRequired,
        isCompleted : PropTypes.bool.isRequired,
        deleteToDo  : PropTypes.func.isRequired
        
    };
    state = {
        isEditing : false,
        isCompleted : false,
        toDoValue : ""
        
    };
    render() {
        const {isCompleted, isEditing, toDoValue } = this.state;
        const { text, id, deleteToDo } = this.props;

        return (
            <View style = {styles.container}>
                <View style= {styles.colum}>
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View 
                            style = {[
                                styles.circle, 
                                isCompleted ? styles.completedCircle : styles.uncompletedCircle
                            ]}>
                        </View>
                    </TouchableOpacity>
                    {isEditing ? (
                        <TextInput 
                            style={[
                                styles.text,
                                styles.input,
                                isCompleted > styles.completedText : styles.uncompletedText
                            ]} 
                            value = {toDoValue}
                            multiline = {true}
                            onChangeText = {this._controllInput}
                            returnKeyType={"done"}
                            onBlur = {this._finishEditing}
                        />
                    ) : (
                        <Text style={[
                            styles.text, 
                            isCompleted ? styles.completedText : styles.uncompletedText]}>
                        {text}
                    </Text>
                    )}
                </View>
                    {isEditing ? (
                        <View style={styles.actions}>
                            <TouchableOpacity onPressOut = {this._finishEditing}>
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
                            <TouchableOpacity onPressOut = {() => deleteToDo(id)}>
                                <View style= {styles.actionConatainer}>
                                    <Text style = {styles.actionText}>
                                        X
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
            </View>
        ); // return
    }
    _toggleComplete = () => { 
        this.setState(prevState => { 
            return({
                isCompleted : !prevState.isCompleted
            });
        }); 
    };
    _startEditing = () => {
        const { text } = this.props;
        this.setState({
            isEditing : true
        });
    }
    _finishEditing = () => {
        this.setState({
            isEditing : false
        })
    }
    _controllInput = (text) => {
        this.setState({
            toDoValue : text
        })
    }
}
const styles = StyleSheet.create({
    container : {
        width : width - 50,
        borderBottomColor : "#bbb",
        borderBottomWidth : StyleSheet.hairlineWidth,
        flexDirection : "row",
        alignItems : "center"
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
    }, 
    actions : {
        flexDirection : "row"
    },
    actionConatainer : {
        marginVertical : 20,
        marginHorizontal : 20 
    },
    input : {
        marginVertical : 20,
        width : width /2
    }
    
});
