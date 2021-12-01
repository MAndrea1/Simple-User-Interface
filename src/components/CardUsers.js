import React from 'react'
import axios from 'axios';

const CardUsers = ({user, getUsers}) => {

  const deleteUsers = async (user) => {
    const duser = await axios.delete('https://618ff3c8f6bf450017484ae0.mockapi.io/api/content/users/'+ user)
    if (duser) getUsers()
  }

    return (
        <div className='bg-yellow-200 flex flex-row items-center my-2'>
          <div className='flex flex-wrap flex-1'>
            <input className='p-2 m-1 flex flex-1 bg-yellow-50 focus:bg-white'
              value={user.name} disabled/>
            <input className='p-2 m-1 flex flex-1 bg-yellow-50 focus:bg-white'
              value={user.company} disabled/>
            <input className='p-2 m-1 flex flex-1 bg-yellow-50 focus:bg-white'
              value={user.catchPhrase} disabled/>
            <input className='p-2 m-1 flex flex-1 bg-yellow-50 focus:bg-white'
              value={user.email} disabled/>
          </div>
          <div className='flex flex-wrap flex-col lg:flex-row'>
            <button className='mx-1 my-2 w-16 font-bold hover:text-green-600'>Edit</button>
            <button onClick={() => {deleteUsers(user.id)}} className='mx-1 my-2 w-16 font-bold hover:text-green-600'>Delete</button>
          </div>
        </div>            
    )
}

export default CardUsers
