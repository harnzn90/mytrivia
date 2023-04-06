import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React from 'react';

const Input = ({placeholder, width,onChangeText}) => {
  return (
    <View style={{borderRadius:20,borderWidth:1,backgroundColor:"azure",padding:5,margin:10}}>
        <TextInput onChangeText={onChangeText} placeholder={placeholder} style={{width:width,fontSize:20,}}/>
    </View>
  );
};

export default Input;
