import React from 'react';
import { StyleSheet, 
         Text, 
         View, 
         StatusBar, 
         TextInput,
         Dimensions, 
         Platform,
         ScrollView
        } from 'react-native';
import { AppLoading } from "expo";
import Todo from "./Todo";
import uuidv1 from "uuid/v1";


const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newTodo : "",
    loadedToDos : false,
    toDos : {}
  };
  componentDidMount = () => {
    this._loadToDos();
  }
  render() {
    const { newTodo, loadedToDos, toDos } = this.state;
    console.log(toDos);
    if(!loadedToDos){
      return <AppLoading />
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <Text style={styles.title}> Todo App </Text>
        <View style={styles.card}>
          <TextInput 
            style={styles.input} 
            placeholder={"New To Do"} 
            value ={newTodo} 
            onChangeText={this._controllNewTodo}
            placeholderTextColor = {"#999"}
            returnKeyType = {"done"}
            autoCorrect = {false} 
            onSubmitEditing={this._addToDo}
          />
          <ScrollView contentContainerStyle = {styles.toDos}>
            {Object.values(toDos).map(toDo => (
              <Todo key={toDo.id} {...toDo} 
              deleteToDo = {this._deleteTodo}
              uncompleteToDo = {this._completeToDo}
              completeToDo = {this._uncompleteToDo} 
              {...toDo}/>
            ))}
          </ScrollView>
        </View>
      </View>

    );
  }
  _controllNewTodo = text => {
    this.setState({
      newTodo : text
    });
  }
  _loadToDos = () => {
    this.setState({
      loadedToDos : true
    })
  }
  
  _addToDo = () => {
    const { newTodo } = this.state;
    if(newTodo !== ""){
      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID] : {
            id : ID,
            isCompleted : false,
            text : newTodo,
            createdAt : Date.now()
          }
        };
        const newState = {
          ...prevState,
          newTodo : "",
          toDos : {
            ...prevState.toDos,
            ...newToDoObject
          }
        }
        return {...newState};
      })
    }
  }
  _deleteTodo = (id) => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos
      }
      return {...newState};
    });
  };
  _uncompleteToDo = (id) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos : {
          ...prevState.toDos,
          [id] : {
            ...prevState.toDos[id],
            isCompleted : false
          }
        }
      }
      return  {...newState};
    });
  };
  _completeToDo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState, 
        toDos : {
          ...prevState.toDos,
          [id] : {...prevState.toDos[id], isCompleted : true }
        }
    };
    return {...newState};
    });
  };
} // Class

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center'
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "200",
    marginBottom: 30
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input : {
    padding : 20,
    borderBottomColor : "#bbb",
    borderBottomWidth : 1,
    fontSize : 25
  },
  toDos : {
    alignItems : "center"
  }


});