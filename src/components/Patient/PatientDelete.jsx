import { useEffect, useState } from 'react'
import { Box, Button, Typography } from "@mui/material";
import AxiosInstanace from '../AxiosInstance'
import { useNavigate, useParams } from 'react-router-dom'

const PatientDelete = () => {
    const MyParam = useParams()
    const MyId = MyParam.id

    const [myData, setMyData] = useState()
    const [loading, setLoading] = useState(true)

    const GetData = () => {
        AxiosInstanace.get(`patients/${MyId}`).then((res) => {
            setMyData(res.data)
            console.log(res.data)
            setLoading(false)
        })
    }

    useEffect(() => {
        GetData();
    }, [])

    const navigate = useNavigate()

    const submission = (data) => //console.log(data)
    {
        AxiosInstanace.delete(`patients/${MyId}/`)
            .then(() => {
                console.log(data)
                navigate(`/PatientHome`)
            })

    }
    return (
        <div>
            {loading ? <p>Loading........</p> : <div>
                <Box sx={{ display: 'flex', width: '100%', backgroundColor: '#00003f', marginBottom: '10x' }}>
                    <Typography sx={{ marginLeft: '20px', color: '#fff' }}>
                        Delete Patient : {myData.name}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: 'column' }}>

                    <Box sx={{ display: 'flex', justifyContent: 'start', marginBottom: '40px' }}>
                        Are you sure that you want to delete Patient:{myData.name}
                    </Box>

                    <Box sx={{ width: '30%' }}>
                        <Button variant="contained" onClick={submission} sx={{ width: '100%' }}>
                            Delete the Patient
                        </Button>
                    </Box>
                </Box>
            </div>}
        </div>
    )
}

export default PatientDelete