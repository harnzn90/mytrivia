import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {showMessage} from 'react-native-flash-message';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './Result.style';

const Result = ({route, navigation}) => {
  const {numCorrectAnswers, selectedCategory} = route.params;

  const score = numCorrectAnswers * 10;

  const handleShareScore = () => {
    // Function that performs the score sharing.
    const currentUser = auth().currentUser.email.replace('.', ' ');
  const newCurrent = currentUser.split('@', 1).toString();
    const scoreRef = database().ref(`/users/${newCurrent}/scores`);
    const newScore = {
      score: score,
      category: selectedCategory.label,
    };
    scoreRef.push(newScore);
    showMessage({
      message: 'Score shared!',
      type: 'success',
    });
  };

  function handleLeaderboard() {
    navigation.navigate('LeaderBoard');
  }

  function handleBackHome() {
    navigation.navigate('Main');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Text style={styles.header_text}>RESULTS</Text>
      </View>
      <View style={styles.results_container}>
        <Text style={styles.category}>Category: {selectedCategory.label}</Text>
        <Text style={styles.score}>Score: {score}</Text>
      </View>
      {score >= 50 ? (
        <Text style={styles.success_text}>Congratulations</Text>
      ) : (
        <Text style={styles.fail_text}>Sorry, next time..</Text>
      )}
      
      <View style={styles.iconAndbutton_container}>
        <TouchableOpacity onPress={handleShareScore}>
          <Icon
            style={styles.share_icon}
            name="share"
            size={35}
            color="#e0e0e0"
          />
          <Text style={styles.button_text}>Share Score</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLeaderboard}>
          <Icon
            style={styles.leaderboard_icon}
            name="graduation-cap"
            size={35}
            color="#e0e0e0"
          />
          <Text style={styles.button_text}>Leaderboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleBackHome}>
          <Icon
            style={styles.home_icon}
            name="home"
            size={35}
            color="#e0e0e0"
          />
          <Text style={styles.button_text}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Result;