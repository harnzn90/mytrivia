import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Btn = ({text, width, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'azure',
        width: width,
        borderRadius: 20,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        margin: 10,
        borderWidth:1,
      }}
      onPress={onPress}>
      <Text style={{fontSize:30,fontWeight:"bold"}}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Btn;
