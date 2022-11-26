import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { FAB, withTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootStackPropsList } from '../../../App';
import { selectAllLabels } from '../../store/slices/tagsSlice';
import AddTagWindow from './AddTagWindow';
import TagItem from './TagItem';

type TagsManagementProps = WithTheme<NativeStackScreenProps<RootStackPropsList, "Tags">>;

const TagsManagement = (props: TagsManagementProps) => {
  const tagList = useSelector(selectAllLabels);
  const [addTagWindowVisible, setAddTagWindowVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      <FlatList
        data={tagList}
        keyExtractor={(tag) => tag.id.toString()}
        renderItem={({ item }) => (
          <TagItem id={item.id} name={item.name} />
        )}
        style={styles.tagContainer}
      />
      <FAB icon={'plus'} style={styles.fab} onPress={()=>{
        setAddTagWindowVisible(true)
      }} />

      <AddTagWindow
        visible={addTagWindowVisible}
        onAddTag={() => {
          setAddTagWindowVisible(false);
        }}
      />
    </View>
  );
};

export default withTheme(TagsManagement);

const styles = StyleSheet.create({
  container: {
    //display: "flex",
    //flexDirection: "column",
    // justifyContent: "center",
    //alignItems:"center",
    // width:"100%",
    flex: 1,
    //backgroundColor:"black"
    // bac
    position: "relative"
  },
  text: {
    textAlign: 'center',
  },
  tagContainer: {
    marginTop: 0,
    width: "100%",
    paddingHorizontal: 30,
    paddingVertical:15,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  }
});
