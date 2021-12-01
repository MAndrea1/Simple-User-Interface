import { useEffect, useState } from 'react';
import axios from 'axios';
import FormAddUser from './components/FormAddUser';
import CardUsers from './components/CardUsers';

const App = () => {

  const [toggleAddUserForm, setToggleAddUserForm] = useState(false)
  const [usersList, setUsersList] = useState([])
  
  const getUsers = async () => {
    const allUsers = await axios.get('https://618ff3c8f6bf450017484ae0.mockapi.io/api/content/users')
    setUsersList(allUsers.data)
  }

  useEffect(() => {
    getUsers()
  }, [])

  const ToggleAddUser = () => {
    if (toggleAddUserForm) {
    return(
      <FormAddUser setToggleAddUserForm={setToggleAddUserForm} getUsers={getUsers}/>)}
    else {
      return (<button onClick={() => {setToggleAddUserForm(true)}} 
      className='ml-14 mb-1 font-bold text-green-800 hover:text-green-500'>Add new user</button>)
    }
  }

  return (
    <div className='bg-yellow-100 min-h-screen pb-10'>
      <h1 className='text-6xl text-green-700 text-center py-5 mb-5'>Simple User Interface</h1>
      <ToggleAddUser/>
      <div className='bg-green-700 mx-10 px-3 py-1 text-sm'>
        {usersList.map((user) => {
            return(
              <CardUsers key={user.id} user={user} getUsers={getUsers}/>
            )})}
      </div>
      <ToggleAddUser/>
    </div>
  )
}

export default App
