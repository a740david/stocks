
import {  NavLink, Outlet, useLocation } from "react-router-dom";
import { AppBar, MenuItem, Toolbar } from "@mui/material";
import { Box } from "@mui/system";

export default function Main(){

    const currLocation = useLocation()
    console.log('Main:', currLocation)

   
    
    return (
        <Box>    
                <Toolbar variant="dense">             
                <MenuItem>
                    <NavLink to='singup/'
                            className='nav-link'
                            >
                    Singup
                    </NavLink>
                </MenuItem>      
                </Toolbar>
          

            <Outlet />
        </Box>
    )
}
