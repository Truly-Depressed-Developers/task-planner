import 'react-native-get-random-values';

import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet } from "react-native";
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
import { TextInput, Button, Text } from "react-native-paper"

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

    const disabled = useMemo(() => {
        return !(title.length > 0)
    }, [title]);

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
            <TextInput
                style={styles.input}
                label="Title"
                mode="outlined"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                label='Description'
                mode="outlined"
                value={description}
                onChangeText={setDescription}
            />
            <View
                style={[styles.dropdown, styles.input]}
            >
                <DropDown
                    label={"Tag"}
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
                <Text style={{ fontSize: 16, alignSelf: "center", marginTop: 16 }}>Deadline: {date !== undefined ? niceDate(date.getTime()) : "not set"}</Text>
                <Button
                    mode="text"
                    onPress={() => setDatePickerOpen(true)}
                >Set deadline</Button>
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
                mode="contained"
                disabled={disabled}
                onPress={() => {
                    dispatch(addTask({
                        id: Math.floor(Math.random() * 10000),
                        title: title,
                        description: description,
                        date: date?.getTime() || undefined,
                        tag: tag,
                        completed: false
                    }))

                    resetState();
                    props.navigation.navigate("All tasks");
                }}
            >Add task</Button>
        </View>

    </View>;
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 8
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