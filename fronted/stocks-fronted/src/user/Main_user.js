
import {  NavLink, Outlet, useLocation } from "react-router-dom";
import { Stack, MenuItem, Toolbar } from "@mui/material";
import { Box } from "@mui/system";

export default function Main(){

    const currLocation = useLocation()
    console.log('Main:', currLocation)

   
    
    return (
        <Box>   
          <Stack  direction="row" justifyContent="center">
                <Toolbar variant="dense">             
                <MenuItem>
                    <NavLink to='singup/'
                            className='nav-link'
                            >
                    Singup
                    </NavLink>
                </MenuItem>      
                </Toolbar>
                
                </Stack>

            <Outlet />
        </Box>
    )
}
