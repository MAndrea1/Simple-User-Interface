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

  const simplevalidation = (email) => {
    var mail_format = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if(mail_format.test(email)){
      setEmailOK(true)
    } else {
      setEmailOK(false)
    }
  }

  const handleChange = (e) => {
      const newdata = {[e.target.name]: e.target.value}
      setNewUser(olduser => ({...olduser, ...newdata}))
      simplevalidation(newUser.email);
      console.log('email', newUser.email, emailOK)
  }

  const handleSend = (e) => {
    e.preventDefault();
    setSendForm(true);
    addUser();
  }

  const addUser = async() => {
    if (newUser.company && newUser.name && emailOK) {      
      let respuesta = await axios.post('https://618ff3c8f6bf450017484ae0.mockapi.io/api/content/users', newUser)
      if (respuesta) {
        setNewUser(clean)
        getUsers()
    }}
  }

  return (
      <div className='bg-yellow-500 mx-10 my-3 p-3 text-sm'>
      <form onSubmit={(e) => {handleSend(e)}} className='bg-yellow-200 flex flex-row items-center my-1'>
        <div className='flex flex-wrap flex-1'>
          <input className={`p-2 m-1 flex flex-1 focus:bg-white ${!sendForm || newUser.name ? 'bg-yellow-50' : 'bg-red-200'}`}
            placeholder={newUser.name ? 'Name' : 'Please write username'}
            name='name'
            value={newUser.name}
            onChange={handleChange}/>
          <input className={`p-2 m-1 flex flex-1 focus:bg-white ${!sendForm || newUser.company ? 'bg-yellow-50' : 'bg-red-200'}`}
            placeholder={newUser.company ? 'Company' : 'Please write company name'}
            name='company'
            value={newUser.company}
            onChange={handleChange}/>
          <input className='p-2 m-1 flex flex-1 bg-yellow-50 focus:bg-white'
            placeholder='Motto'
            name='catchPhrase'
            value={newUser.catchPhrase}
            onChange={handleChange}/>
          <input className={`p-2 m-1 flex flex-1 focus:bg-white ${!sendForm || emailOK ? 'bg-yellow-50' : 'bg-red-200'}`}
            placeholder={emailOK ? 'E-mail' : 'Please write e-mail'}
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
