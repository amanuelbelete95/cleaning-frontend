import { Box } from "@chakra-ui/react"
import { Outlet } from "react-router-dom";


const TeamsLayout = () => {
    return (
        <Box>
            <Box>
                Arada Cleaning Management Teams
            </Box>
            <>
            <Outlet />
            </>
            
        </Box>
    )
}

export default TeamsLayout;