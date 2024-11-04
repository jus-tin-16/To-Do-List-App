import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Octicons from '@expo/vector-icons/Octicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFonts } from "expo-font";
import {  Inter_500Medium, Inter_400Regular } from "@expo-google-fonts/inter";

const Task = ({task, delTask, edit}) => {
    const [fontsLoaded] = useFonts({
        Inter_500Medium,
        Inter_400Regular,
    });

    return (
        <View style={styles.taskContainer}>
            <View style={styles.taskDetails}>
                <Pressable onPress={() => delTask(task)}>
                    <Octicons name="diff-removed" style={styles.removeButton} size={24}/>
                </Pressable>
                <Pressable>
                    <AntDesign name="edit" style={styles.editButton} size={24}/>
                </Pressable>
                <Text style={styles.taskName}>{task.taskName}</Text>
            </View>
            <View style={styles.tags}>
                <View style={styles.pTag}>
                    <Text style={styles.labelTag}>{task.p}</Text>
                </View>
                <View style={styles.sTag}>
                    <Text style={styles.labelTag}>{task.s}</Text>
                </View>
            </View>
        </View>
        
    );
};

const styles = StyleSheet.create({
    taskContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',

        alignItems: 'center',
        backgroundColor: '#FED9B7',
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
    },
    taskDetails: {
        flexDirection: 'row',
    },
    removeButton: {
        color: '#00AFB9',
        marginRight: 10,
    },
    editButton: {
        color: '#00AFB9',
        marginRight: 10,
    },
    taskName: {
        fontFamily: 'Inter_500Medium',
        color: '#F07167',
        fontSize: 20,
    },
    tags: {
        alignItems: 'flex-end',
        width: 150,
    },
    pTag: {
        backgroundColor: '#F07167',
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 5,

    },
    sTag: {
        backgroundColor: '#0081A7',
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    labelTag: {
        fontFamily: 'Inter_400Regular',
        color: '#FDFCDC',
    }
});

export default Task;