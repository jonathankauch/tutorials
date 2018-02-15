import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Note from './Note';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [{date: 'asdads', note: 'sadasda'},{date: 'asdads', note: 'sadasda'}],
      value: '',
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.addNote = this.addNote.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  onChangeText(value) {
    this.setState({ value });
  }

  addNote() {
    if (this.state.value) {
      const now = new Date();
      const array = Object.assign([], this.state.notes);
      array.push({
        date: `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`,
        note: this.state.value,
      });

      this.setState({ notes: array, value: '' });
    }
  }

  deleteItem(key) {
    const tmp = this.state.notes;
    tmp.splice(key, 1);
    this.setState({ notes: tmp });
  }

  render() {
    const { notes, value } = this.state;
    const notesList = notes.map((item, key) => {
      return (
        <Note key={key} keyValue={key} item={item} deleteItem={() => this.deleteItem(key)} />
      );
    });

    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headerText}>
            Todo List
          </Text>
        </View>

        <ScrollView style={styles.scrollViewContainer}>
          {notesList}
        </ScrollView>

        <View style={styles.footer}>
          <TextInput
            style={styles.textInput}
            placeholder=">_ Write your note..."
            placeholderTextColor="#FFF"
            onChangeText={this.onChangeText}
            value={value}
          />
        </View>

        <TouchableOpacity style={styles.addButton} onPress={this.addNote}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#ade3d1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#FFF',
    fontSize: 24,
    padding: 25,
    fontWeight: '600',
  },
  scrollViewContainer: {
    flex: 1,
    marginBottom: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  textInput: {
    height: 50,
    fontSize: 18,
    alignSelf: 'stretch',
    color: '#FFF',
    padding: 10,
    backgroundColor: '#ade3d1',
  },
  addButton : {
    position: 'absolute',
    zIndex: 20,
    right: 20,
    bottom: 75,
    backgroundColor:'#ade3d1',
    width: 75,
    height: 75,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addButtonText : {
    color: '#fff',
    fontSize: 24,
  },
});

export default Main;