import {StyleSheet, Dimensions} from 'react-native';


const deviceSize = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'cornflowerblue',
  },
  card_container:{
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#a6a6a6',
    padding: 10,
    margin: 2,
    marginHorizontal: 5,
  },
  header_image: {
    height: 100,
    width: deviceSize.width / 1.3,
    alignSelf: 'center',
    marginTop: -50,
    marginBottom: 5,
  },
  board_container: {
    margin: 10,
    borderRadius: 7,
    height: deviceSize.height / 1.7,
    backgroundColor: '#a6a6a6',
  },
  title_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    paddingBottom: 15,
    backgroundColor: "orange",
    borderTopRightRadius: 7,
    borderTopLeftRadius: 7,
  },
  user_title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 35,
    color: "blue",
  },
  category_title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 20,
    color: "blue",
  },
  score_title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 20,
    color: "blue",
  },
  button_container: {
    alignItems: 'center',
    marginTop: 10,
  },
  user_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: -15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'black',
  },
  username: {
    marginLeft: 15,
    fontSize: 15,
    fontWeight: 'bold',
    color: "blue",
  },
  results_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  category: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    color: "blue",
  },
  score: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 30,
    color: "white",
  },
});