import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ListItem = (props) => {
    return (
      <View style = {
        [styles.listItem,
        {backgroundColor: props.isActive ? 'lightblue' : 'transparent'}]
        }>
        <Text style={styles.itemText}>{props.placeName}</Text>
        <TouchableOpacity
          onPressIn={props.move}
          onLongPress={props.move}
          onPressOut={props.moveEnd}
          >
          <Image style={styles.itemImg} source={require('../img/hammy.png')}/>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
    marginHorizontal: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#bbb',
  },
  itemText: {
    color: '#000',
    fontSize: 24,
  },
  itemImg: {
    width: 36,
    height: 36,
  },
});

export default ListItem;
