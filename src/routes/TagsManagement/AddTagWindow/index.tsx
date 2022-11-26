import * as React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Button, Dialog, Portal, TextInput, withTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { addTag, selectAllLabels } from '../../../store/slices/tagsSlice';

const myHeight = Dimensions.get("window").height

type AddTagWindowProps = WithTheme<{
  visible:boolean,
  onAddTag:()=>void
}>

const AddTagWindow = (props: AddTagWindowProps) => {
  const dispatch = useAppDispatch();
  const tagList = useSelector(selectAllLabels);

  const [name, setName] = React.useState("")
  const submitAddTag = React.useCallback(()=>{
    if(name.length == 0 ||  tagList.find(el => el.name == name)){
      return
    }

    dispatch(addTag(name));
    setName("");
    props.onAddTag();
  },[name, tagList])

  return (
    <Portal>
         <Dialog
            visible={props.visible}
            onDismiss={() => props.onAddTag()}
            theme={props.theme}
         >
            <Dialog.Title theme={props.theme}>Type tag name</Dialog.Title>
            <Dialog.Content style={{ maxHeight: myHeight * 0.5 }}>
                <TextInput
                  label="Name"
                  value={name}
                  onChangeText={name=>setName(name)}
                />
            </Dialog.Content>

            <Dialog.Actions style={{ justifyContent: "space-between" }}>
               <Button color={props.theme.colors.primary} onPress={() => submitAddTag()} disabled={name.length == 0}>Add</Button>
            </Dialog.Actions>
         </Dialog>
      </Portal>
  );
};

export default withTheme(AddTagWindow);

const styles = StyleSheet.create({
  container: {}
});
