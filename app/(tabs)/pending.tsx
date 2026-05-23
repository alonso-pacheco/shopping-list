import { IconSymbol } from '@/components/ui/icon-symbol';
import ShoppingList from '@/src/components/list';
import { ModalList } from '@/src/components/modal';
import { ModalOrder } from '@/src/components/modalOrder';
import { PendingRepository } from '@/src/repository/repository';
import { saveSortOption } from '@/src/services/storage';
import { Theme, useTheme } from '@react-navigation/native';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppState, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';



export default function HomeScreen() {
  const [items, setItems] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [visibleOrder, setVisibleOrder] = useState(false);
  const [updateItem, setUpdateItem] = useState<{id: number, text: string} | null>(null);
  const repository = new PendingRepository();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);


  //#region Data
  const appState = useRef(AppState.currentState);
  const lastUpdate = useRef(0);
  useFocusEffect(
    useCallback(() => {
      safeUpdate();
    }, [])
  );

  useEffect(() => {
    const suscription = AppState.addEventListener('change', nextState => {
      if(appState.current.match(/inactive|background/) && nextState=="active"){
        safeUpdate();
      }

      appState.current = nextState;

    })
    return () => suscription.remove();
  }, [])

  const safeUpdate = useCallback(() => {
    const now = Date.now();

    // Evita llamadas múltiples en corto tiempo
    if (now - lastUpdate.current < 1000) {
      return;
    }

    lastUpdate.current = now;
    handlerListPending();
  }, []);

  const handlerListPending = async (order: string = "") => {
    const data = await repository.getAll(order);
    setItems(data);
  }

  const toggleItem = (id: number, checked: boolean) => {
    checkItem(id, checked);
    setUpdateItem(null);
  };

  //#endregion


  //#region Actions
  const toggleUpdate = (id: number, text: string) => {
    setVisible(true);
    setUpdateItem({id, text});
  }

  const toggleModal = (show: boolean) => {
    setVisible(show);
    setUpdateItem(null);
  }

  const toggleSortModal = (show: boolean) => {
    setVisibleOrder(show)
  }

  const clearItems = async () => {
    if(items.length <= 0){
      Toast.show({
        type: "info",
        text1: "No hay registros seleccionados...",
      })
      return
    }
    await repository.clear();
    handlerListPending();
  }

  const checkItem = async (id:number, checked:boolean) => {

    await repository.check(id, checked);
    handlerListPending();
  }

  const saveItem = async (text: string, id: number = 0) => {
    if(text == ""){
      Toast.show({
        type: "error",
        text1: "El texto no puede estar vacío..."
      })
      return;
    }
    if(id == 0){
      await repository.save(text);
    } else{
      await repository.update(text, id);
      setVisible(false);
      setUpdateItem(null);
    }
    handlerListPending();
  }

  const handlerSortOption = async (value: string) => {
    saveSortOption(value);
    handlerListPending();
    }


  //#endregion
  
  return (
    <SafeAreaProvider>

      <ModalList
        saveItem={saveItem}
        visible={visible}
        handleModal={toggleModal}
        updateData={updateItem}
        />

      <ModalOrder 
        saveSortOption={handlerSortOption}
        visible={visibleOrder}
        handleModal={toggleSortModal}/>

      <View style={styles.container}>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <Text style={styles.title}>Pendientes</Text>
          <TouchableOpacity style={styles.title} onPress={() => toggleSortModal(true)}>
            <IconSymbol name="wind" size={22} color={theme.colors.text}/>
          </TouchableOpacity>
        </View>
        <ShoppingList
          items={items}
          imgName="empty"
          onToggle={toggleItem}
          onToggleUpdate={toggleUpdate}
          />
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

const createStyles = (theme:Theme) =>StyleSheet.create({
  title: {
    margin: 10,
    textAlign: 'center',
    fontSize: 30,
    color: theme.colors.text,
  },
  container: {
    padding: 20,
    paddingTop: 35,
    backgroundColor: theme.colors.background,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    color: theme.colors.text,
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
