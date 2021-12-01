import axios from 'axios';
import React from 'react';
import { useState } from 'react';

const FormEditDeleteUsers = ({user, getUsers}) => {

  const current = {
    name: user.name,
    company: user.company,
    catchPhrase: user.catchPhrase,
    email: user.email
  }

  const [editing, setEditing] = useState(false)
  const [newUser, setNewUser] = useState(current)
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
      console.log(newUser)
  }

  const editUser = async() => {
    if (newUser.company && newUser.name && emailOK) {      
      let respuesta = await axios.put('https://618ff3c8f6bf450017484ae0.mockapi.io/api/content/users/' + user.id, newUser)
      if (respuesta) {
        setEditing(false)
        getUsers()
    }}
  }

  const handleSend = (e) => {
    e.preventDefault();
    setSendForm(true);
    editUser();
  }

  const deleteUsers = async (user) => {
    const duser = await axios.delete('https://618ff3c8f6bf450017484ae0.mockapi.io/api/content/users/'+ user)
    if (duser) getUsers()
  }

  const handleCancel = () => {
    setNewUser(current)
    setEditing(false)
  }

  const ManageButtons = () => {
    if (editing) {
      return(
        <div className='flex flex-wrap flex-col lg:flex-row'>
            <button className='mx-1 my-2 w-16 font-bold hover:text-green-600'>Apply</button>
            <button onClick={() => {handleCancel()}} className='mx-1 my-2 w-16 font-bold hover:text-green-600'>Cancel</button>
        </div>
      )
    } else {
      return(
        <div className='flex flex-wrap flex-col lg:flex-row'>
            <button onClick={() => {setEditing(true)}} className='mx-1 my-2 w-16 font-bold hover:text-green-600'>Edit</button>
            <button onClick={() => {deleteUsers(user.id)}} className='mx-1 my-2 w-16 font-bold hover:text-green-600'>Delete</button>
        </div>        
      )
    }
  }

  return (
      <form onSubmit={(e) => {handleSend(e)}} className={`${editing ? 'bg-green-500' : 'bg-yellow-200'} flex flex-row items-center my-2`}>
        <div className='flex flex-wrap flex-1'>
          <input className={`p-2 m-1 flex flex-1 focus:bg-white ${!sendForm || newUser.name ? 'bg-yellow-50' : 'bg-red-200'}`}
            placeholder={newUser.name ? 'Name' : 'Please write username'}
            name='name'
            value={newUser.name}
            onChange={handleChange}
            disabled = {editing ? '' : 'disabled'}/>
          <input className={`p-2 m-1 flex flex-1 focus:bg-white ${!sendForm || newUser.company ? 'bg-yellow-50' : 'bg-red-200'}`}
            placeholder={newUser.company ? 'Company' : 'Please write company name'}
            name='company'
            value={newUser.company}
            onChange={handleChange}
            disabled = {editing ? '' : 'disabled'}/>
          <input className='p-2 m-1 flex flex-1 bg-yellow-50 focus:bg-white'
            placeholder='Motto'
            name='catchPhrase'
            value={newUser.catchPhrase}
            onChange={handleChange}
            disabled = {editing ? '' : 'disabled'}/>
          <input className={`p-2 m-1 flex flex-1 focus:bg-white ${!sendForm || emailOK ? 'bg-yellow-50' : 'bg-red-200'}`}
            placeholder={emailOK ? 'E-mail' : 'Please write e-mail'}
            name='email'
            value={newUser.email}
            onChange={handleChange}
            disabled = {editing ? '' : 'disabled'}/>
        </div>
        <div className='flex flex-wrap flex-col lg:flex-row'>
          <ManageButtons></ManageButtons>
        </div>
      </form>
  )
}

export default FormEditDeleteUsers
