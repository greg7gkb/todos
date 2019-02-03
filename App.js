import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import ListItem from './components/ListItem';
import { connect } from 'react-redux';
import { addTodo, reorder } from './actions/todos';
import DraggableFlatList from 'react-native-draggable-flatlist'
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

var counter = 0;

class App extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    todos: []
  }

  componentDidMount() {
    if (__DEV__) {
      this.props.add('Annapolis');
      this.props.add('Arkansas');
      this.props.add('Connecticuit');
      this.props.add('Kentucky');
      this.props.add('Missouri');
      this.props.add('Texas');
    }
  }

  todosOutput = () => {
    return (
      <DraggableFlatList
        data = { this.props.todos }
        keyExtractor={(item, index) => {
          return `key-${index}`
        }}
        onMoveEnd={({ data }) => this.props.reorder(data)}
        renderItem = { (info, index, move, moveEnd, isActive) => (
          <ListItem
            name={info.item.value}
            isActive={isActive}
            move={() => {
              console.log('Move started: ' + JSON.stringify(info));
              move;
            }}
            moveEnd={() => {
              console.log('Move finished: ' + JSON.stringify(info));
              moveEnd;
            }}
            />
        )}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Todos</Text>
          <TouchableOpacity onPress={() => {this.addTodo()}}>
            <Icon
              style={[styles.title, {fontSize: 36, marginRight: 12, color: 'blue'}]}
              name="plus-circle"
              />
          </TouchableOpacity>
        </View>

        {/* Output list */}
        { this.todosOutput() }

      </View>
    );
  };

  addTodo() {
    let newTodo = 'Do Stuff_' + counter++;
    this.props.add(newTodo);
  }
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

const mapStateToProps = state => {
  return {
    todos: state.todos.todos
  }
}

const mapDispatchToProps = dispatch => {
  return {
    add: (name) => {
      dispatch(addTodo(name))
    },
    reorder: (data) => {
      dispatch(reorder(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
