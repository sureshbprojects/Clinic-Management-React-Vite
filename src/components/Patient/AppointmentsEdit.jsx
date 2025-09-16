// src/components/MultipleDateTimePicker.jsx
import { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Box,
  Alert
} from '@mui/material';
import { useForm } from "react-hook-form";
import MyLabelField from '../forms/MyLabelField';
import MySelectField from '../forms/MySelectField';
import MyMessage from '../Message';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import AxiosInstanace from '../AxiosInstance'
import { useNavigate, useParams } from 'react-router-dom'
import MyDatePickerField from '../forms/MyDatePickerField';
// Extend dayjs with UTC and timezone plugins
dayjs.extend(utc);
dayjs.extend(timezone);

// API base URL
const isDevlopment = import.meta.env.MODE === 'development';
const API_BASE_URL = isDevlopment ? import.meta.env.VITE_API_BASE_URL_LOCAL :  import.meta.env.VITE_API_BASE_URL_DEPLOY


const AppointmentsEdit = () => {
  const MyParam = useParams()
  const MyId = MyParam.id

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [ShowMessage, setShowMessage] = useState(false);
  const [patientData, setPatientData] = useState(null);

  const navigate = useNavigate()

  const Getdata = () => {
    AxiosInstanace.get(`appointments/${MyId}`).then((res) => {
      console.log('Full response:', res);
      console.log('Response data:', res.data);

      // Set other fields first
      setValue('patient_id', res.data?.patient_id || '');
      setValue('doctor_assigned', res.data?.doctor_assigned || '');
      setValue('reason', res.data?.reason || '');
      setValue('patient_name', res.data?.patient_name || '');
      setValue('datetime', dayjs(res.data.datetime, 'YYYY-MM-DD HH:mm:ss.SSS'));
      setValue('appointment_status', res.data?.appointment_status || 'Scheduled');


      setPatientData(res.data);
      setLoading(false);
    });
  }
  useEffect(() => {
    Getdata();
  }, [])

  const hardcoded_appointmentStatus = [
    { id: 'Scheduled', name: 'Scheduled' },
    { id: 'Confirmed', name: 'Confirmed' },
    { id: 'Cancelled', name: 'Cancelled' },
    { id: 'Completed', name: 'Completed' },
    { id: 'Pending', name: 'Pending' },
  ]

  const hardcoded_Sessions = [
    { id: '', name: 'none' },
    { id: 'Speech Therapy', name: 'Speech Therapy' },
    { id: 'Occupational Therapy', name: 'Occupational Therapy' },
    { id: 'Writing Therapy', name: 'Writing Therapy' },
  ]

  const hardcoded_Therapist = [
    { id: '', name: 'none' },
    { id: 'Speech Therapist', name: 'Speech Therapist' },
    { id: 'Occupational Therapist', name: 'Occupational Therapist' },
    { id: 'Writing Therapist', name: 'Writing Therapist' },
  ]

  const defaultValues = {
    patient_id: '',
    datetime: dayjs(),
    reason: '',
    doctor_assigned: '',
    patient_name: '',
    appointment_status: 'Scheduled',
  }

  const { handleSubmit, setValue, control } = useForm({
    defaultValues: {
      datetime: dayjs().utc(), // or your initial date
      appointment_status: 'Scheduled',
    },
  });
const submission = async (data) => {
    try {
        const formattedData = {
            ...data,
            datetime: data.datetime ? data.datetime.format('YYYY-MM-DD HH:mm:ss.SSS') : null,
            appointment_status: data.appointment_status || 'Scheduled'
        };

        console.log('Formatted data:', formattedData);
        
        const response = await AxiosInstanace.put(`appointments/${MyId}/`, formattedData);
        
        console.log('Data successfully updated:', response.data);
        navigate(`/Appointments`);
    } catch (error) {
        console.error('Update error:', error);
        
        // Check if error has a response
        if (error.response) {
            // The request was made and the server responded with a status code
            console.error('Error status:', error.response.status);
            console.error('Error data:', error.response.data);
            
            // Handle different types of error responses
            if (error.response.status === 400) {
                const errorMessage = error.response.data 
                    ? (typeof error.response.data === 'string' 
                        ? error.response.data 
                        : Object.entries(error.response.data)
                            .map(([field, errors]) => `${field}: ${errors}`)
                            .join(', '))
                    : 'Invalid data provided.';
                alert(`Validation Error: ${errorMessage}`);
            } else if (error.response.status === 404) {
                alert('Appointment not found.');
            } else {
                alert(`Error: ${error.response.status} - ${error.response.statusText}`);
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
            alert('No response received from server. Please check your connection.');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Request setup error:', error.message);
            alert('Error: ' + error.message);
        }
        
        setShowMessage(true);
    }
};

  const patientName = patientData?.patient_name || 'Patient';

  return (
    <div>
      <Box sx={{ display: 'flex', width: '100%', backgroundColor: '#00003f', marginBottom: '10px' }}>
        <Typography className={"title"} sx={{ marginLeft: '20px', color: '#fff' }}>
          Edit  {patientName}  Appointment
        </Typography>
      </Box>
      {ShowMessage ? <MyMessage text={"Registration Failed try with different Email"} color={'#EC5A76'} /> : null}
      {loading ? <p>Loading........</p> :

        <form onSubmit={handleSubmit(submission)}>
          <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {success}
                </Alert>
              )}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '50px' }}>
              <MyLabelField
                label='Patient Name'
                name='patient_name'
                control={control}
                width={'30%'}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '50px' }}>
              <MySelectField
                label='Sessions'
                name='reason'
                control={control}
                width={'30%'}
                options={hardcoded_Sessions}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '50px' }}>
              <MySelectField
                label='Therapist'
                name='doctor_assigned'
                control={control}
                width={'30%'}
                options={hardcoded_Therapist}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '50px' }}>
              <MySelectField
                label='Status'
                name='appointment_status'
                control={control}
                width={'30%'}
                options={hardcoded_appointmentStatus}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '50px' }}>
              <MyDatePickerField
                label='Appointment Date'
                name='datetime'
                control={control}
                width={'30%'}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '50px' }}>

              <Button variant="contained" type="submit" sx={{ width: '30%' }}>
                {loading ? 'Saving...' : 'Save to Backend'}
              </Button>

            </Box>
          </Box>
        </form>
      }
    </div>
  )
}

export default AppointmentsEdit;
