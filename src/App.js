import React from 'react';
import{Route, Switch} from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop_page.component';
import Header from './components/header/header.component';
import Signin_Signup from './pages/signin-signup/signin_signup_page.component';
import {auth, updateUserProfileDoc} from './firebase/firebase.utils';

import './App.css';


const Error=(props)=>{
  console.log(props)
  return(
  <div>
    <h1>This is 404 error page</h1>
  </div>
);
}

class App extends React.Component{
  constructor(){
    super()

    this.state={
      currentUser: null
    }
  }

  unSubscribeFromAuth= null;

  componentDidMount(){
    this.unSubscribeFromAuth= auth.onAuthStateChanged( async userAuth=>{
      if(userAuth){
        const userRef= await updateUserProfileDoc(userAuth)
         userRef.onSnapshot(snapShot=>{
           this.setState({
             currentUser:{
               id:snapShot.id,
               ...snapShot.data()
             }
           }
           )
         });

         console.log(this.state.currentUser)
        
        

      }else{

        this.setState({
          currentUser: userAuth
        })
        
      }
       
      
      
    })
  }

  componentWillUnmount(){
    this.unSubscribeFromAuth();
  }
  render(){

    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        
        <Switch>
          <Route exact  path='/' component={HomePage}/>
          <Route exact path='/shop' component={ShopPage}/>
          <Route exact path='/signup' component ={Signin_Signup}/>
          <Route path='/' component={Error}/>     
  
        </Switch>
      </div>
    )
  }
}

export default App;
