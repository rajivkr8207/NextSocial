import React, { useContext } from 'react'
import { UserContext } from '../user.context'
import { FetchAllUser } from '../services/user.api'

const UseUser = () => {
    const context = useContext(UserContext)
    const { allUser, setallUser } = context


    const fetchAllUsers = async () => {
        try {
            const res = await FetchAllUser()
            console.log(res);
            setallUser(res.allUser)
        } catch (error) {
            console.log(error)
        }
    }
    return { allUser, setallUser, fetchAllUsers }
}

export default UseUser