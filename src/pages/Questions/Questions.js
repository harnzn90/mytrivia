import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';

import styles from './Questions.style';

const QuestionPage = ({route, navigation}) => {
  const {questions, category: selectedCategory} = route.params;
  const [timeLeft, setTimeLeft] = useState(100);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleSelectAnswer = answer => {
    // It checks if the user's selected answer is correct and updates the numCorrectAnswer state if it is.
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.correct_answer) {
      setCorrectAnswers([...correctAnswers, answer]);
      setNumCorrectAnswers(numCorrectAnswers + 1);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  useEffect(() => {
    // It starts a countdown and when the time is up, the user is redirected to the results page with the number of correct answers and the quiz category.
    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
      if (timeLeft === 0) {
        setTimeLeft(0);
        navigation.navigate('Result', {numCorrectAnswers, selectedCategory});
      }
      return;
    }, 1000);
    return () => clearInterval(timer);
  }, [navigation, numCorrectAnswers, selectedCategory, timeLeft]);

  function handleSubmit() {
    navigation.navigate('Result', {numCorrectAnswers, selectedCategory});
  }

  const renderItem = ({item, index}) => {
    return (
      <QuestionCard
        item={item}
        question={item.question}
        correct_answer={item.correct_answer}
        incorrect_answers={item.incorrect_answers}
        questionNumber={index + 1}
        onSelectAnswer={handleSelectAnswer}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Text style={styles.category}>Category : {selectedCategory.label}</Text>
        <Text style={styles.second}>{timeLeft}</Text>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.submit}>Submit</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={questions}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default QuestionPage;


const QuestionCard = ({item, questionNumber, onSelectAnswer}) => {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1);
  const [answers, setAnswers] = useState([]);

  const answerPrefixes = ['A) ', 'B) ', 'C) ', 'D) '];

  useEffect(() => {
    // It mixes the options so that the correct answers are not always on the same line.
    const shuffledAnswers = [
      item.correct_answer,
      ...item.incorrect_answers,
    ].sort(() => Math.random() - 0.5);
    setAnswers(shuffledAnswers);
  }, [item.correct_answer, item.incorrect_answers]);

  const selectedAnswerStyle =
    // Changes the color of the selected answer depending on whether it is true or false.
    selectedAnswerIndex !== -1 &&
    (item.correct_answer === answers[selectedAnswerIndex]
      ? styles.correct_answer
      : styles.incorrect_answer);

  return (
    <View style={styles.container}>
      <View style={styles.question_container}>
        <Text style={styles.question_text}>
          {questionNumber} - {decodeURIComponent(item.question)}
        </Text>
      </View>
      <View style={styles.answers_container}>
        {answers.map((answer, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setSelectedAnswerIndex(index);
              onSelectAnswer(answer);
            }}>
            <Text
              style={[
                styles.answers_text,
                selectedAnswerIndex === index && selectedAnswerStyle,
              ]}>
              {answerPrefixes[index]} {decodeURIComponent(answer)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};