import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Modal, TextInput, Button, FlatList, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useFonts } from "expo-font";
import { Inter_700Bold, Inter_200ExtraLight, Inter_900Black, Inter_500Medium, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import Task from './components/Tasks';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);

  // add font
  const [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_200ExtraLight,
    Inter_900Black,
    Inter_500Medium,
    Inter_600SemiBold
  });

  //variable date
  const date = new Date()
 
  //function to add task
  const addTask = () => {
    Keyboard.dismiss();
    setTasks([...tasks, { id: Date.now().toString(), taskName: task, p: value1, s: value2}]);
    setTask('');
    setValue1(null);
    setValue2(null);
  };

  //function to delete task
  const deleteTask = (taskToDelete) => {
    setTasks(tasks.filter(task => task !== taskToDelete));
  };

  //Level of Priority Dropdown
  const priority = [
    { p: 'Level 1', value: 'Level 1' },
    { p: 'Level 2', value: 'Level 2' },
    { p: 'Level 3', value: 'Level 3' },
  ];

  //Status dropdown
  const status = [
    { s: 'Not started', value: 'Not started' },
    { s: 'In progress', value: 'In progress' },
    { s: 'Completed', value: 'Completed' },
    // Add more tags as needed
  ];

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.wrapper}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss()}> {/*Close Keyboard when clicked outside the input*/}
        <Text style={styles.title}>To-Do List App</Text>
        </TouchableWithoutFeedback>
            <View style={styles.listwrapper}>
              <Text style={styles.dateHeading}>{date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</Text> {/*Date today*/}
              <View>
                <FlatList 
                  data={tasks} 
                  renderItem={({ item }) => <Task task={item} delTask={deleteTask} />}  {/*Display list*/}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </View>
          {/*Display Modal*/}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                  <Ionicons name="close" size={32} color="#FED9B7" />
                </Pressable>
                <View>
                  <TextInput
                    style={styles.inputTask}
                    onChangeText={setTask}
                    placeholder='Enter Task Name'
                    value={task}
                  />
                  <Text style={styles.tasklabel}>Task Name</Text>
                </View>
                <View style={styles.tags}>
                  <Text style={styles.labeltags}>Level of Priority</Text>
                  <Dropdown
                    style={styles.dropdown1}
                    data={priority}
                    labelField="p"
                    valueField="value"
                    placeholder="Select"
                    value={value1}
                    onChange={item => {
                      setValue1(item.value);
                    }}
                  />
                </View>
                <View style={styles.tags}>
                  <Text style={styles.labeltags}>Status</Text>
                  <Dropdown
                    style={styles.dropdown2}
                    data={status}
                    labelField="s"
                    valueField="value"
                    placeholder="Select"
                    value={value2}
                    onChange={item => {
                      setValue2(item.value);
                    }}
                  />
                </View>
                <Button title='Add Task' onPress={addTask} backgroundColor={'#00AFB9'}/>
              </View>
            </View>
          </Modal>
          {/*Click to open the modal*/}
          <Pressable 
            style={styles.addtask} 
            onPress={() => setModalVisible(true)}>
            <View style={styles.addbutton}>
              <Ionicons name="add" size={48} color={'#fff'}/>
            </View>
            <Text style={styles.addlabel}>Add Task</Text>
          </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9EB',
  },
  wrapper: {
    flex: 1,
    paddingTop: 50,
    alignItems:  'center',
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 32,
    color: '#F07167',
  },
  listwrapper: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FDFCDC',
    width: 358,
    elevation: 10,
    shadowColor: '#000',
    borderRadius: 10,
  },
  dateHeading: {
    fontFamily: 'Inter_900Black',
    fontSize:  24,
    color: '#00AFB9',
  },
  centeredView: {
    flex: 1,
    padding: 50,
    alignItems: 'center',
  },
  modalView: {
    justifyContent: 'space-between',
    margin: 20,
    width: 358,
    height: 352,
    padding: 15,
    backgroundColor: '#FDFCDC',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    alignItems: 'flex-end',
  },
  inputTask: {
    borderColor: '#0081A7',
    borderBottomWidth: 2.5,
    fontSize: 32,
  },
  tasklabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 24,
    color: '#0081A7',
  },
  tags: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labeltags: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#0081A7',
  },
  dropdown1: {
    height: 30,
    width: 125,
    backgroundColor: '#F07167',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  dropdown2: {
    height: 30,
    width: 125,
    backgroundColor: '#0081A7',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  addbutton: {
    width: 80,
    height: 80,
    backgroundColor: '#00AFB9',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addlabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 18,
    color: '#0081A7',
    padding: 5,
  },
  addtask: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginBottom: 50,
    alignItems: 'center',
  },
});
