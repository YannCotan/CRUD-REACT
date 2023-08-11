import React, { useState , useEffect} from 'react'
import axios from "axios"

export const Users = () => {

  const [users,setUsers] = useState([])

  useEffect(() => {
    const fetchAllUsers = async ()=>{
      try {
        const res = await axios.get('http://localhost:8800/User')
        setUsers(res.data)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllUsers()
  }, [])
  

  return (
    <div>
      <h1>Dummy Users names</h1>
      <div>
        {users.map((user , key)=>(
          <div key={key}>
            {user.nom_user}
          </div>
        ))}
      </div>
    </div>
  )
}
