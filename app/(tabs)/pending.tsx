import { IconSymbol } from '@/components/ui/icon-symbol';
import ShoppingList from '@/src/components/list';
import { ModalList } from '@/src/components/modal';
import { PendingRepository } from '@/src/repository/repository';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';


export default function HomeScreen() {
  const [items, setItems] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const repository = new PendingRepository();


  //#region Data
  useFocusEffect(
    useCallback(() => {
      handlerListPending();
    }, [])
  );

  const handlerListPending = async () => {
    const data = await repository.getAll();
    setItems(data);
  }

  const toggleItem = (id: number, checked: boolean) => {
    checkItem(id, checked);
  };
  //#endregion


  //#region Actions
  const toggleModal = (show: boolean) => {
    setVisible(show);
  }

  const clearItems = async () => {
    await repository.clear();
    handlerListPending();
  }

  const checkItem = async (id:number, checked:boolean) => {

    await repository.check(id, checked);
    handlerListPending();
  }

  const saveItem = async (text: string) => {
    if(text == ""){
      Toast.show({
        type: "error",
        text1: "El texto no puede estar vacío..."
      })
      return;
    }
    await repository.save(text);
    handlerListPending();
  }


  //#endregion
  
  return (
    <SafeAreaProvider>
      <Modal
          visible={visible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => {toggleModal(false)}}>
          <ModalList 
            saveItem={saveItem}
            visible={visible}
            handleModal={toggleModal}/>
      </Modal>

      <View style={styles.container}>
        <Text style={styles.title}>Pendientes</Text>
        <ShoppingList items={items} onToggle={toggleItem} />
      </View>

      <TouchableOpacity style={[styles.floatingButton, styles.floatingButtonTrash]} onPress={() => clearItems()}>
        <IconSymbol name='trash' size={28} color={"#FFF"}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.floatingButton} onPress={() => toggleModal(true)}>
        <IconSymbol name='plus' size={28} color={"#FFF"}/>
      </TouchableOpacity>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  title: {
    margin: 10,
    textAlign: 'center',
    fontSize: 30,
  },
  container: {
    padding: 20,
    paddingTop: 35,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  floatingButton: {
    backgroundColor: "#1581BF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    right: 30,
    elevation: 5, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  floatingButtonTrash: {
    backgroundColor: "#D73535",
    width: 50,
    height: 50,
    bottom: 110,
    right: 35,
  },
});
