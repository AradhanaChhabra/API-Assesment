import './App.css';
import { useState} from 'react';
import PhoneInputForm from './components/PhoneInputForm';
import OTPform from './components/OTPform';
import axios from 'axios';
import SuccessCard from './components/SuccessCard';

function App() {
  const [token, setToken] = useState('hehe');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState('');
  const [verified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);

  // useEffect(() => {
  
    
  // }, [otp]);

  const getToken = (value) => {
    setToken(""+value);
    setShowOTP(true);
  }

  function getOTP(value){
    setOTP( value);
    console.log(token);
    console.log(otp);
  }

  const validateOTP = async(value) => {
    const otpValue = "" + value;
    axios.post('/api/v1/user/otp/validate',
      {
        "otp": otpValue,
        "deviceId": "efgh"
      },
      {
        headers: {
          "content-type": "application/json",
          "token": token
        }
      }
    ).then((res) => {
      if (res.data.message === 'Login Success') {
        setIsVerified(true);
        setError(false);
      }
      // else if (res.data.message === 'Invalid Otp') {
      //   setInvalid(true);
      //   setIsVerified(false);
      //   setError(false);
      // } else {
      //   setInvalid(false);
      //   setIsVerified(false);
      //   setError(true);
      // }
      console.log(res);
    }).catch(({ message }) => {
      console.log(message);
      setError(true);
      setIsVerified(false);
  })
  }

  return (
    <div className="App">
      <h1>Phone Number Verification</h1>
      <h2>Enter Your Phone Number</h2>
      <PhoneInputForm sendToken={getToken} />
      {showOTP && <OTPform sendOTP={getOTP} validate={validateOTP} />}
      {verified && <SuccessCard/>}
      {error && <p style={{ color: "red" }}>Invalid OTP. Please try again.</p>}
    </div>
  );
}

export default App;
