import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardProfile from '../components/DashboardProfile'; 


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
    <div className='min-h-screen flex flex-col md:flex-row bg-white dark:bg-[rgb(16,23,42)] w-full'>
      {/* Sidebar */}
      <div className='md:w-56'>
        <DashboardSidebar />  

      </div>

      {/* Profile */}
      <div className='w-full max-w-lg p-4 mx-auto'>
        {tab === 'profile' && <DashboardProfile />}
      </div>
    </div>
  )
}
