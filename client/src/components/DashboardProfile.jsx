import { Button, TextInput } from 'flowbite-react';
import { useSelector } from 'react-redux';


export default function DashboardProfile() {
    const {currentUser} = useSelector(state => state.user)


    return (
        <div className='mt-20 w-full p-4'>
        
            <h1 className='font-semibold text-2xl md:text-3xl text-center p-8'>Profile</h1>

            <form className='flex flex-col gap-6'>
                <div className='self-center shadow-md overflow-hidden rounded-full w-32 h-32 cursor-pointer'>
                   <img src={currentUser?.profilePicture || '/user.png'} alt="user profile" className='rounded-full w-full h-full object-cover border-4 border-[lightgray]'/>
                </div>

                <TextInput label='Username' type="text" id="username" placeholder="Username" defaultValue={currentUser?.username}/>
                <TextInput label='Email' type="email" id="email" placeholder="Email" defaultValue={currentUser?.email}/>
                <TextInput type="password" id="password" placeholder="Password"/>

                <Button type="submit" gradientDuoTone='purpleToBlue' outline className='mt-4'>Update</Button>
    
            </form>

            <div className='flex justify-between py-8'>
                <span className='text-red-600 font-medium hover:text-red-800 cursor-pointer'>Delete Account</span>
                <span className='text-red-600 font-medium hover:text-red-800 cursor-pointer'>Sign Out</span>
            </div>
            
        </div>
    )
}

