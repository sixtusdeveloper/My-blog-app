import { Modal, Alert, TextInput, Table, Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function NotificationDashboard() {
  const { currentUser } = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [notificationIdToDelete, setNotificationIdToDelete] = useState('');
  const [loading, setLoading] = useState(true);
  const [authorizationKey, setAuthorizationKey] = useState('');
  const [authError, setAuthError] = useState('');

  const AUTH_KEY = import.meta.env.VITE_AUTHORIZATION_KEY?.trim();

  // Inline background styling
  const backgroundStyle = {
    backgroundImage: 'url("/auth-bg.webp")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    overflowY: 'scroll',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  };

    // Function to truncate long IDs
    const truncateId = (id) => id && id.length > 30 ? `${id.slice(0, 30)}...` : id;

    useEffect(() => {
        const fetchNotifications = async () => {
        try {
            const res = await fetch('/api/notifications/getNotifications');
            const data = await res.json();
            console.log("API Response:", data); // Debug log to see API response
            
            // Check if data is an array directly
            if (Array.isArray(data) && data.length > 0) {
            setNotifications(data); // Set the notifications directly if data is an array
            setShowMore(data.length >= 9);
            } else {
            console.log("No notifications found in API response."); // Log if empty
            setNotifications([]); // Set empty array if no notifications are returned
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Fetch error:", error.message); // Error log for fetch issues
        }
        };
    
        if (currentUser?.isAdmin) { // Check if currentUser and isAdmin are defined
        setLoading(true);
        fetchNotifications();
        } else {
        console.log("Current user is not an admin or not defined."); // Log if user is not admin
        }
    }, [currentUser?._id]);
  
    const handleShowMore = async () => {
        const startIndex = notifications.length;
        console.log('Loading more notifications, starting from index:', startIndex);
        
        // Disable button while fetching
        setLoading(true);
        
        try {
          const res = await fetch(`/api/notifications/getNotifications?startIndex=${startIndex}`);
          const data = await res.json();
          
          console.log('API Response for Load More:', data); // Check API response
          
          if (res.ok && data.notifications) {
            setNotifications((prev) => [...prev, ...data.notifications]);
            
            // Log the updated notifications length
            console.log('Updated notifications length:', notifications.length);
            
            // Show more only if there are more than 9 notifications
            setShowMore(data.notifications.length >= 9);
            
          } else {
            console.log('No more notifications to load or an issue with the API response');
            setShowMore(false); // Hide button if no more notifications are available
          }
        } catch (error) {
          console.error('Error loading more notifications:', error.message);
        } finally {
          setLoading(false);
        }
    };
      
  
    // const handleShowMore = async () => {
    //     const startIndex = notifications.length;
    //     try {
    //     const res = await fetch(`/api/notifications/getNotifications?startIndex=${startIndex}`);
    //     const data = await res.json();
    //     if (res.ok && data.notifications) { // Check if data.notifications exists
    //         setNotifications((prev) => [...prev, ...data.notifications]);
    //         setShowMore(data.notifications.length >= 9);
    //     }
    //     } catch (error) {
    //     console.error(error.message);
    //     }
    // };
        

    // Authorization Key logic
    const handleAuthSubmit = () => {
        if (authorizationKey.trim() === AUTH_KEY) {
        setShowAuthModal(false);
        setShowDeleteModal(true);
        } else {
        setAuthError('Invalid Authorization Key. Please try again.');
        }
    };

    const handleDeleteNotification = async () => {
        console.log("Deleting Notification ID:", notificationIdToDelete); // Debugging log
        setShowDeleteModal(false);
        try {
            const res = await fetch(`/api/notifications/deleteNotifications/${notificationIdToDelete}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setNotifications((prev) =>
                    prev.filter((notification) => notification._id !== notificationIdToDelete)
                );
            } else {
                console.error("Failed to delete notification:", await res.text());
            }
        } catch (error) {
            console.error("Error deleting notification:", error.message);
        }
    };


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen py-20">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <section style={backgroundStyle} className="min-h-[100vh] w-full overflow-auto">
      <div className="relative mt-2 mx-auto overflow-x-scroll border dark:border-gray-800 border-gray-300
        scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300
        dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {currentUser.isAdmin && notifications.length > 0 ? (
          <div>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell className="text-gray-600 dark:text-gray-200">Date</Table.HeadCell>
                <Table.HeadCell className="text-gray-600 dark:text-gray-200">Notification ID</Table.HeadCell>
                <Table.HeadCell className="text-gray-600 dark:text-gray-200">User ID</Table.HeadCell>
                <Table.HeadCell className="text-gray-600 dark:text-gray-200">Notification Content</Table.HeadCell>
                <Table.HeadCell className="text-gray-600 dark:text-gray-200">Delete</Table.HeadCell>
              </Table.Head>

              {notifications.map((notification) => (
                <Table.Body key={notification._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="text-xs">{new Date(notification.createdAt).toLocaleString()}</Table.Cell>
                    <Table.Cell className="text-purple-500 dark:text-purple-600 text-xs">{notification._id}</Table.Cell>
                    <Table.Cell className="text-purple-500 text-xs dark:text-purple-600">{truncateId(notification.user._id)}</Table.Cell>
                    <Table.Cell className="text-gray-500 dark:text-gray-300 text-xs">{notification.message}</Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowAuthModal(true);
                          setNotificationIdToDelete(notification._id);
                        }}
                        className="bg-purple-800 font-medium text-xs cursor-pointer text-white px-2 py-1 rounded-md hover:bg-purple-600"
                      >
                        Delete
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
            {showMore && (
              <div className="flex justify-center mt-4">
                <Button
                  onClick={handleShowMore}
                  gradientDuoTone="purpleToBlue"
                  disabled={loading} // Disable while loading
                  className="flex items-center my-4"
                >
                  Load More
                </Button>
              </div>
            )}
          </div>
        ) : (
          <h1 className="text-center text-2xl">No Notifications Found</h1>
        )}

        {/* Authorization Modal */}
        <Modal show={showAuthModal} onClose={() => setShowAuthModal(false)} popup size="md">
          <Modal.Header />
          <Modal.Body>
            <div className="text-center p-4">
              <h3 className="text-lg mb-4 text-gray-500 dark:text-gray-400">
                🔐Enter Authorization Key
              </h3>
              {authError && (
                <Alert className="mb-4 text-base" color="failure">
                  {authError}
                </Alert>
              )}
              <TextInput
                type="password"
                placeholder="🔑 Enter Key"
                value={authorizationKey}
                onChange={(e) => setAuthorizationKey(e.target.value)}
                className="mb-4"
              />
              <Button gradientDuoTone="purpleToBlue" onClick={handleAuthSubmit} className="w-full">
                Okay
              </Button>
            </div>
          </Modal.Body>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} popup size="md">
          <Modal.Header />
          <Modal.Body>
            <div className="text-center p-4">
              <HiOutlineExclamationCircle className="h-14 w-14 mx-auto mb-4 text-red-800" />
              <h3 className="text-center text-lg mb-4 text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this notification?
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  gradientDuoTone="purpleToBlue"
                  onClick={handleDeleteNotification}
                  className="text-base font-semibold"
                >
                  Yes, Delete
                </Button>
                <Button color="gray" onClick={() => setShowAuthModal(false)} className="text-base font-semibold">
                  No, Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </section>
  );
}
