import { useState } from "react"
import { UserContext } from "./user.context"




const UserProvider = ({ children }) => {
    const [allUser, setallUser] = useState([])
    const [followers, setFollowers] = useState([]);
      const [following, setFollowing] = useState([]);
      const [other, setOther] = useState([]);
    return (
        <UserContext.Provider value={{ allUser, setallUser, followers, setFollowers, following, setFollowing, other, setOther }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider




