import logo from './logo.svg';
import { useState,useEffect } from 'react';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import AuthForm from './auth/AuthForm';
import NewsCards from './components/NewsCards/NewsCards';


function App() {
   
  const [articles, setArticles] = useState([]);
  
useEffect(()=>{
  const API_KEY = '0685d4e340fc4bd08b9682707f9da79a';
  const url = `https://newsapi.org/v2/everything?q=featured&apiKey=${API_KEY}`
  fetch(url)
  .then(response => response.json())
  .then(data => {
   console.log(data)
  // 
   setArticles(data.articles);
    // process the fetched data here
  })
  .catch(error => console.error(error));
  
},[])

    
   
    
   
    
 
    
      // useEffect(() => {
      //   newsapi.v2.topHeadlines({
      //     country: 'in',
          
      //     pageSize: 4,
      //     q: 'featured'
      //   }).then(response => {
      //     setArticles(response.articles);
      //   });
      // }, []);
    
      return (

        <div>
        
    
        <BrowserRouter>
        <Routes>
        
        <Route path="/" element={<AuthForm/>} />
        <Route path="/news" element={ <NewsCards articles={articles}/>} />
       
         
           </Routes>
           </BrowserRouter>
        </div>
      );
    }
    
    export default App;
    



