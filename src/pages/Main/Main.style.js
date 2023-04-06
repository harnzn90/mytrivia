import {StyleSheet, Dimensions} from 'react-native';

const deviceSize = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'cornflowerblue',
    padding:5,
  },
  username: {
    fontSize: 30,
    color: 'azure',
    alignSelf: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 15,
  },
  dropdown_container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor:"white"
  },
  placeholder_style: {
    fontSize: 16,
  },
  selected_text_style: {
    fontSize: 16,
    backgroundColor: '#e0e0e0',
    borderBottomLeftRadius: 7,
    borderTopLeftRadius: 7,
    height: 48,
    paddingTop: 13,
    marginLeft: -10,
    marginRight: 10,
    paddingLeft: 10,
  },
  start_button_text: {
    backgroundColor: 'steelblue',
    padding: 12,
    textAlign: 'center',
    borderRadius: 7,
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    marginBottom: 15,
  },
});
