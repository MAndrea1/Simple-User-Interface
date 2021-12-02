import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const FormEditDeleteUsers = ({user, getUsers}) => {

  const current = {
    name: user.name,
    company: user.company,
    catchPhrase: user.catchPhrase,
    email: user.email
  }

  const [editing, setEditing] = useState(false)

  const { register, handleSubmit, reset,  formState: { errors } } = useForm(
    {defaultValues: current}
  );
 
  const onSubmit = async (e) => {
    console.log(e)
    const added = await axios.put('https://618ff3c8f6bf450017484ae0.mockapi.io/api/content/users/' + user.id, e)
    if (added) getUsers()
  }

  const handleCancel = () => {
    reset()
    setEditing(false)
  }

  const deleteUsers = async (user) => {
    const duser = await axios.delete('https://618ff3c8f6bf450017484ae0.mockapi.io/api/content/users/'+ user)
    if (duser) getUsers()
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
    <div className={`${editing ? 'bg-green-500' : 'bg-yellow-200'} flex flex-col items-center my-2`}>
      <form onSubmit={handleSubmit(onSubmit)} className={`${editing ? 'bg-green-500' : 'bg-yellow-200'} flex flex-wrap flex-row items-center my-2`}>
        <div className='flex flex-wrap flex-1'>
          <input className={`p-2 m-1 flex flex-1 focus:bg-white bg-yellow-50`}
            type='text'
            placeholder='name'
            name='name'
            disabled = {editing ? '' : 'disabled'}
            {...register('name', {required: 'Name required', minLength: {value:2, message: 'Name should be longer than one letter'}})}/>
          <input className={`p-2 m-1 flex flex-1 focus:bg-white bg-yellow-50`}
            type='text'
            placeholder='company'
            name='company'
            disabled = {editing ? '' : 'disabled'}
            {...register('company', {required: 'Company required'})}/>
          <input className='p-2 m-1 flex flex-1 bg-yellow-50 focus:bg-white'
            type='text'
            placeholder='Motto'
            name='catchPhrase'
            disabled = {editing ? '' : 'disabled'}
            {...register('catchPhrase')}/>
          <input className={`p-2 m-1 flex flex-1 focus:bg-white bg-yellow-50`}
            type='email'
            placeholder='e-mail'
            name='email'
            disabled = {editing ? '' : 'disabled'}
            {...register('email', {required: 'E-mail required'})}/>
        </div>
        <div className='flex flex-wrap flex-col lg:flex-row'>
          <ManageButtons></ManageButtons>
        </div>
      </form>
        <div className='flex flex-row'>
      {Object.values(errors).map((error) => {
        return(<h1 key={error.message} className='flex-1 mb-2 text-white font-bold'>{error.message}</h1>)})}
        </div>
    </div>
  )
}

export default FormEditDeleteUsers
