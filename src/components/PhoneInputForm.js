import React from 'react'
import Dropdown from './Dropdown'
import './PhoneInput.css'
import { useRef } from 'react';
import axios from "axios";

// curl --location --request POST 'https://bmkauth.herokuapp.com/api/v1/user/auth' \
// --header 'Content-Type: application/json' \
// --data-raw '{
//     "phone": "+917895710210"
// }'

const PhoneInputForm = (props) => {
    const phoneRef = useRef();
    const codeRef = useRef();

    async function formSubmitHandler(event){
        event.preventDefault();
        const phoneNo = '+'+codeRef.current.value+phoneRef.current.value ;
        console.log(phoneNo);
        // const response = await fetch("https://bmkauth.herokuapp.com/api/v1/user/auth", {
        //     method: "POST",
        //     mode: 'no-cors',
        //     body: JSON.stringify({ "phone": '+917895710210' }),
        //     header: {
        //         'Content-Type': 'application/json'
        //     }
        // });
        // console.log(response.ok);
        // if (response.ok) {
        //     const data = await response.json();
        //     console.log(data);
        // }
        // else {
        //     console.log("error");
        // }
        
    axios.post(
      '/api/v1/user/auth',
      {
        phone: phoneNo
      },
      {
        headers: {
          "content-type": "application/json"
        }
      }
    ).then((res) => {
        // console.log(res.data.token);
        const value = res.data.token;
        props.sendToken(value);
        console.log(value);
    });
        
    }

    return (
        <div >
            <form className="form">
                <div className="inputs">
                    <select ref={codeRef} form="form">
                        <Dropdown/>
                    </select>
                    <input
                        type="tel"
                        ref={phoneRef}
                        maxLength="10"
                        pattern="[1-9]{1}[0-9]{9}"
                        onChange={telValidator}
                        placeholder="Enter the Phone No."
                    ></input>
                </div>
                
                <button type="submit" className="submitBtn" onClick={formSubmitHandler}>Submit</button>
            </form>
        </div>
    )
}

export default PhoneInputForm
