import {View, Text, Button, Alert} from 'react-native';
import React, {useState} from 'react';
import Input from '../../components/Input/Input';
import styles from './UserInfoScreen.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Btn from '../../components/Btn/Btn';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {launchImageLibrary} from 'react-native-image-picker';

const UserInfoScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const currentUser = auth().currentUser.email.replace('.', ' ');
  const newCurrent = currentUser.split('@', 1).toString();

  const createProfile = async () => {
    if (name == '' || age == '' || height == '' || weight == '' || image=="") {
      Alert.alert('', 'Fill in the information');
    } else {
      try {
        const userInfo = {
          name: name,
          age: age,
          height: height,
          weight: weight,
          photo: image,
        };
        console.log(newCurrent);
        await database()
          .ref('users/' + newCurrent + '/' + 'userInfo/')
          .set(userInfo);
        database()
          .ref()
          .once('value')
          .then(snapshot => {
            console.log('User data: ', snapshot.val());
          });

        navigation.navigate('Home');
      } catch (error) {
        console.log(error);
      }
    }
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

  return (
    <View style={{flex: 1, backgroundColor: 'darksalmon'}}>
      <View style={styles.header_container}>
        <Icon name={'rocket'} size={200} />
      </View>
      <View style={styles.input_container}>
        <Input
          placeholder={'Name Username'}
          onChangeText={text => setName(text)}
        />
        <Input placeholder={'Age'} onChangeText={text => setAge(text)} />
        <Input
          placeholder={'Height cm'}
          onChangeText={text => setHeight(text)}
        />
        <Input
          placeholder={'Weight kg'}
          onChangeText={text => setWeight(text)}
        />
        <View
          style={{
            width: 300,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text>Upload Photo</Text>
          <Icon name="arrow-right-bold" size={50} color="black" />
          <Icon
            name="image-area"
            size={50}
            color="black"
            onPress={ChangePhoto}
          />
        </View>

        <Btn title={'Accept'} onPress={createProfile} />
      </View>
    </View>
  );
};

export default UserInfoScreen;
