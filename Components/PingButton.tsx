import React, { useState } from 'react';
import { Image, Text, View, StyleSheet, Animated, Pressable, Modal, TextInput, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:200
  },
  pingButton: {
    position: 'absolute',
    right:'4%',
    bottom:'37%'
  },
  modalView: {
    width:"70%",
    backgroundColor: "#ffffffef",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
  },
  buttonClose: {
    alignSelf:"flex-start"
  },
  buttonPing:{
    backgroundColor: "#70cc32",
    alignSelf:"flex-end"
  },
  textStyle: {

  },
  input: {
    margin: 12,
    padding: 10,
    marginBottom:20,
    borderBottomColor: "#afafaf",
    borderBottomWidth:1
  },
  imagestyle: {
    height:40,
    width:40,
    borderRadius: 5
  }
})


const PingButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [message, onChangeMessage] = useState<string | undefined>();
  
  function onPingSend(){
    onChangeMessage("");
    setModalVisible(!modalVisible)
  };

  function onPingClose(){
    onChangeMessage("");
    setModalVisible(!modalVisible)
  };

  return (
    <View style={styles.pingButton}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.container}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => onPingClose()}
            >
              <AntDesign name="close" size={24} color="black" />
            </Pressable>
            <SafeAreaView>
              <TextInput
                style={styles.input}
                onChangeText={onChangeMessage}
                value={message}
                placeholder="Whats happening?"
                keyboardType="default"
                multiline={true}
              />
            </SafeAreaView>
            <Pressable
              style={[styles.button, styles.buttonPing]}
              onPress={() => onPingSend()}
            >
              <Text style={styles.textStyle}>Ping</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        onPress={() => setModalVisible(true)}
      >
        <Image style={styles.imagestyle} source={require('../assets/icon.png')} />
      </Pressable>
    </View>
  );
}

export default PingButton