import { useEffect, useState } from 'react'
import { Box, Button, Typography } from "@mui/material";
import AxiosInstanace from '../AxiosInstance'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const AppointmentDelete = () => {
    const MyParam = useParams()
    const MyId = MyParam.id

    const [myData, setMyData] = useState()
    const [loading, setLoading] = useState(true)


    const GetData = () => {
        AxiosInstanace.get(`appointments/${MyId}`).then((res) => {
            setMyData(res.data)
            console.log(res.data)
            setLoading(false)
        })
    }
    useEffect(() => {
        GetData();
    }, [])

        // Format the date for display
    const datetime = dayjs(myData?.datetime).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm')



    const navigate = useNavigate()

    const submission = (data) => //console.log(data)
    {
        AxiosInstanace.delete(`appointments/${MyId}/`)
            .then(() => {
                console.log(data)
                navigate(`/Appointments`)
            })

    }
    return (
        <div>
            {loading ? <p>Loading........</p> : <div>
                <Box sx={{ display: 'flex', width: '100%', backgroundColor: '#00003f', marginBottom: '10x' }}>
                    <Typography sx={{ marginLeft: '20px', color: '#fff' }}>
                        Delete Appointment : {myData.patient_name}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: 'column' }}>

                    <Box sx={{ display: 'flex', justifyContent: 'start', marginBottom: '40px' }}>
                        Are you sure that you want to delete this Appointments :{myData.patient_name} and the date {datetime}
                    </Box>

                    <Box sx={{ width: '30%' }}>
                        <Button variant="contained" onClick={submission} sx={{ width: '100%' }}>
                            Delete the Appointment
                        </Button>
                    </Box>
                </Box>
            </div>}
        </div>
    )
}

export default AppointmentDelete