import {View, Text} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Input from '../../components/Input/Input';
import Btn from '../../components/Btn/Btn';
import {launchImageLibrary} from 'react-native-image-picker';
import { showMessage } from 'react-native-flash-message';

const Profile = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [image, setImage] = useState('');

  const handleCreate = () => {
    handleUsername();
    navigation.navigate('Login');
  };

  const ChangePhoto = () => {
    const options = {
      title: 'Titlee',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('user Cancelled');
      } else if (response.errorCode) {
        console.log(errorCode0);
      } else {
        const path = response.assets[0].uri;
        setImage(path);
      }
    });
  };

  const handleUsername = async () => {
    try {
      const currentUser = auth().currentUser.email.replace('.', ' ');
  const newCurrent = currentUser.split('@', 1).toString();
      await database().ref(`users/${newCurrent}`).set({
        // It sends the username entered during registration to the database.
        username: username,
        image:image,
      });
      console.log(auth().currentUser.email)
      showMessage({
        message: 'Account created successfully.',
        type: 'success',
      });
    } catch (err) {
      console.log(err);
      showMessage({
        message: 'Bi sıkıntı var' + err.message,
        type: 'danger',
      });
    }
  };

  return (
    <View style={{backgroundColor:'cornflowerblue',flex:1,padding:10,justifyContent:"center"}}>
      <Input
        placeholder={'Enter Username'}
        onChangeText={text => setUsername(text)}
      />
      <Btn text={'Upload Image'} onPress={ChangePhoto} />
      <Btn text={'Create Profile'} onPress={handleCreate} />
      
    </View>
  );
};

export default Profile;
