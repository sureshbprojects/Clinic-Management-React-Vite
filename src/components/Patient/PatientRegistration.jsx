import '../../App.css'
import { React, useEffect, useState } from 'react'
import { Box, Button, Typography } from "@mui/material";
import MyMultipleLineField from "../forms/MyMultipleLineField";
import MyTextFields from "../forms/MyTextFields";
import { useForm } from "react-hook-form";
import AxiosInstanace from '../AxiosInstance'
import Dayjs from "dayjs";
import { useNavigate, useParams } from 'react-router-dom'
import MyMessage from '../Message';


const PatientRegistration = () => {

    const [ShowMessage, setShowMessage] = useState(false)

    const navigate = useNavigate()
    const defaultValues = {
        name: '',
        address: '',
        phone_number: '',
        emergency_contact: '',
        medical_history: '',
    }
    const { handleSubmit, setValue, control } = useForm({ defaultValues: defaultValues })
    const submission = (data) => //console.log(data)
    {
        AxiosInstanace.post(`patients/`, {
            name: data.name,
            address: data.address,
            phone_number: data.phone_number,
            emergency_contact: data.emergency_contact,
            medical_history: data.medical_history,
        })
            .then(() => {
                console.log(data)
                navigate(`/PatientHome`)
            }).catch(() => {
                setShowMessage(true)
            })
    }


    return (
        <div>
            <Box sx={{ display: 'flex', width: '100%', backgroundColor: '#00003f', marginBottom: '10px' }}>
                <Typography sx={{ marginLeft: '20px', color: '#fff' }}>
                    Patients Registration Details
                </Typography>
            </Box>
            {ShowMessage ? <MyMessage text={"Registration Failed try with different Email"} color={'#EC5A76'} /> : null}
            <form onSubmit={handleSubmit(submission)}>
                <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: 'column' }}>


                    <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '50px' }}>
                        <MyTextFields
                            label='Name'
                            name='name'
                            placeholder='Provide Name'
                            control={control}
                            width={'75%'}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '50px' }}>
                        <MyMultipleLineField
                            label='Address'
                            name='address'
                            placeholder='Provide Address'
                            control={control}
                            width={'75%'}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '50px' }}>
                        <MyTextFields
                            label='Phone Number'
                            name='phone_number'
                            placeholder='Provide Phone Number'
                            control={control}
                            width={'75%'}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '50px' }}>
                        <MyTextFields
                            label='Emergency Contact'
                            name='emergency_contact'
                            placeholder='Provide Emergency Contact'
                            control={control}
                            width={'75%'}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '50px' }}>
                        <MyTextFields
                            label='Medical History'
                            name='medical_history'
                            placeholder='Provide Medical History'
                            control={control}
                            width={'75%'}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '50px' }}>
                        <Button variant="contained" type="submit" sx={{ width: '30%' }}>
                            Submit
                        </Button>
                    </Box>
                </Box>
            </form>
        </div>
    )
};
export default PatientRegistration;