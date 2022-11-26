import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { Button, FAB } from "react-native-paper";
import { RootStackPropsList } from "../../../App";
import { TaskItem } from "../../components/TaskItem";

import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { deleteAllTasks, selectTasks } from '../../store/slices/tasksSlice';

type Props = WithTheme<NativeStackScreenProps<RootStackPropsList, "All tasks">>;

const TaskWrapper = (props: Task) => {
    return <View style={{ paddingBottom: 8 }}>
        <TaskItem
            id={props.id}
            title={props.title}
            date={props.date}
            description={props.description}
            tag={props.tag}
            completed={props.completed}
        />
    </View>

}

export default function (props: Props): JSX.Element {
    const tasks = useAppSelector(selectTasks);
    const dispatch = useAppDispatch();

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={tasks}
                keyExtractor={(task) => task.id.toString()}
                renderItem={({ item }) =>
                    <TaskWrapper
                        id={item.id}
                        title={item.title}
                        date={item.date}
                        description={item.description}
                        tag={item.tag}
                        completed={item.completed}
                    />
                }
            />

            <FAB
                style={styles.fab}
                icon={"plus"}
                onPress={() => { props.navigation.navigate("Add task") }}
            />
            <FAB
                style={styles.fab2}
                icon={"delete"}
                onPress={() => { dispatch(deleteAllTasks()) }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    fab2: {
        position: 'absolute',
        margin: 16,
        left: 0,
        bottom: 0,
    }
});