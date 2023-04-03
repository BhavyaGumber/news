import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/database"
import styled from "styled-components";
import {GoogleButton} from "react-google-button";
import {GithubButton} from "react-github-login-button";
import { Link } from 'react-router-dom';
import image from "../assets/image.jpg";
// import 'firebase/auth';
import { initializeApp } from 'firebase/app';
import 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@material-ui/core';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtGzT6rrXDBvAgpf_kkc5h594M4MmOQPM",
  authDomain: "news-bee69.firebaseapp.com",
  projectId: "news-bee69",
  storageBucket: "news-bee69.appspot.com",
  messagingSenderId: "170377362495",
  appId: "1:170377362495:web:bc891892c66b402c32cc8a",
  measurementId: "G-P1ZWQLGHX8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const AuthForm = () => {
  const navigate = useNavigate();
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const switchMode = ()=>{
    setIsSignup((prevState)=>!prevState)
  
    }
    const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
    };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
       await firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/news")
        // ...
      })
      .catch((error) => {
        
       
        alert('Error');
      });
    }


  const handleSignUp = async (e) => {
    e.preventDefault();
    if(password!==confirmPassword){
      alert("Passwords do not match")
      return;
    }
    
    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("created");
        // Save user credentials to Realtime Database
        firebase.database().ref(`users/${user.uid}`).set({
          email: email,
          password: password
        });
        navigate("/news");
      })
    
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage)
        alert("error")
      });
  };
  const handleGitHubSignIn = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        // Signed in with GitHub
        const user = result.user;
  
        // Store user data in Firebase Realtime Database
        const db = firebase.database();
        db.ref('users/' + user.uid).set({
          name: user.displayName,
          email: user.email,
          
        
        });
        navigate('/news');
  
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert("Error,May be an account with the same email id already exists!");
      });
  };

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        // Signed in with Google
        const user = result.user;
  
        // Store user data in Firebase Realtime Database
        const db = firebase.database();
        db.ref('users/' + user.uid).set({
          name: user.displayName,
          email: user.email
        });
        navigate('/news');
  
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
   return (
    <Container>
      <Content>
        <ImageContainer src="https://github.com/ManasviPant09/Web-Assignment-React/blob/main/src/assets/image.jpg?raw=true" />
        <TextContainer>
          <Title>Welcome to Bardeen</Title>
          <Body>Let's log in to launch your automations.</Body>
        </TextContainer>
        <Form>
          {isSignup ? (
            <>
              <Input placeholder="Email Address" name="Email Address" type="text" value={email} onChange={handleEmailChange} />
              <Input placeholder="Password" name="password" type="password" value={password} onChange={handlePasswordChange} />
              <Input placeholder="Confirm Password" name="password" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
              <Button style={{marginTop:"10px"}} onClick={handleSignUp}>Sign Up</Button>
              <Typography onClick={switchMode} style={{cursor:"pointer" ,paddingTop:"5px"}}variant="body2">Already have an account? Sign In</Typography>
            </>
          ) : (
            <>
              <Input placeholder="Email Address" name="Email Address" type="email" value={email} onChange={handleEmailChange} />
              <Input placeholder="Password" name="password" type="password" value={password} onChange={handlePasswordChange} />
              <Help>
                <Link onClick={switchMode}>Create Account</Link>
                <Link>Forgot Password?</Link>
              </Help>
              <Button onClick={handleSignIn}>Sign In</Button>
              <GoogleButton
                style={{
                  backgroundColor: "white",
                  color: "#606060",
                  width: "90%",
                  height: "10vh",
                  fontSize: "15px",
                  marginTop: "1px",
                  margin:"auto",
                  borderRadius: "5px",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={handleGoogleSignIn}
              >
                Sign in with Google
              </GoogleButton>
              <GithubButton
                style={{
                  backgroundColor: "white",
                  color: "#606060",
                  width: "90%",
                  height: "10vh",
                  fontSize: "15px",
                  marginTop: "12px",
                  margin:"auto",

                  borderRadius: "5px",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={handleGitHubSignIn}
                type="light"
              >
                Sign in with GitHub
              </GithubButton>
            </>
          )}
        </Form>
      </Content>
    </Container>
  );
  
  
              
}



const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #6a4fb0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media (max-width: 768px) {
    width: 100%;
    height: 100vh;
  }
`;
const Content = styled.div`
  width: 25%;
  height: 90%;
  background: linear-gradient(to top,#aed8f7,white 75%);
  border-radius: 1rem;
  box-shadow: 5px 5px 25px -5px;
  @media (max-width: 768px) {
    width: 80%;
    height: 85%;
  }
`;
const ImageContainer = styled.img`
   width: 50%;
   height: 20vh;
   display: flex;
   margin: 0 25% 0 25%;
   @media (max-width: 768px) { 
    width: 50%;
  }
`;
const TextContainer = styled.div`
  margin-top: 5%;
  margin-bottom: 10%;
  @media (max-width: 768px) { 
    margin: 5% 0 5% -10%;
  }
`;
const Title = styled.h3`
  color: #6249a3;
  margin-bottom: 1%;
  font-size: 100%;
  font-weight: 700;
  @media (max-width: 768px) { 
    width: 100%;
    margin: 0 20px 10px 20px;
  }
`;
const Body = styled.h6`
  font-weight: 500;
  font-size: 0.75rem;
  @media (max-width: 768px) { 
    width: 100%;
    margin: 10px 20px 0px 20px;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) { 
    width: 100%;
    margin-left: 0.75%;
  }
`;
const Input = styled.input`
  flex: 1;
  width: 85%;
  margin: 0 0 5% 7%;
  padding: 3% 1% 3% 1%;
  border: 1px solid #D3D3D3;
  border-radius: 5px;
`;
const Help = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: -4% 8% 10% 8%;
  color: #6249a3;
  @media (max-width: 768px) { 
    margin-right: 10%;
  }
`
const Left = styled.h6`
  display: flex;
  align-items: center; 
  flex : 1;
  font-size: 12px;
`;
const Right = styled.h6`
  display: flex;
  align-items: center;
  justify-content : flex-end;
  flex : 1;
  font-size: 12px;
`;
const Button = styled.button`
  border: none;
  border-radius: 5px;
  margin: -5% 8% 5% 8%;
  padding: 3% 1% 3% 1%;
  background-color: #6a4fb0;
  color: white;
  cursor: pointer;
  width: 84%;
`;
const ButtonContainer = styled.div`
  @media (max-width: 768px) { 
    margin-right: 10%;
}
`;

// const GoogleButton = styled(Button)`
//   margin-top: 0.5em;
//   background-color: white;
//   color: #606060;
// `;

// const GithubButton = styled(GoogleButton)`
//   margin-top: 0.5em;
// `;
export default AuthForm





