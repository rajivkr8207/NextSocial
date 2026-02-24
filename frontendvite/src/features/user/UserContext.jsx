import { useState } from "react"
import { UserContext } from "./user.context"




const UserProvider = ({ children }) => {
    const [allUser, setallUser] = useState([])
    return (
        <UserContext.Provider value={{ allUser, setallUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider




