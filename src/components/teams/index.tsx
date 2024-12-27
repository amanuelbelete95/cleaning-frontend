import { Box } from "@chakra-ui/react"
import { Outlet } from "react-router-dom";


 const TeamsLayout = () => {
    return (
        <Box>
            TeamIndex
            <Outlet />
        </Box>
    )
}

export default TeamsLayout;