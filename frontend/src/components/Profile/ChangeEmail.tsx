import React, { useState } from 'react'
import CustomActionBtn from '../UI/CustomActionBtn'
import CustomTextField from '../UI/CustomTextField'
import ProfileEditProps from '../../interface/ProfileEditProps'


const ChangeEmail = ({ submitHandler }: ProfileEditProps) => {
    const [email, setEmail] = useState("")
    const [isValidEmail, setIsValidEmail] = useState(true);


    const validateEmail = (email: string): boolean => {
        // Regular expression pattern for email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const enteredEmail = e.target.value;
        setEmail(enteredEmail);
        setIsValidEmail(validateEmail(enteredEmail));
    };


    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <p style={{ fontSize: "20px", fontWeight: 500, margin: 0 }}>更改電子信箱</p>
            <CustomTextField
                id="outlined-basic"
                label={email ? "" : "請輸入電子信箱"}
                value={email}
                onChange={handleEmailChange}
                error={!isValidEmail && email !== ""}
                helperText={!isValidEmail && email !== "" ? "請輸入有效的電子信箱" : ""}
            />
            <CustomActionBtn
                onClick={() => submitHandler({ email: email })}
                disabled={!isValidEmail || email === ''}
                sx={{
                    backgroundColor: "#18CE79",
                }}
                hoverBackgroundColor='#32E48E'
            >
                確認
            </CustomActionBtn>
        </div>
    );
}

export default ChangeEmail
