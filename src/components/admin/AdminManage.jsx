import { React, useEffect, useMemo, useState } from "react"
import AxiosInstance from '../AxiosInstance'
import { MaterialReactTable } from 'material-react-table';
import dayjs from "dayjs";
import { Box, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, } from '@mui/icons-material';
import {Link} from 'react-router-dom'

const AdminManage = () => {

    const [myData, setMyData] = useState()
    const [loading, setLoading] = useState(true)
    
    const GetData = () => {
        AxiosInstance.get(`users/`).then((res) => {
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
                accessorKey: 'username', //normal accessorKey
                header: 'Username',
                size: 150,
            },
            {
                accessorKey: 'email', //access nested data with dot notation
                header: 'Email',
                size: 150,
            },
            {
                accessorKey: 'role', //access nested data with dot notation
                header: 'Role',
                size: 150,
            },
            {
                accessorFn: (row) => dayjs(row.date_joined).format('DD-MM-YYYY'),
                header: 'Date Joined',
                size: 150,
            },
        ],
        [],
    );

    return (
        <div>
            {loading ? <p>Loading........</p> :
                <MaterialReactTable
                    columns={columns}
                    data={myData}
                    enableRowActions
                    renderRowActions={({row}) => (
                        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                            <IconButton color="secondary"   component={Link} to={`/AdminUserEdit/${row.original.id}`}>
                                <EditIcon />
                            </IconButton>

                            <IconButton color="error" component={Link} to={`/AdminUserDelete/${row.original.id}`}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    )}
                />}
        </div>
    )
}

export default AdminManage