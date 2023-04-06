import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: 'cornflowerblue',
    flex:1,
  },
  header_container:{
    flex:2,
    alignItems:"center",
    justifyContent:"center"
  },
  input_container: {
    alignItems:"center",
    flex:1.5,
    
  },
  btn_container: {
    
    flexDirection: 'row',
    flex:1,
    justifyContent:"center"
  },
  scores:{
    flex:2,
    borderWidth:1,
  }
});
