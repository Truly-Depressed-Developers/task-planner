import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { FlatList } from "react-native";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { RootStackPropsList } from "../../../App";
import { TaskItem } from "../../components/TaskItem";

type Props = WithTheme<NativeStackScreenProps<RootStackPropsList, "Register">>;

const tasks: Task[] = [
    {
        id: 1,
        title: "Test 1",
        description: "Description jakieś tam testowe",
        date: 69420,
        tag: undefined,
        completed: false
    },
    {
        id: 2,
        title: "Test 2",
        description: "asdasdddasdasdd dasds dsads",
        date: 6662137,
        tag: "Szkoła",
        completed: true
    },
    {
        id: 3,
        title: "Test 69",
        description: "Lorem ipsum dolor sit amet",
        date: 123456789,
        tag: "Nice",
        completed: false
    },
]

const TaskWrapper = (props: Omit<Task, "id">) => {
    return <View style={{ paddingBottom: 8 }}>
        <TaskItem
            title={props.title}
            date={props.date}
            description={props.description}
            tag={props.tag}
            completed={props.completed}
        />
    </View>

}

export default function (props: Props): JSX.Element {
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={tasks}
                keyExtractor={(task) => task.title}
                renderItem={({ item }) =>
                    <TaskWrapper
                        title={item.title}
                        date={item.date}
                        description={item.description}
                        tag={item.tag}
                        completed={item.completed}
                    />
                }
            />
        </View>
    );
}
