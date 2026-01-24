import { IconSymbol } from '@/components/ui/icon-symbol';
import ShoppingList from '@/src/components/list';
import { ModalList } from '@/src/components/modal';
import { ShoppingRepository } from '@/src/repository/repository';
import { Theme, useTheme } from '@react-navigation/native';
import { useFocusEffect } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';


export default function HomeScreen() {
  const [items, setItems] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const repository = new ShoppingRepository();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme])


  //#region Data
  useFocusEffect(
    useCallback(() => {
      handlerListShopping();
    }, [])
  );

  const handlerListShopping = async () => {
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
    if(items.length <= 0){
      Toast.show({
        type: "info",
        text1: "No hay registros a eliminar...",
      })
      return
    } else if(items.filter(i => i.checked == true).length == 0){
      Toast.show({
        type: "info",
        text1: "No hay registros seleccionados...",
      })
    }
    await repository.clear();
    handlerListShopping();
  }

  const checkItem = async (id:number, checked:boolean) => {

    await repository.check(id, checked);
    handlerListShopping();
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
    handlerListShopping();
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
        <Text style={styles.title}>Compras</Text>
        <ShoppingList
          items={items}
          imgName="order"
          onToggle={toggleItem} />
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

const createStyles = (theme: Theme) => StyleSheet.create({
  title: {
    padding: 10,
    textAlign: 'center',
    fontSize: 30,
    color: theme.colors.text
  },
  container: {
    padding: 20,
    paddingTop: 35,
    backgroundColor: theme.colors.background
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    color: theme.colors.text
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
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
