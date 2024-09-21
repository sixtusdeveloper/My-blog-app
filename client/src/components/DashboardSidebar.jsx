import { Sidebar } from 'flowbite-react'; 
import { HiUser, HiArrowSmRight } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function DashboardSidebar() {
    const location = useLocation();
    const [tab, setTab] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);  
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        } 
    }, [location.search]);

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
                    <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer'>
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}














// import { Sidebar } from 'flowbite-react';
// import { HiUser, HiArrowSmRight } from 'react-icons/hi';
// import { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// export default function DashboardSidebar() {
//     const location = useLocation()
//     const [tab, setTab] = useState('')
//     useEffect(() => {
//         const urlParams = new URLSearchParams(location.search)  
//         const tabFromUrl = urlParams.get('tab')
//         if (tabFromUrl) {
//         setTab(tabFromUrl)
//         } 
//     }, [location.search])


//     return (
//         <Sidebar className='w-full md:w-56'>
//             <Sidebar.Items className='mt-20'>
//                 <Sidebar.ItemGroup>
//                     <Link to='/dashboard?tab=profile'>
//                         <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={'User'} labelColor='dark'>
//                         Profile
//                         </Sidebar.Item>
//                     </Link>

//                     <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer'>
//                     Sign Out
//                     </Sidebar.Item>

//                 </Sidebar.ItemGroup>
            
//             </Sidebar.Items>
//         </Sidebar>
//     )
// }
