import './App.scss';
import { useState } from 'react';
import hero from './images/FAQ.svg'
import logo from './images/logo.svg'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import { useForm } from "react-hook-form";





function App() {
  //States
  const [percentage, setPercentage] = useState(0);
  const [spam, setSpam]= useState("not spam");
  const [report, setReport] = useState(false);

  //React hook form
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  //Handle report render


  //Handling form submit - HTTP Request(axios) 
  const onSubmit = data => {
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/predict',
      data: {
        "text": data.text
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(function (response) {
          if(response.data.data.spam){
            setSpam("spam");
            setPercentage(response.data.data.percentage);
          }
          else{
            setSpam("not spam");
            setPercentage(response.data.data.percentage);
          }
          setReport(true);
      })
      .catch(function (response) {
        console.error(response);
      });
  }

  return (
    <div>
      <header>
        <img src={logo}></img>
      </header>
      <main className='wrapper'>
        <div className='hero'>
          <img src={hero}></img>
          <div className='hero__right'>
            <h1>Is my email <span>spam</span>?</h1>
            <span><b>Unispamify</b> is an application based on machine learning algorithms to <br /> predict whether an email is spam or not.</span>
            <button>Try yourself</button>
          </div>
        </div>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          <label>To get started, enter the email</label>
          <textarea
            type='text'
            name='text'
            placeholder='Please write the email'
            cols="40"
            rows="5"
            {...register("text", { required: true })}>
          </textarea>
          <button>Check email</button>
        </form>
        {report &&
        <div className='report'>
          <CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles({ textColor: '#E63946', trailColor: '#457B9D', pathColor: '#1D3557' })} />
          <div className='report__data'>
            <span>Your email is <span>{spam}</span></span>
            <span>with a {percentage}% chance</span>
          </div>
        </div>
        }
      </main>
      <footer>
        <small>Built by Jonathan Guerrero, Cristian Murcia and Carlos Verano for educational purposess</small>
      </footer>
    </div>
  );
}

export default App;
