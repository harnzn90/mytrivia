import {StyleSheet} from 'react-native';


export default StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    paddingBottom: 70,
  },
  header_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'cornflowerblue',
    padding: 15,
  },
  category: {
    color: 'white',
    fontSize: 15,
    marginLeft: -10,
  },
  second: {
    color: 'white',
    fontSize: 15,
  },
  submit: {
    color: "azure",
    fontSize: 30,
    fontWeight:"bold",
    borderWidth: 1,
    borderColor: "orange",
    borderRadius: 7,
    padding: 5,
    paddingHorizontal: 10,
    marginRight: -5,
  },
  question_text: {
    margin: 15,
    textAlign: 'center',
    flex: 1,
    fontWeight: '500',
    fontSize: 20,
    color: 'white',
  },
  answers_container: {
    marginBottom: 10,
  },
  answers_text: {
    margin: 5,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: 'cornflowerblue',
    borderRadius: 7,
    padding: 10,
    paddingLeft: 10,
    color: 'white',
  },
  correct_answer: {
    backgroundColor: 'green',
  },
  incorrect_answer: {
    backgroundColor: 'red',
  },
});