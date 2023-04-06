import {View, Text, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './Login.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Input from '../../components/Input/Input';
import Btn from '../../components/Btn/Btn';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {showMessage, hideMessage} from 'react-native-flash-message';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ContentList, setContentList] = useState([]);

  const handlescores = item => <BestScoreListCard ContentList={ContentList} />;

  useEffect(() => {
    database()
      .ref('gamers/')
      .on('value', snapshot => {
        const contentData = snapshot.val();
        const parsedData = ParseContentData(contentData || {});
        setContentList(parsedData);
      });
  }, []);

  const handleLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      console.log('DENEME Login');
      showMessage({
        message: 'Hello World',
        description: 'This is your Hello World Message',
        type: 'success',
      });
      navigation.navigate("Main");
    } catch (err) {
      showMessage({
        message: 'Hata',
        description: err.message,
        type: 'danger',
      });
    }


  };
  const handleSignup = () => {
    console.log('DENEME signup');
    navigation.navigate('Signup');
  };
  return (
    <View style={styles.container}>
      
      <View style={styles.header_container}>
        <Icon name="rocket" color="azure" size={200} />
        <Text style={{fontSize:60,fontWeight:"bold" ,color:"white"}}>myTrivia</Text>
      </View>
      <View style={styles.input_container}>
        <Input
          placeholder={'E mail adresini giriniz...'}
          width={400}
          onChangeText={text => setEmail(text)}
        />
        <Input
          placeholder={'Şifre giriniz...'}
          width={400}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <View style={styles.btn_container}>
        <Btn text={'Login'} onPress={handleLogin} width={120} />
        <Btn text={'Sign Up'} onPress={handleSignup} width={120} />
       
      </View>
    
    </View>
  );
};

export default Login;

function ParseContentData(data) {
  return Object.keys(data)
    .map(key => {
      return {
        id: key,
        ...data[key],
      };
    })
    .sort(function (a, b) {
      return a.date > b.date ? -1 : a.date > b.date ? 1 : 0;
    });
}

const BestScoreListCard = ({item}) => {
  console.log(item);
  return (
    <View>
      <Text>
        {item.username}
      </Text>
    </View>
  );
};
