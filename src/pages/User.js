import React, { useState, useEffect } from 'react'
import axios from 'axios'

const User = () => { 
    const [ users, setUsers ] = useState()

  return (
      <>
    <div>User</div>

    {users?.length 
     ? (
         <ul>
             {users.map((user, i) => <li key={i}>{user?.username} </li>)}
         </ul>)
         : <p> no users found </p>

     }
     ) 
    </>
  )
}

export default User