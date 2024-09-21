import { useSelector } from 'react-redux';  // Import the useSelector hook from react-redux  
import { Outlet, Navigate } from 'react-router-dom';  // Import the Outlet component from react-router-dom

export default function PrivateRoute() {
    const { currentUser } = useSelector((state) => state.user);  // Get the theme from the state
  return currentUser ? <Outlet /> : <Navigate to='/sign-in' />;  // If the user is logged in, render the Outlet component, otherwise redirect to the sign-in page 
}
