import { React, useEffect, useMemo, useState } from "react"
import AxiosInstance from '../AxiosInstance'
import { MaterialReactTable } from 'material-react-table';
import dayjs from "dayjs";
import { Box, IconButton,Typography } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, } from '@mui/icons-material';
import {Link} from 'react-router-dom'

const PatientHome = () => {

    const [myData, setMyData] = useState()
    const [loading, setLoading] = useState(true)
    
    const GetData = () => {
        AxiosInstance.get(`patients/`).then((res) => {
            setMyData(res.data)
            console.log(res.data)
            setLoading(false)
        })
    }
    useEffect(() => {
        GetData();
    }, [])

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name', //normal accessorKey
                header: 'Name',
                size: 150,
            },
            {
                accessorKey: 'address', //access nested data with dot notation
                header: 'Address',
                size: 150,
            },
            {
                accessorKey: 'phone_number', //access nested data with dot notation
                header: 'Phone Number',
                size: 150,
            },
            {
                accessorKey: 'emergency_contact', //access nested data with dot notation
                header: 'Emergency Contact',
                size: 150,
            },
            {
                accessorKey: 'medical_history', //access nested data with dot notation
                header: 'Medical History',
                size: 150,
            },
        ],
        [],
    );

    return (
        <div>
            <Box sx={{ display: 'flex', width: '100%', backgroundColor: '#00003f', marginBottom: '10px' }}>
                <Typography sx={{ marginLeft: '20px', color: '#fff' }}>
                    Patients Details
                </Typography>
            </Box>
            {loading ? <p>Loading........</p> :
                
                <MaterialReactTable
                    columns={columns}
                    data={myData}
                    enableRowActions
                    renderRowActions={({row}) => (
                        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                            <IconButton color="secondary"   component={Link} to={`/patientedit/${row.original.id}`}>
                                <EditIcon />
                            </IconButton>

                            <IconButton color="error" component={Link} to={`/patientdelete/${row.original.id}`}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    )}
                />}
        </div>
    )
}

export default PatientHome