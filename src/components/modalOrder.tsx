import { Theme, useTheme } from "@react-navigation/native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { KeyboardAvoidingView, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import { SortEnum } from "../constants/enumerates";
import { getSortOption } from "../services/storage";

type Props = {
  visible: boolean;
  saveSortOption: (name: string) => void;
  handleModal: (show: boolean) => void;
};

export const ModalOrder: React.FC<Props> = ({visible, saveSortOption, handleModal}) => {
  // Styles
  const inputRef = useRef<TextInput>(null);
  const theme = useTheme()
  const styles = useMemo(() => createStyles(theme), [theme])
  // Options
  
  // Radio options 
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const radioButtons: RadioButtonProps[] = useMemo(() => ([
    {id: "1", label: "Ascendente", value: SortEnum.ASC},
    {id: "2", label: "Descendente", value: SortEnum.DESC},
    {id: "3", label: "Por registro", value: SortEnum.CREATED}
  ]), []);

  // Use Effects
  useEffect(() => {
    loadSelectedOption();
  }, []);
  
  const loadSelectedOption = async () => {
    try{
      const savedOption = await getSortOption();
      if(savedOption != null){
        const saveId = radioButtons.find(button => button.value === savedOption)?.id;
        setSelectedId(saveId);
      }
    }catch(e){
      console.error("load selected option", e);
    }
  }

  //# region Handlers
  async function saveSelected(){
    if(selectedId != null){
      const selectedButton = radioButtons.find(button => button.id === selectedId);
      if(selectedButton?.value != null)
        saveSortOption(selectedButton?.value);
    }
    handleModal(false);
  }
  //# endregion

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      presentationStyle="overFullScreen"
      onShow={() => 
          setTimeout(() => {
            inputRef.current?.focus();
          }, 100)
      }>
      
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <Pressable 
          style={styles.overlay}
          onPress={() => handleModal(false)}
          accessible={false}/>
        <View style={styles.container} pointerEvents="box-none">
            <RadioGroup 
              radioButtons={radioButtons}
              onPress={setSelectedId}
              selectedId={selectedId}
            />
            <TouchableOpacity
            style={styles.button}
            onPress={() => saveSelected()}><Text style={styles.buttonText}>Guardar</Text></TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
    </Modal>
  )
}


const createStyles = (theme:Theme) => StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0, 
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  container: {
    marginHorizontal: 24,
    marginTop: "40%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    elevation: 5, // Android shadow
  },
  content: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: theme.colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
})