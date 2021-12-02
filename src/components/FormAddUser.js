import axios from 'axios';
import { useForm } from 'react-hook-form';

const FormAddUser = ({setToggleAddUserForm, getUsers}) => {

  const { register, handleSubmit, formState: { errors } } = useForm();
 
  const onSubmit = async (e) => {
    console.log(e)
    const added = await axios.post('https://618ff3c8f6bf450017484ae0.mockapi.io/api/content/users', e)
    if (added) getUsers()
  }

  return (
      <div className='bg-yellow-500 mx-10 my-3 p-3 text-sm'>
        <div className='flex flex-row'>
      {Object.values(errors).map((error) => {
        return(<h1 key={error.message} className='flex-1'>{error.message}</h1>)})}
        </div>
      <form onSubmit={handleSubmit(onSubmit)} className='bg-yellow-200 flex flex-row items-center my-1'>
        <div className='flex flex-wrap flex-1'>
          <input className={`p-2 m-1 flex flex-1 focus:bg-white bg-yellow-50`}
            type='text'
            placeholder='name'
            name='name'
            {...register('name', {required: 'Name required', minLength: {value:2, message: 'Name should be longer than one letter'}})}/>
          <input className={`p-2 m-1 flex flex-1 focus:bg-white bg-yellow-50`}
            type='text'
            placeholder='company'
            name='company'
            {...register('company', {required: 'Company required'})}/>
          <input className='p-2 m-1 flex flex-1 bg-yellow-50 focus:bg-white'
            type='text'
            placeholder='Motto'
            name='catchPhrase'
            {...register('catchPhrase')}/>
          <input className={`p-2 m-1 flex flex-1 focus:bg-white bg-yellow-50`}
            type='email'
            placeholder='e-mail'
            name='email'
            {...register('email', {required: 'E-mail required'})}/>
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
