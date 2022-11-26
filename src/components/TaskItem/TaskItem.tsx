import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Checkbox, Paragraph, Text } from "react-native-paper";
import { Button } from "react-native-paper";
import { RootStackPropsList } from "../../../App";
import AntDesign from '@expo/vector-icons/AntDesign';

type Props = WithTheme<Omit<Task, "id">>;
const iconSize = 16;

export default function (props: Props): JSX.Element {
    const [completed, setCompleted] = useState(props.completed);

    return (
        <View style={styles.task}>
            <View style={styles.left}>
                <Checkbox
                    status={completed ? "checked" : "unchecked"}
                    onPress={() => { setCompleted(!completed) }}
                />
            </View>
            <View style={styles.right}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.desc}>{props.description}</Text>
                <Text style={styles.date}><AntDesign name="calendar" size={iconSize} color={props.theme.colors.text} /> {new Date(props.date).toDateString()}</Text>
                {props.tag &&
                    <Text><AntDesign name="tag" size={iconSize} color={props.theme.colors.text} /> {props.tag}</Text>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    task: {
        flex: 1,
        flexDirection: "row",
        padding: 8,
        backgroundColor: "#dddddd"
    },
    left: {
        paddingRight: 12,
        flex: 0,
        justifyContent: "center"
    },
    right: {
        flex: 1,
        flexBasis: "auto",
        flexDirection: "column"
    },
    title: {
        fontSize: 18,
        marginBottom: 4
    },
    desc: {
        marginBottom: 12
    },
    date: {
        marginBottom: 4
    }
});
