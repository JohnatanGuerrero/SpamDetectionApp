import './App.scss';
import {useState} from 'react';
import hero from './images/FAQ.svg'
import logo from './images/logo.svg'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function App() {
  const [percentage, setPercentage] = useState(0);

  function getRandom(min, max) {
    return Math. trunc(Math.random() * (max - min) + min);
  }
  function handleSubmit(e){
    e.preventDefault();
    setPercentage(getRandom(0, 100));
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
            <span><b>Unispamify</b> is an application based on machine learning algorithms to <br/> predict whether an email is spam or not.</span>
            <button>Try yourself</button>
          </div>
        </div>
        <form className='form' onSubmit={handleSubmit}>
          <label>To get started, enter the email</label>
          <textarea type='text' placeholder='Please write the email' cols="40" rows="5"></textarea>
          <button>Check email</button>
        </form>
        <div className='report'>
          <CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles({textColor: '#E63946',trailColor: '#457B9D', pathColor:'#1D3557'})}/>
          <div className='report__data'>
            <span>Your email is <span>spam</span></span>
            <span>with a {percentage}% chance</span>
          </div>
        </div>
      </main>
    <footer>
      <small>Built by Jonathan Guerrero, Cristian Murcia and Carlos Verano for educational purposess</small>
    </footer>
    </div>
  );
}

export default App;
