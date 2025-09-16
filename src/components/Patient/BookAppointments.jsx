// src/components/MultipleDateTimePicker.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Alert
} from '@mui/material';
import { useForm } from "react-hook-form";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import DeleteIcon from '@mui/icons-material/Delete';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MySelectFields from '../forms/MySelectFields';
import MySelectField from '../forms/MySelectField';
import MyMessage from '../Message';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import axios from 'axios';
import AxiosInstanace from '../AxiosInstance'
import { useNavigate, useParams } from 'react-router-dom'
// Extend dayjs with UTC and timezone plugins
dayjs.extend(utc);
dayjs.extend(timezone);

// API base URL
const isDevlopment = import.meta.env.MODE === 'development';
const API_BASE_URL = isDevlopment ? import.meta.env.VITE_API_BASE_URL_LOCAL :  import.meta.env.VITE_API_BASE_URL_DEPLOY




const BookAppointments = () => {
  const [selectedDateTimes, setSelectedDateTimes] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(false); // Add this state for patient selection
  const [patientName, setPatientName] = useState(''); // Add this state for patient name
  const [currentDateTime, setCurrentDateTime] = useState(dayjs());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [patientData, setPatientData] = useState();
  const [ShowMessage, setShowMessage] = useState(false);

  const navigate = useNavigate()

  const handlePatientChange = (selectedValue) => {
    console.log('Selected patient ID:', selectedValue);

    // Find the selected patient from patientData array
    const selectedPatient = patientData.find(patient => patient.id === selectedValue);

    if (selectedPatient) {
      // Set the selected patient object which contains both ID and name
      setSelectedPatient(selectedPatient);

      // If you only need the name, you can access it directly:
      const patientName = selectedPatient.name;
      console.log('Patient Name:', patientName);

      // Or if you want to set it in a separate state:
      setPatientName(selectedPatient.name);
    } else {
      // Handle case when patient is not found
      console.log('Patient not found');
      setPatientName('Unknown Patient');
    }
  };

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

  const GetData = () => {
    AxiosInstanace.get(`patients/`).then((res) => {
      setPatientData(res.data);
      console.log("Patient Data:", res.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    GetData();
  }, []);
  const defaultValues = {
    patient_id: '',
    appointment_date: '',
    reason: '',
    doctor_assigned: '',
    patient_name: '',
    status: 'Scheduled'

  }

  const handleAddDateTime = () => {
    if (currentDateTime) {
      // Store the dayjs object
      setSelectedDateTimes([...selectedDateTimes, currentDateTime]);
      setCurrentDateTime(dayjs());
      setError(null);
      setSuccess(null);
    }
  };

  const handleRemoveDateTime = (index) => {
    const newDateTimes = [...selectedDateTimes];
    newDateTimes.splice(index, 1);
    setSelectedDateTimes(newDateTimes);
  };

  const { handleSubmit, control } = useForm({ defaultValues: defaultValues })
  const submission = async (data) => {
    if (selectedDateTimes.length === 0) {
      setError('Please select at least one date and time');
      return;
    }
    const selectedPatient = patientData.find(patient => patient.id === data.patient_id);
    const patientName = selectedPatient ? selectedPatient.name : '';
    setLoading(true);
    setError(null);
    setSuccess(null);
    console.log("Patient ID on submit:", data);
    try {
      // Convert each date to ISO string in IST before sending to backend
      const formattedDateTimes = selectedDateTimes.map(dateTime =>
        dateTime.format()  // This will preserve the local time
      );
      handlePatientChange(data.patient_id);
      // Create FormData object
      const formData = new FormData();
      formData.append('patient_id', data.patient_id);
      formData.append('doctor_assigned', data.doctor_assigned);
      formData.append('reason', data.reason);
      formData.append('patient_name', patientName);
      formData.append('appointment_status', 'Scheduled');


      // Add each datetime as a separate field with the same name
      formattedDateTimes.forEach((formattedDateTime) => {
        if (formattedDateTime && typeof formattedDateTime === 'string') {
          formData.append('dateTimes', formattedDateTime);
        } else {
          console.warn('Invalid datetime format:', formattedDateTime);
        }
      });

      console.log('Sending data (IST):', {
        patient_id: data.patient_id,
        dateTimes: formattedDateTimes,
        reason: data.reason,
        doctor_assigned: data.doctor_assigned,
        patient_name: patientName
      });

      console.log('FormData entries:');
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
      // Send to backend
      const response = await axios.post(`${API_BASE_URL}/appointments/create_appointment/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      setSuccess(`Successfully saved ${selectedDateTimes.length} date times!`);
      console.log('Response:', response.data);

      if (response.status === 200 || response.status === 201) {
        navigate('/Appointments');
      }

      // Refresh the list after successful save
      //fetchDateTimes();
    } catch (error) {
      console.error('Error saving date times:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response:', error.response);
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);

        // Try to parse the HTML error response
        const errorHtml = error.response.data;
        const errorMatch = errorHtml.match(/<pre class="exception_value">(.+?)<\/pre>/);
        const errorMessage = errorMatch ? errorMatch[1] : 'An unknown error occurred';

        alert(`Error: ${errorMessage}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        alert('No response received from server. Please check your connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Request setup error:', error.message);
        alert('Error: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Box sx={{ display: 'flex', width: '100%', backgroundColor: '#00003f', marginBottom: '10px' }}>
        <Typography className={"title"} sx={{ marginLeft: '20px', color: '#fff' }}>
          Book Appointments
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
              <MySelectFields
                label='Name'
                name='patient_id'
                control={control}
                width={'30%'}
                options={patientData}
                onChange={handlePatientChange}
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

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '50px' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Select Date & Time (IST)"
                  value={currentDateTime}
                  onChange={(newValue) => setCurrentDateTime(newValue)}
                  renderInput={(params) => <params.Input />}
                />
              </LocalizationProvider>
              {selectedPatient && (
                <Button
                  variant="contained"
                  onClick={handleAddDateTime}
                  sx={{ mt: 2, ml: 1 }}
                >
                  Add
                </Button>
              )}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '50px', border: '1px solid grey', padding: '20px', borderRadius: '10px', width: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Box > Selected Date & Times (IST): </Box>
              </Box>
              {selectedDateTimes.length === 0 ? (
                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                  <Box> No date times selected yet: </Box>
                </Box>
              ) : (
                <List>
                  {selectedDateTimes.map((dateTime, index) => (
                    <ListItem
                      key={index}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleRemoveDateTime(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemText
                        // Display in IST
                        primary={dateTime.format('MMMM D, YYYY h:mm A')}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '50px' }}>
              {selectedDateTimes.length != 0 && selectedPatient && (
                <Button variant="contained" type="submit" sx={{ width: '30%' }}>
                  {loading ? 'Saving...' : 'Save to Backend'}
                </Button>
              )}
            </Box>
          </Box>
        </form>


      }
    </div>
  )
}

export default BookAppointments;
