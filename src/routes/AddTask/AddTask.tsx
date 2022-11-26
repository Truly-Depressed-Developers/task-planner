import 'react-native-get-random-values';

import React, { useCallback, useMemo } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { RootStackPropsList } from '../../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import DropDown from 'react-native-paper-dropdown'
import { DatePickerModal } from 'react-native-paper-dates'
import { registerTranslation, en } from 'react-native-paper-dates';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { selectTasks, addTask } from '../../store/slices/tasksSlice';
import { niceDate } from '../../helpers/niceDate';

type Props = WithTheme<NativeStackScreenProps<RootStackPropsList, "Add task">>;

registerTranslation('en', en);

const tagList = [
    {
        label: "inbox",
        value: "inbox",
    },
    {
        label: "to jest tag 1",
        value: "to jest tag 1",
    },
    {
        label: "to jest tag 2",
        value: "to jest tag 2",
    },
];

export default function (props: Props): JSX.Element {
    const produkty = useAppSelector(selectTasks);
    const dispatch = useAppDispatch();


    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");

    const [date, setDate] = React.useState<Date | undefined>(undefined);
    const [datePickerOpen, setDatePickerOpen] = React.useState(false);

    const [tag, setTag] = React.useState("inbox")
    const [tagDropDownOpen, setShowTagDropDown] = React.useState(false);

    const resetState = useCallback(() => {
        setTitle("");
        setDescription("");
        setTag(tagList[0].value);
        setDate(undefined);
        setDatePickerOpen(false);
        setShowTagDropDown(false);
    }, []);

    // const fun = useCallback(() => {
    //     const produkty = useAppSelector(selectTasks);
    //     console.log(produkty)
    //     }, []); //deps

    // const addTask = () => {
    //     fun()
    //     props.navigation.navigate("Main")

    // }

    const onDismissSingle = React.useCallback(() => {
        setDatePickerOpen(false);
    }, [setDatePickerOpen]);

    const onConfirmSingle = React.useCallback(
        (params) => {
            setDatePickerOpen(false);
            setDate(params.date);
        },
        [setDatePickerOpen, setDate]
    );
    return <View style={styles.container}>
        <View>

            <Text style={[styles.text, styles.title]}>Add task</Text>
            <TextInput
                style={styles.textInput}
                placeholder='Title'
                value={title}
                onChangeText={setTitle}
            />
            <Text style={[styles.text, styles.descriptionText]}>Description</Text>
            <TextInput
                style={styles.textInput}
                value={description}
                onChangeText={setDescription}
            />
            <Text style={[styles.text, styles.descriptionText]}>Tag</Text>
            <View
                style={styles.dropdown}
            >
                <DropDown
                    // label={"Tag"}
                    mode={"outlined"}
                    visible={tagDropDownOpen}
                    showDropDown={() => setShowTagDropDown(true)}
                    onDismiss={() => setShowTagDropDown(false)}
                    value={tag}
                    setValue={setTag}
                    list={tagList}
                />
            </View>
            <View>
                <Text style={{ fontSize: 18, alignSelf: "center" }}>Deadline: {date !== undefined ? niceDate(date.getTime()) : "not set"}</Text>
                <Button
                    title="Set Deadline"
                    onPress={() => setDatePickerOpen(true)}
                />
            </View>
            <DatePickerModal
                locale="en"
                mode="single"
                visible={datePickerOpen}
                onDismiss={onDismissSingle}
                date={date}
                onConfirm={onConfirmSingle}
                label={"Deadline"}
            />
        </View>
        <View
            style={styles.addButton}
        >

            <Button
                title="Add"
                // onPress={addTask}
                onPress={() => {
                    dispatch(addTask({
                        id: Math.floor(Math.random() * 10000),
                        title: title,
                        description: description,
                        date: date.getTime(),
                        tag: tag,
                        completed: false
                    }))

                    resetState();
                    props.navigation.navigate("All tasks");
                }}
            />
        </View>

    </View>;
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: '#dee2e6',
        padding: 10
    },
    text: {
        textAlign: "center",
        marginTop: 16,
    },
    title: {
        marginBottom: 16,
        fontSize: 24
    },
    descriptionText: {
        marginBottom: 8,
        fontSize: 18
    },
    container: {
        flex: 1,
        alignContent: 'space-between',
        justifyContent: 'space-between',
        padding: 20,
    },
    dropdown: {
        marginBottom: 16
    },
    addButton: {
        paddingVertical: 20,
    }
})