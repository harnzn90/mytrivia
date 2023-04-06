import React, { useState,useEffect } from 'react';
import {View, Text, Image} from 'react-native';

import styles from './LeaderBoard.style';

import Btn from '../../components/Btn/Btn';
import database from "@react-native-firebase/database"
import auth from "@react-native-firebase/auth"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const Leaderboard = ({navigation}) => {
  function handleBackToHome() {
    navigation.navigate('Main');
  }

  return (
    <View style={styles.container}>
      <View style={{justifyContent:"space-around",alignItems:"center",flexDirection:"row"}}>
      <Icon name="crown" color="white" size={40} />

      <Text style={{fontSize:40,color:"white"}}>LEADERBOARD</Text>
      <Icon name="crown" color="white" size={40} />
      </View>
      <View style={styles.board_container}>
        <View style={styles.title_container}>
          <Text style={styles.user_title}>User</Text>
          <Text style={styles.category_title}>Category</Text>
          <Text style={styles.score_title}>Score</Text>
        </View>
        <LeadersCard />
      </View>
      <View style={styles.button_container}>
        <Btn text="Back to Home" onPress={handleBackToHome} />
      </View>
    </View>
  );
};

export default Leaderboard;

const LeadersCard = () => {
  const [userResults, setUserResults] = useState([]);

  useEffect(() => {
    // It pulls the users data from the database. It also sorts the scores from highest to lowest.
    database()
      .ref('users/')
      .on('value', snapshot => {
        const data = snapshot.val();
        if (data) {
          const users = Object.values(data)
            .filter(user => user.scores)
            .sort((a, b) => {
              const aMaxScore = Math.max(
                ...Object.values(a.scores).map(score => score.score),
              );
              const bMaxScore = Math.max(
                ...Object.values(b.scores).map(score => score.score),
              );
              return bMaxScore - aMaxScore;
            });
          setUserResults(users);
          console.log(userResults)
        }
      });
  }, []);

  return (
    <View>
      {userResults
        .filter(user => user.scores)
        .map((user, index) => (
          <View style={styles.card_container} key={index}>
            <View style={styles.user_container}>
              {user.image ? (
                <Image
                  style={styles.image}
                  source={{uri: user.image}}
                />
              ) : (
                <Image />
              )}
              <Text style={styles.username}>{user.username}</Text>
            </View>
            {user.scores &&
              Object.values(user.scores).map((score, scoreIndex) => (
                <View style={styles.results_container} key={scoreIndex}>
                  <Text style={styles.category}>{score.category}</Text>
                  <Text style={styles.score}>{score.score}</Text>
                </View>
              ))}
          </View>
        ))}
    </View>
  );
};
