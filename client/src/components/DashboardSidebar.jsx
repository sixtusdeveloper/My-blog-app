import { Sidebar } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';

// Import your custom icons
import DashboardIcon from '/dashboard.webp';
import ProfileIcon from '/profile.webp';
import CreatePostIcon from '/create-post.webp';
import PostsIcon from '/posts.png';
import UsersIcon from '/users.webp';
import CommentsIcon from '/comments.webp';
import VotesIcon from '/votes.png';
import AdminAccessIcon from '/access.webp'; 
import LogoutIcon from '/logout.webp';

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

    const handleSignout = async () => {
        try {
            const res = await fetch('/api/user/signout', { method: 'POST' });
            const data = await res.json();
            if (!res.ok) console.log(data.message);
            else dispatch(signoutSuccess());
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Sidebar className="w-full lg:w-52 pt-8 lg:pt-2 border-r dark:border-r-gray-800 border-r-gray-300">
            <Sidebar.Items className="mt-20">
                <Sidebar.ItemGroup className="flex flex-col gap-1">
                    {currentUser && currentUser.isAdmin && (
                        <Sidebar.Item
                            as={Link}
                            to="/dashboard?tab=dash"
                            active={tab === 'dash' || !tab}
                        >  
                            <span className="flex text-sm items-center space-x-2">
                                <img src={DashboardIcon} alt="Dashboard" className="w-5 h-5 mr-4" />
                                Dashboard
                            </span>
                        </Sidebar.Item>
                    )}

                    <Sidebar.Item
                        as={Link}
                        to='/dashboard?tab=profile'
                        active={tab === 'profile' || !tab}
                        label={currentUser.isAdmin ? 'Admin' : 'User'}
                        labelColor='dark'
                    
                    >  
                        <span className="flex text-sm items-center space-x-2">
                            <img src={ProfileIcon} alt="Profile" className="w-5 h-5 mr-4" />
                            Profile
                        </span>
                    </Sidebar.Item>

                    {currentUser.isAdmin && (
                        <Sidebar.Item as={Link} to="/create-post" 
                            active={tab === 'createpost' || !tab}>
                            <span className="flex text-sm items-center space-x-2">
                                <img src={CreatePostIcon} alt="Create Post" className="w-5 h-5 mr-4" />
                                Create Post
                            </span>
                        </Sidebar.Item>
                    )}

                    {currentUser.isAdmin && (
                        <Sidebar.Item as={Link} to="/dashboard?tab=posts" 
                            active={tab === 'posts' || !tab}>
                            <span className="flex text-sm items-center space-x-2">
                                <img src={PostsIcon} alt="Posts" className="w-5 h-5 mr-4" />
                                Posts
                            </span>
                        </Sidebar.Item>
                    )}

                    {currentUser.isAdmin && (
                        <>
                            <Sidebar.Item as={Link} to="/dashboard?tab=users" 
                                active={tab === 'users' || !tab}>
                                <span  className="flex text-sm items-center space-x-2">
                                    <img src={UsersIcon} alt="Users" className="w-5 h-5 mr-4" />
                                    Users
                                </span>
                            </Sidebar.Item>

                            <Sidebar.Item as={Link} to="/dashboard?tab=comments" 
                                active={tab === 'comments' || !tab}>
                                <span  className="flex text-sm items-center space-x-2">
                                    <img src={CommentsIcon} alt="Comments" className="w-5 h-5 mr-4" />
                                    Comments
                                </span>
                            </Sidebar.Item>

                            <Sidebar.Item as={Link} to="/dashboard?tab=votes" 
                                active={tab === 'votes' || !tab}>
                                <span  className="flex text-sm items-center space-x-2">
                                    <img src={VotesIcon} alt="Votes Poll" className="w-5 h-5 mr-4" />
                                    Votes Poll
                                </span>
                            </Sidebar.Item>

                            <Sidebar.Item as={Link} to="/dashboard?tab=adminaccess" 
                                active={tab === 'adminaccess' || !tab}>
                                <span  className="flex text-sm items-center space-x-2">
                                    <img src={AdminAccessIcon} alt="Votes Poll" className="w-5 h-5 mr-4" />
                                    Admin Access
                                </span>
                            </Sidebar.Item>
                        </>
                    )}

                    <Sidebar.Item className="cursor-pointer" onClick={handleSignout}>
                        <span  className="flex text-sm items-center space-x-2">
                            <img src={LogoutIcon} alt="Logout" className="w-5 h-5 mr-4" />
                            Sign Out
                        </span>
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}

