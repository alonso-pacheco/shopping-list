import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { ShoppingDTO } from '../database/models/shopping';


type Props = {
  items: ShoppingDTO[];
  onToggle: (id: number, checked:boolean) => void;
};

const ShoppingList: React.FC<Props> = ({ items, onToggle }) => {
  const renderItem = ({ item }: { item: ShoppingDTO }) => (
    <Pressable
      style={styles.item}
      onPress={() => onToggle(item.id, !item.checked)}
    >
      <View style={[styles.checkbox, item.checked && styles.checked]}>
        <Text style={styles.check}>{ item.checked ? "✓" : ""}</Text>
      </View>

      <Text
        style={[
          styles.text,
          item.checked && styles.textChecked,
        ]}
      >{item.name ?? ""}</Text>
    </Pressable>
  );

  return (
    <View>
    { items.length > 0 ? 
    (
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        keyboardShouldPersistTaps="always"
      />
    ) :
    (
      // <Text style={styles.msgNoData}>Sin registros...</Text>
      <View style={styles.container}>
      <Image 
        style={styles.empty_img}
        source={require("../assets/images/empty.png")} />
      </View>
    )
    }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'center',
    height: '80%',
  },
  msgNoData: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#333',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  check: {
    color: '#fff',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
  textChecked: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  empty_img: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default ShoppingList;
