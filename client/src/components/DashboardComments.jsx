import { Modal, Alert, Table, Button, TextInput, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('');
  const [loading, setLoading] = useState(true);
  const [authorizationKey, setAuthorizationKey] = useState('');
  const [authError, setAuthError] = useState('');

  const AUTH_KEY = import.meta.env.VITE_AUTHORIZATION_KEY?.trim(); // ✅
  ; // Access the key from .env

   // Inline CSS for background image
  const backgroundStyle = {
    backgroundImage: 'url("/auth-bg.webp")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    overflowY: 'scroll',
    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none', // IE and Edge
  };

  // Helper function to truncate IDs longer than 30 characters
  function truncateId(id) {
    if (!id) return ''; // Handle null or undefined values safely
    const idString = String(id); // Convert to string explicitly
    return idString.length > 30 ? `${idString.slice(0, 30)}...` : idString;
  }
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      setLoading(true);
      setTimeout(fetchComments, 2000);
      fetchComments();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Authorization Key logic
  const handleAuthSubmit = () => {
    if (authorizationKey.trim() === AUTH_KEY) {
      setShowAuthModal(false);
      setShowDeleteModal(true);
    } else {
      setAuthError('Invalid Authorization Key. Please try again.');
    }
  };

  const handleDeleteComment = async () => {
    setShowDeleteModal(false);
    try {
      const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        setShowDeleteModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
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
    <section style={backgroundStyle} className='min-h-[100vh] w-full overflow-auto'>
      <div className="relative mx-auto py-1 table-auto overflow-x-scroll scrollbar border dark:border-gray-800 border-gray-300
       scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {currentUser.isAdmin && comments.length > 0 ? (
          <div>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell className='text-gray-600 dark:text-gray-200'>Date updated</Table.HeadCell>
                <Table.HeadCell className='text-gray-600 dark:text-gray-200'>Number of likes</Table.HeadCell>
                <Table.HeadCell className='text-gray-600 dark:text-gray-200'>PostId</Table.HeadCell>
                <Table.HeadCell className='text-gray-600 dark:text-gray-200'>UserId</Table.HeadCell>
                <Table.HeadCell className='text-gray-600 dark:text-gray-200'>Comment content</Table.HeadCell>
                <Table.HeadCell className='text-gray-600 dark:text-gray-200'>Delete</Table.HeadCell>
              </Table.Head>

              {comments.map((comment) => (
                <Table.Body key={comment._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className='text-xs'>
                      {new Date(comment.updatedAt).toLocaleString()}
                    </Table.Cell>
                    <Table.Cell className="text-gray-800 dark:text-gray-300">
                      {comment.numberOfLikes}
                    </Table.Cell>
                    <Table.Cell className="text-purple-500 text-xs dark:text-purple-600">
                      {truncateId(comment.postId)}
                    </Table.Cell>
                    <Table.Cell className="text-purple-500 text-xs dark:text-purple-600">
                      {truncateId(comment.userId)}
                    </Table.Cell>
                    <Table.Cell className="text-gray-500 dark:text-gray-300 text-xs">
                      {comment.content}
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowAuthModal(true);
                          setCommentIdToDelete(comment._id);
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
                  gradientDuoTone='purpleToBlue'
                  className="flex items-center my-4"
                >
                  Load More
                </Button>
              </div>
            )}
          </div>
        ) : (
          <h1 className="text-center text-2xl">No Comments Found</h1>
        )}

          {/* Authorization Modal */}
          <Modal show={showAuthModal} onClose={() => setShowAuthModal(false)} popup size="md">
          <Modal.Header />
          <Modal.Body>
            <div className="text-center p-4">
              <h3 className="text-lg mb-4 text-gray-500 dark:text-gray-400">
                🔐Enter Authorization Key
              </h3>
              {authError &&  
                <Alert className='mb-4 text-base' color='failure'>
                  {authError}
                </Alert>
              }
              <TextInput
                type="password"
                placeholder="🔑 Enter Key"
                value={authorizationKey}
                onChange={(e) => setAuthorizationKey(e.target.value)}
                className="mb-4"
              />
              
              <Button gradientDuoTone='purpleToBlue' onClick={handleAuthSubmit} className="w-full">
                Okay
              </Button>
            </div>
          </Modal.Body>
        </Modal>


        <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} popup size="md">
          <Modal.Header />
          <Modal.Body>
            <div className="text-center p-4">
              <HiOutlineExclamationCircle className="h-14 w-14 mx-auto mb-4 text-red-800" />
              <h3 className="text-center text-lg mb-4 text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this comment?
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  gradientDuoTone='purpleToBlue'
                  onClick={handleDeleteComment}
                  className="text-base font-semibold"
                >
                  Yes, Delete
                </Button>
                <Button
                  color="gray"
                  onClick={() => setShowAuthModal(false)}
                  className="text-base font-semibold"
                >
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











