import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Btn from '../../components/Btn/Btn';
import styles from './Main.style';
import {categories, difficulties, questionTypes} from '../../ModalData';
import {Dropdown} from 'react-native-element-dropdown';
import { showMessage } from 'react-native-flash-message';

const Main = ({navigation}) => {
  const [category, setCategory] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [questionType, setQuestionType] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const currentUser = auth().currentUser.email;
  const newCurrent = currentUser.split('@', 1).toString();
  console.log(newCurrent);

  useEffect(() => {
    database()
      .ref('users/' + newCurrent)
      .on('value', snapshot => {
        const contentData = snapshot.val();
        console.log(contentData);
        setUserInfo(contentData);
      });
  }, []);

  const getQuestions = () => {
    // It pulls data from the API according to the options selected by the user.
    if (!category || !difficulty || !questionType) {
      return;
    }
    const categoryID = category.value;
    const difficultyLevel = difficulty.value;
    const type = questionType.value;
    const amount = 10;
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${categoryID}&difficulty=${difficultyLevel}&type=${type}&encode=url3986`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setQuestions(data.results);

        navigation.navigate('Questions', {
          questions: data.results,
          category,
        });
      })
      .catch(error =>
        showMessage({
          message: 'Something went wrong!',
          type: 'danger',
        }),
      );
  };

  return (
    <View style={styles.container}>
      <View>
        
        <Text style={styles.username}>{userInfo.username}</Text>
        <Image source={{uri: userInfo.image}} style={styles.image} />
      </View>
      <View style={styles.container}>
        <View style={styles.dropdown_container}>
        <Text style={styles.title}>Choose your options</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholder_style}
            selectedTextStyle={styles.selected_text_style}
            label="Category"
            placeholder="Select category"
            labelField="label"
            valueField="value"
            value={category}
            data={categories}
            onChange={item => setCategory(item)}
          />

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholder_style}
            selectedTextStyle={styles.selected_text_style}
            label="Difficulty"
            placeholder="Select difficulty"
            labelField="label"
            valueField="value"
            value={difficulty}
            data={difficulties}
            onChange={item => setDifficulty(item)}
          />

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholder_style}
            selectedTextStyle={styles.selected_text_style}
            label="Type"
            placeholder="Select type"
            labelField="label"
            valueField="value"
            value={questionType}
            data={questionTypes}
            onChange={item => setQuestionType(item)}
          />
        </View>
        <TouchableOpacity onPress={getQuestions}>
          <Text style={styles.start_button_text}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate("LeaderBoard")}}>
          <Text style={styles.start_button_text}>LeaderBoard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main;
