import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

const ListItem = (props: any) => {
    return (
      <View style = {styles.listItem}>
        <Text style={styles.itemText}>{props.name}</Text>
        <TouchableOpacity onPress={props.action}>
          <Icon
            style={[styles.itemText, {color: 'red'}]}
            name="minus"
            />
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
});

export default ListItem;
