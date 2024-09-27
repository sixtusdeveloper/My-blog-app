import { Sidebar } from 'flowbite-react'; 
import { HiUser, HiArrowSmRight } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';

export default function DashboardSidebar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [tab, setTab] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);  
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        } 
    }, [location.search]);

    // Signed Out function
    const handleSignout = async () => {   

        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message); 
            }
            else {
                dispatch(signoutSuccess());
            }
        } catch (error) {   
            console.log(error);
        }
    }


    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items className='mt-20'>
                <Sidebar.ItemGroup>
                    {/* Use the `as` prop to render `Sidebar.Item` as a `Link` */}
                    <Sidebar.Item
                        as={Link}
                        to='/dashboard?tab=profile'
                        active={tab === 'profile'}
                        icon={HiUser}
                        label={'User'}
                        labelColor='dark'
                    >
                        Profile
                    </Sidebar.Item>

                    {/* Use `onClick` for actions like sign out */}
                    <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout}>
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}

