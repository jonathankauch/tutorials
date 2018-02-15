import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

class Note extends Component {
  render() {
    return (
      <View key={this.props.keyValue} style={styles.note}>
        <View style={styles.noteContent}>
          <Text style={styles.noteText}>{this.props.item.date}</Text>
          <Text style={styles.noteText}>{this.props.item.note}</Text>
        </View>

        <TouchableOpacity onPress={this.props.deleteItem} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>x</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  note: {
    position: 'relative',
    padding: 20,
    paddingRight: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#ade3d1',
  },
  noteContent: {
    borderLeftWidth: 10,
    borderLeftColor: '#79C2BB',
  },
  noteText: {
    paddingLeft: 20,
  },
  deleteButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F08080',
    padding: 5,
    top: 20,
    bottom: 10,
    right: 10,
    borderRadius: 50,
    height: 40,
    width: 40,
  },
  deleteButtonText: {
      color: '#FFF',
  },
});

export default Note;