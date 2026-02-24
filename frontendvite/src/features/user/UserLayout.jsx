import { Outlet } from "react-router"
import UserProvider from "./UserContext"

const UserLayout = () => {
    return (
        <>
            <UserProvider>
                <Outlet />
            </UserProvider>
        </>
    )
}

export default UserLayout