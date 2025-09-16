import '../App.css'
import {React, useState} from 'react'
import { Box } from '@mui/material'
import MyTextField from './forms/MyTextField'
import MyPassField from './forms/MyPassField'
import MyButton from './forms/MyButton'
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import AxiosInstance from './AxiosInstance'
import { useNavigate } from 'react-router-dom'
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import MyMessage from './Message'



const Register = () =>{
    const navigate = useNavigate()

    const schema = yup
    .object({
        email: yup.string().email('Field expects an email adress').required('Email is a required field'),
        password: yup.string()
                    .required('Password is a required field')
                    .min(8,'Password must be at least 8 characters')
                    .matches(/[A-Z]/,'Password must contain at least one uppercase letter')
                    .matches(/[a-z]/,'Password must contain at least one lower case letter')
                    .matches(/[0-9]/,'Password must contain at least one number')
                    .matches(/[!@#$%^&*(),.?":;{}|<>+]/, 'Password must contain at least one special character'),
        password2: yup.string().required('Password confirmation is a required field')
                     .oneOf([yup.ref('password'),null], 'Passwords must match')

    })  

    const {handleSubmit, control} = useForm({resolver: yupResolver(schema)})
    const [ShowMessage, setShowMessage] = useState(false)
    const submission = (data) => {
        AxiosInstance.post(`register/`,{
            email: data.email, 
            password: data.password,
            username: data.username,
        })
        .then((response) => {
            console.log(response.data)
            navigate(`/`)
        })
        .catch(() => {
            setShowMessage(true)
        })
    }

    return(
        <div className={"myBackground"}> 
            {ShowMessage ? <MyMessage text={"Registration Failed try with different Email"} color={'#EC5A76'}/> : null}
            <form onSubmit={handleSubmit(submission)}>
                
            <Box className={"whiteBox"}>

                <Box className={"itemBox"}>
                    <Box className={"title"}> User registration </Box>
                </Box>

                <Box className={"itemBox"}>
                    <MyTextField
                    label={"Name"}
                    name ={"username"}
                    control={control}
                    />
                </Box>

                <Box className={"itemBox"}>
                    <MyTextField
                    label={"Email"}
                    name ={"email"}
                    control={control}
                    />
                </Box>

                <Box className={"itemBox"}>
                    <MyPassField
                    label={"Password"}
                    name={"password"}
                    control={control}
                    fieldId={"pass1"}
                    />
                </Box>

                <Box className={"itemBox"}>
                    <MyPassField
                    label={"Confirm password"}
                    name={"password2"}
                    control={control}
                    fieldId={"pass2"}
                    />
                </Box>

                <Box className={"itemBox"}>
                    <MyButton 
                        type={"submit"}
                        label={"Register"}
                    />
                </Box>

                <Box className={"itemBox"}>
                    <Link to="/"> Already registered? Please login! </Link>
                </Box>


            </Box>

            </form> 
            
        </div>
    )

}

export default Register