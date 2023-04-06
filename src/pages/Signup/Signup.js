import {View, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import styles from './Signup.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Input from '../../components/Input/Input';
import Btn from '../../components/Btn/Btn';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Signup = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');

  const handleSignup = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
  
      await database().ref(`users/deneme`).set({
        // It sends the username entered during registration to the database.
        username: "DENEME",
      });
      navigation.navigate('Profile');
    
      
    } catch (err) {
     console.log(err)  
    }
    
  }
  return (
    <View style={styles.container}>
      
      <View style={styles.header_container}>
        <Icon name="rocket" color="azure" size={200} />
      </View>
      <View style={styles.input_container}>
     
        <Input
          placeholder={'E mail'}
          width={400}
          onChangeText={text => setEmail(text)}
        />
        <Input
          placeholder={'Password'}
          width={400}
          onChangeText={text => setPassword(text)}
        />
        <Input
          placeholder={'rePassword'}
          width={400}
          onChangeText={text => setRepassword(text)}
        />
      </View>
      <View style={styles.btn_container}>
        <Btn text={'Sign Up'} width={120} onPress={handleSignup} />
      </View>
    </View>
  );
};

export default Signup;
