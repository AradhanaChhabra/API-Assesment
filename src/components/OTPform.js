import React from 'react'
import { useRef } from 'react'
import './otpForm.css'

const OTPform = (prop) => {
    const otpRef = useRef();
    const submitHandler = (event) => {
        event.preventDefault();
        prop.sendOTP(otpRef.current.value);
        prop.validate(otpRef.current.value);
    }
    return (
        <div>
            <form className="otpForm">
            <input
                ref={otpRef}
                type="text"
                maxLength="5"
                placeholder="Enter the OTP"
            />
            <button type="submit" className="submitBtn" onClick={submitHandler}>Verify</button>
            </form>
        </div>
    )
}

export default OTPform
