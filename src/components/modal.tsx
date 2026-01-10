import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  visible: boolean;
  saveItem: (name: string) => void;
  handleModal: (show: boolean) => void;
};

export const ModalList: React.FC<Props> = ({visible, saveItem, handleModal}) => {

    const [text, setText] = useState("");

    //# region Handlers
    async function handleDoneEditing(){
      await saveItem(text);
      await setText("");
    }
    //# endregion

    return (
        <Pressable 
          onPress={() => handleModal(false)}
          style={styles.overlay}>
          <View style={styles.container}>
              <View style={{
              width: "80%",
              backgroundColor: "white",
              borderRadius: 10,
              padding: 16
              }}>
              <TextInput
                  placeholder="Ingresar descripción..."
                  value={text}
                  onChangeText={setText}
                  autoFocus
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
                  disabled={text == "" ? true : false}
              >
                  <Text style={{ color: "white" }}>Agregar</Text>
              </Pressable>
              </View>
          </View>
        </Pressable>
    )
}


const styles = StyleSheet.create({
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
    alignItems: "center"
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
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