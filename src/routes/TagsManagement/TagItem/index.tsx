import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, withTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootStackPropsList } from '../../../../App';
import { removeTag, selectAllLabels } from '../../../store/slices/tagsSlice';
import { Feather } from '@expo/vector-icons';
import { useAppDispatch } from '../../../hooks/useAppDispatch';

type TagItemProps = {
   id: number,
   name: string
};

const TagItem = (props: TagItemProps) => {
   const dispatch = useAppDispatch();

   const removeTagCallback = React.useCallback(()=>{
      dispatch(removeTag(props.id))
   },[])

   return (
      <View style={styles.container}>
         <Text style={styles.text}>{props.name}</Text>
         <Button mode={"text"} onPress={() => { removeTagCallback() }}>
            <Feather name="trash" size={24} color="black" />
         </Button>
      </View>
   );
};

export default TagItem;

const styles = StyleSheet.create({
   container: {
      backgroundColor: "#dddddd",
      borderRadius: 10,
      marginBottom: 15,
      paddingVertical: 10,
      display:"flex",
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"flex-end",
      paddingHorizontal:10,
   },
   text: {
      textAlign: 'center',
      color:"black"
   }
});
