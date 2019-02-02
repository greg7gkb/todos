import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import ListItem from './components/ListItem';
import { connect } from 'react-redux';
import { addPlace } from './actions/place';
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
    placeName: '',
    places: []
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

  placeSubmitHandler = () => {
    if(this.state.placeName.trim() === '') {
      return;
    }
    this.props.add(this.state.placeName);
  }

  placeNameChangeHandler = (value) => {
    this.setState({
      placeName: value
    });
  }

  placesOutput = () => {
    return (
      <DraggableFlatList
        data = { this.props.places }
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        onMoveEnd={({ data }) => this.setState({ data })}
        renderItem = { (info, index, move, moveEnd, isActive) => (
          <ListItem
            placeName={info.item.value}
            isActive={isActive}
            move={move}
            moveEnd={moveEnd}
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
        { this.placesOutput() }

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
    places: state.places.places
  }
}

const mapDispatchToProps = dispatch => {
  return {
    add: (name) => {
      dispatch(addPlace(name))
    },
    reorder: (data) => {
      dispatch(reorder(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
