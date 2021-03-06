import React, { Component } from 'react';
import { StyleSheet,View, T,KeyboardAvoidingView,Text ,Image,Dimensions ,ActivityIndicator, TouchableOpacity} from 'react-native';
import { Form, Item, Input, Label, Button ,Icon } from "native-base";

import * as firebase from "firebase";

const {width: WIDTH}=Dimensions.get('window')

export default class AdminScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:"",
      password:"",
      hidePass:true,
       loading:false
   };
  }

  securePass= ()=>{
    this.setState({hidePass:!this.state.hidePass})
   }
  
  
    signInUser = (email,password)=>{
      if(email=== "" && password===""){
        Alert.alert("Please Enter email and password")
      }
      else{
        this.setState({
          loading:true,
        })
       firebase.auth().
       signInWithEmailAndPassword(email, password)
       .then(authenticate=>{
         this.setState({
           loading:false,
           email:'',
           password:''
         })
          this.props.navigation.replace('Reqscreen')
       })
       .catch(error=>{
          alert(error.message);
       })
      }
    }
  
  render() {
    if(this.state.loading){
      return(
           <View style={styles.loading}>
           <ActivityIndicator size="large" color="#0D0D0D" />
           </View>
         )
     }
     else{
       return (
         <KeyboardAvoidingView
           style={styles.container}
           behavior="position"
           enabled
         >
           <View style={styles.logoContainer}>
           <Text style={styles.adminText}>Welcome Admin!</Text>
           </View>
           <Form style={styles.form}>
             <Item regular style={styles.item}>
               <Input
                 autoCorrect={false}
                 autoCapitalize="none"
                 keyboardType="email-address"
                 placeholder="username"
                 onChangeText={email => this.setState({ email })}
               />
             </Item>
             <Item regular style={styles.item}>
               <Input
                 secureTextEntry={this.state.hidePass}
                 autoCorrect={false}
                 placeholder="Password"
                 autoCapitalize="none"
                 keyboardType="name-phone-pad"
                 onChangeText={password => this.setState({ password })}
               />
               <Icon
                 name={this.state.hidePass?'eye':'eye-off-outline'}
                 size={15}
                 color="grey"
                 onPress={()=>{this.securePass()}}
               />
             </Item>
             <Button
               style={styles.button}
               full
               rounded
               dark
               onPress={() => {
                  this.signInUser(
                     this.state.email,
                     this.state.password
                  )
               }}
             >
               <Text style={styles.buttonText}>Sign in</Text>
             </Button>
           </Form>
         </KeyboardAvoidingView>
       );
     }
     }
   }
   
   
   const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#fff"
      },
      logoContainer: {
        alignItems: "center",
        marginTop: 100,
        marginBottom: 100,
        color: "#fff",
        fontFamily:'Roboto-Light',
        fontSize:16
      },
      item:{
         margin:10,
      },
      form: {
        padding: 20,
        width: "100%",
        marginBottom: 30
      },
      button: {
        justifyContent: 'flex-end',
        marginBottom: 36,
        fontFamily:'Roboto-Light',
        fontSize:16
      },
      buttonText: {
        color: "#fff",
        fontFamily:'Roboto-Light',
        fontSize:16,
        marginRight:150
      },
      footer: {
        alignItems: "center"
      },
      loading: {
        left: 0,
       right: 0,
       top: 0,
       bottom: 0,
       position: 'absolute',
       alignItems: 'center',
       justifyContent: 'center',
       backgroundColor: '#fff'
     }
    });