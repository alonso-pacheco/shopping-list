import { Theme, useTheme } from "@react-navigation/native";
import { useMemo, useRef, useState } from "react";
import { KeyboardAvoidingView, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";


type Props = {
  visible: boolean;
  saveItem: (name: string) => void;
  handleModal: (show: boolean) => void;
};

export const ModalList: React.FC<Props> = ({visible, saveItem, handleModal}) => {

  const [text, setText] = useState("");
  const inputRef = useRef<TextInput>(null);
  const theme = useTheme()
  const styles = useMemo(() => createStyles(theme), [theme])

  //# region Handlers
  async function handleDoneEditing(){
    await saveItem(text);
    await setText("");

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    })
  }
  //# endregion

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      // onRequestClose={() => {handleModal(false)}}
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
            <View style={styles.content}>
            <TextInput
                ref={inputRef}
                placeholder="Ingresar descripción..."
                placeholderTextColor={theme.colors.text}
                value={text}
                onChangeText={setText}
                style={styles.input}
                returnKeyType="done"
                onSubmitEditing={handleDoneEditing}
                blurOnSubmit={false}
            />

            <Pressable
              onPress={() => {
                handleDoneEditing();
              }}
              style={styles.button}
              disabled={text == "" ? true : false}>
                <Text style={{ color: "white" }}>Agregar</Text>
            </Pressable>
            
            </View>
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
    justifyContent: "center",
    alignItems: "center",
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