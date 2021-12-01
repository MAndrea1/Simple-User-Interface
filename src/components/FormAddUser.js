import axios from 'axios';
import React from 'react';
import { useState } from 'react';

const FormAddUser = ({setToggleAddUserForm, getUsers}) => {

  const clean = {
    name: '',
    company: '',
    catchPhrase: '',
    email: ''
  }
  const [newUser, setNewUser] = useState(clean)
  const [emailOK, setEmailOK] = useState(false)
  const [sendForm, setSendForm] = useState(false)

  const addUser = async() => {
    console.log(emailOK)
    console.log('put')
    const user = await axios.post('https://618ff3c8f6bf450017484ae0.mockapi.io/api/content/users', newUser)
    if (user) getUsers();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSendForm(true)
    if (emailOK) addUser()
  }

  const validateData = (data) => {
    if (!data.name) return false
    else if (!data.company) return false
    else if (!data.email) return false
    else return true
  }

  const handleChange = (e) => {
    setNewUser({...newUser, [e.target.name]: e.target.value})
    setEmailOK(validateData(newUser))
  }  

  return (
      <div className='bg-yellow-500 mx-10 my-3 p-3 text-sm'>

        <pre>{JSON.stringify(newUser, null, 2)}</pre>

      <form onSubmit={handleSubmit} className='bg-yellow-200 flex flex-row items-center my-1'>
        <div className='flex flex-wrap flex-1'>
          <input className={`p-2 m-1 flex flex-1 focus:bg-white ${!sendForm || newUser.name ? 'bg-yellow-50' : 'bg-red-200'}`}
            placeholder={!sendForm || newUser.name ? 'Name' : 'Please write username'}
            name='name'
            value={newUser.name}
            onChange={handleChange}/>
          <input className={`p-2 m-1 flex flex-1 focus:bg-white ${!sendForm || newUser.company ? 'bg-yellow-50' : 'bg-red-200'}`}
            placeholder={!sendForm || newUser.company ? 'Company' : 'Please write company name'}
            name='company'
            value={newUser.company}
            onChange={handleChange}/>
          <input className='p-2 m-1 flex flex-1 bg-yellow-50 focus:bg-white'
            placeholder='Motto'
            name='catchPhrase'
            value={newUser.catchPhrase}
            onChange={handleChange}/>
          <input className={`p-2 m-1 flex flex-1 focus:bg-white ${!sendForm || emailOK ? 'bg-yellow-50' : 'bg-red-200'}`}
            placeholder={!sendForm || emailOK ? 'E-mail' : 'Please write e-mail'}
            name='email'
            value={newUser.email}
            onChange={handleChange}/>
        </div>
        <div className='flex flex-wrap flex-col lg:flex-row'>
          <button className='mx-1 my-2 w-16 font-bold hover:text-yellow-600'>Add User</button>
          <button onClick={() => {setToggleAddUserForm(false)}} className='mx-1 my-2 w-16 font-bold hover:text-yellow-600'>Cancel</button>
        </div>
      </form>

    </div>
  )
}

export default FormAddUser
