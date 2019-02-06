import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import ListItem from './components/ListItem';
import { connect } from 'react-redux';
import { addTodo, removeTodo } from './actions/todos';
import firebase from 'react-native-firebase';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';

var counter = 0;

interface AppProps {
  add: (todo: string) => void;
  remove: (index: number) => void;
  todos: any;
}

class App extends Component<AppProps> {

  constructor(props: any) {
    super(props);
  }

  // Greg: this seems be duplicated in todoReducer.initialState - remove one?
  state = {
    todos: []
  }

  async componentDidMount() {
    if (__DEV__) {
      this.props.add('Wash yer clothes');
      this.props.add('Wash yer self');
      this.props.add('Eat some toast');
      this.props.add('Buy a shoe');
      this.props.add('Drink more water');
      this.props.add('Do more stuff');
    }

    //TODO: You: Do firebase things
    const { user } = await firebase.auth().signInAnonymously();
    console.log('User -> ', user.toJSON())

    // console.log('Logging firebase event...')
    // await firebase.analytics().logEvent('foo', { bar: '123'});
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
    add: (name: string) => {
      dispatch(addTodo(name))
    },
    remove: (index: number) => {
      dispatch(removeTodo(index))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
