import { Modal, Alert, TextInput, Table, Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function NotificationDashboard() {
  const { currentUser } = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReadWarningModal, setShowReadWarningModal] = useState(false);
  const [notificationIdToDelete, setNotificationIdToDelete] = useState('');
  const [loading, setLoading] = useState(true);

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
  const truncateId = (id) => (id && id.length > 30 ? `${id.slice(0, 30)}...` : id);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch('/api/notifications/getNotifications');
        const data = await res.json();
        setNotifications(data || []);
        setShowMore(data.length >= 9);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error.message);
        setLoading(false);
      }
    };

    if (currentUser?.isAdmin) {
      setLoading(true);
      fetchNotifications();
    }
  }, [currentUser?._id]);

  const handleShowMore = async () => {
    const startIndex = notifications.length;
    setLoading(true);

    try {
      const res = await fetch(`/api/notifications/getNotifications?startIndex=${startIndex}`);
      const data = await res.json();
      if (data?.notifications) {
        setNotifications((prev) => [...prev, ...data.notifications]);
        setShowMore(data.notifications.length >= 9);
      } else {
        setShowMore(false);
      }
    } catch (error) {
      console.error('Error loading more notifications:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification._id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const handleDeleteClick = (id, isRead) => {
    if (isRead) {
      setShowDeleteModal(true);
      setNotificationIdToDelete(id);
    } else {
      setShowReadWarningModal(true);
    }
  };

  const handleDeleteNotification = async () => {
    setShowDeleteModal(false);
    try {
      const res = await fetch(`/api/notifications/deleteNotifications/${notificationIdToDelete}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setNotifications((prev) => prev.filter((notification) => notification._id !== notificationIdToDelete));
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
                <Table.HeadCell className="text-gray-600 dark:text-gray-200">Notification Content</Table.HeadCell>
                <Table.HeadCell className="text-gray-600 dark:text-gray-200">Mark as Read</Table.HeadCell>
                <Table.HeadCell className="text-gray-600 dark:text-gray-200">Delete</Table.HeadCell>
              </Table.Head>

              {notifications.map((notification) => (
                <Table.Body key={notification._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="text-xs">{new Date(notification.createdAt).toLocaleString()}</Table.Cell>
                    <Table.Cell className="text-purple-500 dark:text-purple-600 text-xs">{notification._id}</Table.Cell>
                    <Table.Cell className="text-gray-500 dark:text-gray-300 text-xs">{notification.message}</Table.Cell>
                    <Table.Cell>
                      <button
                        onClick={() => handleMarkAsRead(notification._id)}
                        disabled={notification.isRead}
                        className='bg-blue-800 font-medium text-xs cursor-pointer text-white px-2 py-1 rounded-md hover:bg-blue-600'
                      >
                        {notification.isRead ? 'Read' : 'Unread'}
                      </button>
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => handleDeleteClick(notification._id, notification.isRead)}
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
                  disabled={loading}
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
                <Button color="gray" onClick={() => setShowDeleteModal(false)} className="text-base font-semibold">
                  No, Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        {/* Read Warning Modal */}
        <Modal show={showReadWarningModal} onClose={() => setShowReadWarningModal(false)} popup size="md">
          <Modal.Header />
          <Modal.Body>
            <div className="text-center p-4">
              <h3 className="text-lg mb-4 text-gray-500 dark:text-gray-400">
                You haven't read or marked this notification as read. Please mark it as read first.
              </h3>
              <Button onClick={() => setShowReadWarningModal(false)} gradientDuoTone="purpleToBlue" className='flex mx-auto mt-2 items-center justify-center'>
                Okay
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </section>
  );
}

