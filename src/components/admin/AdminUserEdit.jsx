import {React, useEffect, useState} from 'react'
import { Box, Button, Typography } from "@mui/material";
import MyDatePickerField from "../forms/MyDatePickerField";
import MyTextFields from "../forms/MyTextFields";
import { useForm } from "react-hook-form";
import AxiosInstanace from '../AxiosInstance'
import  Dayjs from "dayjs";
import {useNavigate, useParams} from 'react-router-dom'

const AdminUserEdit = () => {
    const MyParam = useParams()
    const MyId=MyParam.id

    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState({})
        

    const GetData = () => {

        AxiosInstanace.get(`users/${MyId}`).then((res) => {
            console.log(res.data)
            setValue('username', res.data.username)
            setValue('email', res.data.email)
            setValue('role', res.data.role)
            setValue('date_joined', Dayjs(res.data.date_joined))
            setUserData(res.data);
            setLoading(false)
        })
    }
    useEffect(() => {
        GetData();
    }, [])

    const navigate= useNavigate()
    const defaultValues = {
        username: '',
        email: '',
        role: '',
    }
    const { handleSubmit, setValue, control } = useForm({ defaultValues: defaultValues })
    const submission = (data) => //console.log(data)
     {
        const StartDate=Dayjs(data.date_joined["$d"]).format("YYYY-MM-DD")
        AxiosInstanace.put(`users/${MyId}/`,{
            username:data.username,
            email:data.email,
            role:data.role,
            date_joined:StartDate,
        })
        .then(() =>{
            console.log(data)
            navigate(`/AdminManage`)
        })

    } 
    
    const userName = userData?.username || 'Patient'; // Replace with actual patient name

    return (
    <div> {loading ? <p>Loading........</p> :
        <form onSubmit={handleSubmit(submission)}>
            <Box sx={{ display: 'flex', width: '100%', backgroundColor: '#00003f', marginBottom: '10x' }}>
                <Typography sx={{ marginLeft: '20px', color: '#fff' }}>
                    Edit User Records of {userName}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '50px' }}>
                    <MyTextFields
                        label='User Name'
                        name='username'
                        placeholder='Provide User Name'
                        control={control}
                        width={'10%'}
                    />
                    <MyTextFields
                        label='Email'
                        name='email'
                        placeholder='Provide Email'
                        control={control}
                        width={'20%'}
                    />
                    <MyTextFields
                        label='Role'
                        name='role'
                        placeholder='Provide Role'
                        control={control}
                        width={'5%'}
                    />
                    <MyDatePickerField
                        label='Date Joined'
                        name='date_joined'
                        control={control}
                        width={'20%'}
                    />
                </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around' , marginTop:'40px'}}>
                        <Button variant="contained" type="submit" sx={{ width: '30%' }}>
                            Submit
                        </Button>
                    </Box>
            </Box>
        </form> }
    </div>
    )
};

export default AdminUserEdit