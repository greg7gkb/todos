import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import ListItem from './components/ListItem';
import { connect } from 'react-redux';
import { addTodo, removeTodo } from './actions/todos';
import firebase, { RNFirebase } from 'react-native-firebase';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { any } from 'prop-types';
require ('json-circular-stringify');

var counter = 0;
var docRef: any;

interface AppProps {
  add: (value: string, key?: number) => void;
  remove: (index: number) => void;
  todos: any;
}

class App extends Component<AppProps> {

  private fb: RNFirebase.firestore.CollectionReference;
  private unsubscribe: any; // GKB: How to properly define type?

  constructor(props: any) {
    super(props);
    this.fb = firebase.firestore().collection('todos');
  }

  async componentDidMount() {
    const { user } = await firebase.auth().signInAnonymously();
    console.log('User -> ', user.toJSON());
    docRef = this.fb.doc(user.uid);

    this.unsubscribe = docRef.onSnapshot(this.onCollectionUpdate);
  }

  unsubscribeFbListeners() {
    console.log('unsubscribing to firestore');
    this.unsubscribe();
    this.unsubscribe = null;
  }

  componentWillUnmount() {
    this.unsubscribeFbListeners();
  }

  onCollectionUpdate = (querySnapshot: any) => {
    this.unsubscribeFbListeners(); // Load once then ignore any further updates

    console.log('querySnapshot: ' + JSON.stringify(querySnapshot));
    for (let t of querySnapshot._data.todos) {
      console.log('todo: ' + JSON.stringify(t));
      this.props.add(t.value, t.key);
    }
  }

  todosOutput = () => {
    return (
      <FlatList
        data = { this.props.todos }
        keyExtractor={(item, index) => {
          return `key-${index}`
        }}
        renderItem = { (info: any) => {
          return (
            <ListItem
              name={info.item.value}
              action={() => {this.props.remove(info.index)}}
              />
        )}}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Todos</Text>
          <TouchableOpacity onPress={() => {
              let newTodo = 'Do Stuff_' + counter++;
              this.props.add(newTodo);
            }}>
            <Icon
              style={[styles.title, {fontSize: 36, marginRight: 4, color: 'green'}]}
              name="plus-circle"
              />
          </TouchableOpacity>
        </View>

        {/* Output list */}
        { this.todosOutput() }

      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#000',
    fontSize: 44,
    padding: 10,
  },
});

const mapStateToProps = (state: any) => {
  return {
    todos: state.todos.todos
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    add: (value: string, key?: number) => {
      dispatch(addTodo(value, key))
    },
    remove: (index: number) => {
      dispatch(removeTodo(index))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
