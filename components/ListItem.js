import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ListItem = (props) => {
    return (
      <View style = {styles.listItem}>
        <Text style={styles.itemText}>{props.name}</Text>
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
