// src/components/MultipleDateTimePicker.jsx
import React, { useState, useEffect, useMemo } from 'react';
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,

} from '@mui/material';
import { useForm } from "react-hook-form";
import MyMessage from '../Message';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import axios from 'axios';
import AxiosInstanace from '../AxiosInstance'
import { MaterialReactTable } from 'material-react-table';
import {Link} from 'react-router-dom'
import { Edit as EditIcon, Delete as DeleteIcon, } from '@mui/icons-material';

// Extend dayjs with UTC and timezone plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const isDevlopment = import.meta.env.MODE === 'development';
const API_BASE_URL = isDevlopment ? import.meta.env.VITE_API_BASE_URL_LOCAL :  import.meta.env.VITE_API_BASE_URL_DEPLOY





const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'patient_name', //normal accessorKey
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'reason', //access nested data with dot notation
        header: 'Session',
        size: 150,
      },
      {
        accessorKey: 'doctor_assigned', //access nested data with dot notation
        header: 'Therapist',
        size: 150,
      },
      {
        accessorKey: 'appointmentDateOnly', //access nested data with dot notation
        header: 'Date',
        size: 150,
        Cell: ({ cell }) => dayjs(cell.getValue()).format('MM/DD/YYYY')
      },
      {
        accessorKey: 'appointmentTimeOnly', //access nested data with dot notation
        header: 'Time',
        size: 150,
        Cell: ({ cell }) => cell.getValue()
      },
      {
        accessorKey: 'appointmentStatus', //access nested data with dot notation
        header: 'Status',
        size: 150,
      }
    ],
    [],
  );

  // Function to fetch existing date times from the backend in IST
  const fetchDateTimes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/appointments/get_appointments/`);

      // Convert the ISO strings to dayjs objects in IST
      const processedAppointments = response.data.map(item => {
        // Create a dayjs object from the string
        const appointmentDate = item.datetime ? dayjs.utc(item.datetime) : null;
        const createdDate = item.created_at ? dayjs.utc(item.created_at) : null;
        const id = item.id;
        const patient_id = item.patient_id;
        const doctor_assigned = item.doctor_assigned;
        const reason = item.reason;
        const patient_name = item.patient_name;
        const appointmentStatus = item.appointment_status;

        // Log the parsed date before conversion
        //console.log('Parsed date (local):', date.format());

        // Convert to IST using the timezone plugin
        const istAppointmentDate = appointmentDate ? appointmentDate.tz('Asia/Kolkata', true) : null;
        const istCreatedDate = createdDate ? createdDate.tz('Asia/Kolkata', true) : null;

        const appointmentDateOnly = istAppointmentDate ? istAppointmentDate.format('MM/DD/YYYY') : null;
        const appointmentTimeOnly = istAppointmentDate ? istAppointmentDate.format('hh:mm A') : null;
        return {
          id,
          patient_id,
          reason,
          doctor_assigned,
          appointmentDate: istAppointmentDate,
          appointmentDateOnly,
          appointmentTimeOnly,
          createdDate: istCreatedDate,
          patient_name,
          appointmentStatus
        };
      });

      setAppointments(processedAppointments);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching date times:', error);
      setError('Failed to load existing date times');
    }
  };

  // Fetch date times when component mounts
  useEffect(() => {
    fetchDateTimes();
    setLoading(false);
  }, []);


  return (
    <div>
      <Box sx={{ display: 'flex', width: '100%', backgroundColor: '#00003f', marginBottom: '10px' }}>
        <Typography sx={{ marginLeft: '20px', color: '#fff' }}>
          Patients Apointment Details
        </Typography>
      </Box>
      {loading ? <p>Loading........</p> :
        <MaterialReactTable
          columns={columns}
          data={appointments}
          enableRowActions
          renderRowActions={({ row }) => (
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
              <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                <IconButton color="secondary" component={Link} to={`/appointmentsedit/${row.original.id}`}>
                  <EditIcon />
                </IconButton>

                <IconButton color="error" component={Link} to={`/appointmentdelete/${row.original.id}`}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          )}
        />}
    </div>
  )
}

export default Appointments;
