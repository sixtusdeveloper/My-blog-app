import { Sidebar } from 'flowbite-react'; 
import { HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiAnnotation, HiChartPie } from 'react-icons/hi';
import { MdPostAdd } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { useSelector } from 'react-redux';

export default function DashboardSidebar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user); 
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
        <Sidebar className='w-full lg:w-52 pt-8 lg:pt-2'>
            <Sidebar.Items className='mt-20'>
                <Sidebar.ItemGroup className='flex flex-col gap-1'>
                    {/* Use the `as` prop to render `Sidebar.Item` as a `Link` */}
                    {currentUser && currentUser.isAdmin && (
                        <Sidebar.Item
                            as={Link}
                            to='/dashboard?tab=dash'
                            active={tab === 'dash' || !tab}
                            icon={HiChartPie}
                            labelColor='dark'
                        >
                            Dashboard
                        </Sidebar.Item>
                    )}

                    {/* Use the `as` prop to render `Sidebar.Item` as a `Link` */}
                    <Sidebar.Item
                        as={Link}
                        to='/dashboard?tab=profile'
                        active={tab === 'profile'}
                        icon={HiUser}
                        label={currentUser.isAdmin ? 'Admin' : 'User'}
                        labelColor='dark'
                    >
                        Profile
                    </Sidebar.Item>

                    {currentUser.isAdmin && (
                        // Render this item only if the user is an admin
                        <Sidebar.Item
                            as={Link}
                            to='/create-post'
                            active={tab === 'createpost'}
                            icon={MdPostAdd}
                        >
                            Create post
                        </Sidebar.Item>
                    )}
                    
 
                    {currentUser.isAdmin && (
                        // Render this item only if the user is an admin
                        <Sidebar.Item
                            as={Link}
                            to='/dashboard?tab=posts'
                            active={tab === 'posts'}
                            icon={HiDocumentText}
                        >
                            Posts
                        </Sidebar.Item>
                    )}

                    {currentUser.isAdmin && (
                        <>
                            <Sidebar.Item
                                as={Link}
                                to='/dashboard?tab=users'  
                                active={tab === 'users'}
                                icon={HiOutlineUserGroup}
                            >
                                Users
                            </Sidebar.Item>

                            <Link to='/dashboard?tab=comments'>
                                <Sidebar.Item
                                active={tab === 'comments'}
                                icon={HiAnnotation}
                                as='div'
                                >
                                Comments
                                </Sidebar.Item>
                            </Link>

                            <Link to='/dashboard?tab=votes'>
                                <Sidebar.Item
                                active={tab === 'votes'}
                                icon={FaStar}
                                as='div'
                                >
                                Votes poll
                                </Sidebar.Item>
                            </Link>

                        </>
                        // Render this item only if the user is an admin
                    )}

                    {/* Use `onClick` for actions like sign out */}
                    <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout}>
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}

