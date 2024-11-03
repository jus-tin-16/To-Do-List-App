import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Octicons from '@expo/vector-icons/Octicons';
import { useFonts } from "expo-font";
import {  Inter_500Medium } from "@expo-google-fonts/inter";

const Task = ({task, delTask}) => {
    const [fontsLoaded] = useFonts({
        Inter_500Medium,
    });

    return (
        <View style={styles.taskContainer}>
            <Pressable onPress={() => delTask(task)}>
                <Octicons name="diff-removed" style={styles.removeButton} size={24}/>
            </Pressable>
            <Text style={styles.taskName}>{task}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FED9B7',
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
    },
    removeButton: {
        color: '#00AFB9',
        marginRight: 20,
    },
    taskName: {
        fontFamily: 'Inter_500Medium',
        color: '#F07167',
        fontSize: 20,
    },
});

export default Task;