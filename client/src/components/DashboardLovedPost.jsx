import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Modal, Button, Spinner } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function SavedPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');

  // Fetch saved posts
  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const res = await fetch(`/api/post/savedposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setSavedPosts(data.posts);
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch saved posts:', error);
        setLoading(false);
      }
    };

    if (currentUser._id) {
      fetchSavedPosts();
    }
  }, [currentUser._id]);

  // Handle deleting a saved post
  const handleDeletePost = async () => {
    try {
      const res = await fetch(`/api/post/removesaved/${postIdToDelete}/${currentUser._id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setSavedPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
        setShowModal(false);
      } else {
        console.error('Failed to delete saved post');
      }
    } catch (error) {
      console.error('Error deleting saved post:', error);
    }
  };

  // Spinner while loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen py-20">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      {savedPosts.length > 0 ? (
        <Table hoverable className="shadow-md">
          <Table.Head>
            <Table.HeadCell>Date Saved</Table.HeadCell>
            <Table.HeadCell>Post Image</Table.HeadCell>
            <Table.HeadCell>Post Title</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {savedPosts.map((post) => (
              <Table.Row key={post._id} className="bg-white dark:bg-gray-800">
                <Table.Cell>{new Date(post.savedAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell>
                  <Link to={`/post/${post.slug}`}>
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-20 h-12 rounded-md object-cover"
                    />
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/post/${post.slug}`}
                    className="font-medium text-blue-500 dark:text-blue-400"
                  >
                    {post.title}
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <span
                    onClick={() => {
                      setShowModal(true);
                      setPostIdToDelete(post._id);
                    }}
                    className="cursor-pointer text-red-500 hover:underline"
                  >
                    Delete
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <h1 className="text-center text-2xl text-gray-700 dark:text-gray-200">No Saved Posts Found</h1>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center p-4">
            <HiOutlineExclamationCircle className="h-14 w-14 mx-auto mb-4 text-red-800" />
            <h3 className="mb-4 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this saved post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button onClick={handleDeletePost} color="red">
                Yes, Delete
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
}
