import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardProfile from '../components/DashboardProfile'; 
import DashboardPosts from '../components/DashboardPosts';
import DashboardUsers from '../components/DashboardUsers';
import DashboardComments from '../components/DashboardComments';
import DashboardComponent from '../components/DashboardComponent';
import DashboardVotes from '../components/DashboardVotes';
import DashboardAdminAccess from '../components/DashboardAdminAccess';


export default function Dashboard() {
  const location = useLocation()
  const [tab, setTab] = useState('')
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)  
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl)
    } 
  }, [location.search])  


  return (
    <div className='min-h-screen flex mx-auto flex-col lg:flex-row bg-white dark:bg-[rgb(16,23,42)] w-full'>
      {/* Sidebar */}
      <div className='w-full lg:w-52'>
        <DashboardSidebar />  
      </div>

      {/* Profile */}
      <div className='w-full p-4 md:p-2 md:py-6 mx-auto'>
        <div className='w-full p-0 mx-auto max-w-7xl'>
          {tab === 'profile' && <DashboardProfile />}
        </div>
       
       {/* Posts */}
        <div className='w-full pt-4 mx-auto max-w-7xl'>
          {tab === 'posts' && <DashboardPosts />} 
        </div>

        {/* Users */}
        <div className='w-full pt-4 mx-auto max-w-7xl'>
          {tab === 'users' && <DashboardUsers />}
        </div>

        {/* Comments */}
        <div className='w-full pt-4 mx-auto max-w-7xl'>
          {tab === 'comments' && <DashboardComments />}
        </div>

        {/* Poll votes */}
        <div className='w-full pt-0 mx-auto max-w-7xl'>
          {tab === 'votes' && <DashboardVotes />}
        </div>

        {/* Admin access notice */}
        <div className='w-full pt-0 mx-auto max-w-7xl'>
          {tab === 'adminaccess' && <DashboardAdminAccess />}
        </div>

        {/* Dashboard component */}
        <div className='w-full pt-0 md:pt-2 mx-auto max-w-7xl'>
          {tab === 'dash' && <DashboardComponent />}
        </div>

      </div>
    </div>
  )
}
