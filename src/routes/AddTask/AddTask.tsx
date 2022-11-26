import 'react-native-get-random-values';

import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { RootStackPropsList } from '../../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { Picker } from '@react-native-picker/picker';
import DropDown from 'react-native-paper-dropdown'
// import DatePicker from 'react-native-date-picker'
import {DatePickerModal } from 'react-native-paper-dates'
type Props = WithTheme<NativeStackScreenProps<RootStackPropsList, "Main">>;

import { registerTranslation, en } from 'react-native-paper-dates';
import 'intl';
import 'intl/locale-data/jsonp/en';

registerTranslation('en', en);

// const tags = [
//     "inbox",
//     "to jest tag 1",
//     "to jest tag 2"
// ]

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
    const [title, setTitle] = React.useState(null);
    const [description, setDescription] = React.useState(null);

    // const [date, setDate] = React.useState(new Date())
    // const [datePickerOpen, setDatePickerOpen] = React.useState(false)

    const [date, setDate] = React.useState<Date | undefined>(undefined);
    const [datePickerOpen, setDatePickerOpen] = React.useState(false);


    
    const [tag, setTag] = React.useState("inbox")
    const [tagDropDownOpen, setShowTagDropDown] = React.useState(false);

    function addTask() {
        props.navigation.navigate("Main")
    }

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
      <Button
            title="Set date"
            onPress={() => setDatePickerOpen(true)}
        />
      <DatePickerModal
        locale="en"
        mode="single"
        visible={datePickerOpen}
        onDismiss={onDismissSingle}
        date={date}
        onConfirm={onConfirmSingle}
        // validRange={{
        //   startDate: new Date(2021, 1, 2),  // optional
        //   endDate: new Date(), // optional
        //   disabledDates: [new Date()] // optional
        // }}
        // onChange={} // same props as onConfirm but triggered without confirmed by user
        // saveLabel="Save" // optional
        // saveLabelDisabled={true} // optional, default is false
        // uppercase={false} // optional, default is true
        // label="Select date" // optional
        // animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
        // startYear={2000} // optional, default is 1800
        // endYear={2100} // optional, default is 2200
        // closeIcon="close" // optional, default is "close"
        // editIcon="pencil" // optional, default is "pencil"
        // calendarIcon="calendar" // optional, default is "calendar"
      />
        </View>
        <View
            style={styles.addButton}
        >

        <Button
            title="Add"
            onPress={addTask}
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
        // backgroundColor: 'red',
        // display: 'flex',
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