
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ListSubheader, Collapse } from '@mui/material';
import AxiosInstance from './AxiosInstance';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import Diversity3SharpIcon from '@mui/icons-material/Diversity3Sharp';
import PeopleAltSharpIcon from '@mui/icons-material/PeopleAltSharp';
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';


const drawerWidth = 240;

export default function Navbar(props) {
  const userdetails = JSON.parse(localStorage.getItem('userdetails'))
  const { content } = props
  const location = useLocation()
  const path = location.pathname
  const navigate = useNavigate()

  const logoutUser = () => {
    AxiosInstance.post(`logoutall/`, {
    })
      .then(() => {
        localStorage.removeItem("Token")
        localStorage.removeItem("user")
        localStorage.removeItem("userdetails")
        navigate('/')
      }

      )
  }
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%'
            }}>
            <span>{userdetails.username.toUpperCase()}</span>
            <span>{userdetails.email.toUpperCase()}</span>
          </Typography>

        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          {userdetails.role === 'admin' && <List
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Nested List Items
              </ListSubheader>
            }
          >
            <ListItem key={1} disablePadding>
              <ListItemButton component={Link} to="/adminhome" selected={"/adminhome" === path}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItemButton>
            </ListItem>
            <ListItem key={2} disablePadding>
              <ListItemButton component={Link} to="/adminabout" selected={"/adminabout" === path}>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary={"About"} />
              </ListItemButton>
            </ListItem>
            <ListItem key={3} disablePadding>
              <ListItemButton component={Link} to="/adminmanage" selected={"/adminmanage" === path}>
                <ListItemIcon>
                  <PeopleAltSharpIcon />
                </ListItemIcon>
                <ListItemText primary={"Users"} />
              </ListItemButton>
            </ListItem>
            <ListItemButton onClick={handleClick} component={Link} to="/patientHome" selected={"/patienthome" === path}>
              <ListItemIcon>
                <Diversity3SharpIcon />
              </ListItemIcon>
              <ListItemText primary="Patients" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem key={1} disablePadding>
                  <ListItemButton sx={{ pl: 4 }} component={Link} to="/patientregistration" selected={"/patientregistration" === path}>
                    <ListItemIcon>
                      <SourceOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Register"} />
                  </ListItemButton>
                </ListItem>
                <ListItem key={2} disablePadding>
                  <ListItemButton sx={{ pl: 4 }} component={Link} to="/appointments" selected={"/appointments" === path}>
                    <ListItemIcon>
                      <PendingActionsRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Appointments"} />
                  </ListItemButton>
                </ListItem>
                <ListItem key={3} disablePadding>
                  <ListItemButton sx={{ pl: 4 }} component={Link} to="/bookappointments" selected={"/bookappointments" === path}>
                    <ListItemIcon>
                      <PendingActionsRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={"bookAppointments"} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>
          </List>}

          {userdetails.role === 'manager' && <List>
            <ListItem key={1} disablePadding>
              <ListItemButton component={Link} to="/managerhome" selected={"/managerhome" === path}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItemButton>
            </ListItem>
            <ListItem key={2} disablePadding>
              <ListItemButton component={Link} to="/managerabout" selected={"/managerabout" === path}>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary={"About"} />
              </ListItemButton>
            </ListItem>
            <ListItemButton onClick={handleClick} component={Link} to="/patientHome" selected={"/patienthome" === path}>
              <ListItemIcon>
                <Diversity3SharpIcon />
              </ListItemIcon>
              <ListItemText primary="Patients" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem key={1} disablePadding>
                  <ListItemButton sx={{ pl: 4 }} component={Link} to="/patientregistration" selected={"/patientregistration" === path}>
                    <ListItemIcon>
                      <SourceOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Register"} />
                  </ListItemButton>
                </ListItem>
                <ListItem key={2} disablePadding>
                  <ListItemButton sx={{ pl: 4 }} component={Link} to="/appointments" selected={"/appointments" === path}>
                    <ListItemIcon>
                      <PendingActionsRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Appointments"} />
                  </ListItemButton>
                </ListItem>
                <ListItem key={3} disablePadding>
                  <ListItemButton sx={{ pl: 4 }} component={Link} to="/bookappointments" selected={"/bookappointments" === path}>
                    <ListItemIcon>
                      <PendingActionsRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={"BookAppointments"} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>
          </List>}

          {userdetails.role === 'employee' && <List>
            <ListItem key={1} disablePadding>
              <ListItemButton component={Link} to="/employeehome" selected={"/employeehome" === path}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItemButton>
            </ListItem>
            <ListItem key={2} disablePadding>
              <ListItemButton component={Link} to="/employeeabout" selected={"/employeeabout" === path}>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary={"About"} />
              </ListItemButton>
            </ListItem>
            <ListItemButton onClick={handleClick} component={Link} to="/patientHome" selected={"/patienthome" === path}>
              <ListItemIcon>
                <Diversity3SharpIcon />
              </ListItemIcon>
              <ListItemText primary="Patients" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem key={1} disablePadding>
                  <ListItemButton sx={{ pl: 4 }} component={Link} to="/patientregistration" selected={"/patientregistration" === path}>
                    <ListItemIcon>
                      <SourceOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Register"} />
                  </ListItemButton>
                </ListItem>
                <ListItem key={2} disablePadding>
                  <ListItemButton sx={{ pl: 4 }} component={Link} to="/appointments" selected={"/appointments" === path}>
                    <ListItemIcon>
                      <PendingActionsRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Appointments"} />
                  </ListItemButton>
                </ListItem>
                <ListItem key={3} disablePadding>
                  <ListItemButton sx={{ pl: 4 }} component={Link} to="/bookappointments" selected={"/bookappointments" === path}>
                    <ListItemIcon>
                      <PendingActionsRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={"BookAppointments"} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>
          </List>}

          <List>
            <ListItem key={1} disablePadding>
              <ListItemButton onClick={logoutUser}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
              </ListItemButton>
            </ListItem>
          </List>

        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {content}
      </Box>
    </Box>
  );
}