import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { Button, Table, Spinner } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/getusers?limit=5');
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
        setLoading(false); // Stop spinner after loading data
      } catch (error) {
        console.log(error.message);
        setLoading(false); // Stop spinner even if there's an error
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getposts?limit=5');
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
        setLoading(false); // Stop spinner after loading data
      } catch (error) {
        console.log(error.message);
        setLoading(false); // Stop spinner even if there's an error
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch('/api/comment/getcomments?limit=5');
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
        setLoading(false); // Stop spinner after loading data
      } catch (error) {
        console.log(error.message);
        setLoading(false); // Stop spinner even if there's an error
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
      setLoading(true); // Start spinner when fetching begins
      setTimeout(fetchPosts, 2000); // Fetch after a 2-second delay

    }
  }, [currentUser]);


  // Spinner logic
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen py-20">
        <Spinner size="xl" />
      </div>
    );
  }

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


  return (
    <section style={backgroundStyle} className='min-h-[100vh] w-full overflow-auto'>
      <div className='relative mx-auto py-1 table-auto overflow-x-scroll border dark:border-gray-800 border-gray-300
      scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700
      dark:scrollbar-thumb-slate-500'>
        <div className='md:flex flex-col space-y-4 md:space-y-0 md:flex-row gap-2 justify-between items-center'>
          <div className='flex flex-col p-4 bg-blue-800 gap-4 md:w-76 w-full rounded-md shadow-md'>
            <div className='flex justify-between'>
              <div className=''>
                <h3 className='text-gray-100 font-bold text-base uppercase'>Total Users</h3>
                <p className='text-gray-200 text-2xl'>{totalUsers}</p>
              </div>
              <HiOutlineUserGroup className='bg-teal-600  text-white rounded-full text-5xl p-3 shadow-lg' />
            </div>
            <div className='flex gap-2 text-sm'>
              <span className='text-green-500 flex items-center'>
                <HiArrowNarrowUp />
                {lastMonthUsers}
              </span>
              <div className='text-gray-200'>Last month</div>
            </div>
          </div>

          <div className='flex flex-col p-4 bg-green-800 gap-4 md:w-76 w-full rounded-md shadow-md'>
            <div className='flex justify-between'>
              <div className=''>
                <h3 className='text-gray-100 text-base font-bold uppercase'>
                  Total Comments
                </h3>
                <p className='text-2xl text-gray-200'>{totalComments}</p>
              </div>
              <HiAnnotation className='bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg' />
            </div>
            <div className='flex  gap-2 text-sm'>
              <span className='text-green-500 flex items-center'>
                <HiArrowNarrowUp />
                {lastMonthComments}
              </span>
              <div className='text-gray-200'>Last month</div>
            </div>
          </div>

          <div className='flex flex-col p-4 bg-yellow-800 gap-4 md:w-76 w-full rounded-md shadow-md'>
            <div className='flex justify-between'>
              <div className=''>
                <h3 className='text-gray-100 text-base font-bold uppercase'>Total Posts</h3>
                <p className='text-2xl text-gray-200'>{totalPosts}</p>
              </div>
              <HiDocumentText className='bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg' />
            </div>
            <div className='flex gap-2 text-sm'>
              <span className='text-green-500 flex items-center'>
                <HiArrowNarrowUp />
                {lastMonthPosts}
              </span>
              <div className='text-gray-200'>Last month</div>
            </div>
          </div>
        </div>

        <div className='flex flex-wrap md:flex-nowrap gap-2 py-4 mx-auto justify-center'>
          <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800'>
            <div className='flex items-center justify-between py-3 text-sm font-semibold'>
              <h1 className='text-center p-2 font-semibold text-gray-700 dark:text-gray-100'>Recent users</h1>
              <Button outline gradientDuoTone='purpleToPink' className='self-center'>
                <Link to={'/dashboard?tab=users'}>See all</Link>
              </Button>
            </div>
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell className='text-gray-700 dark:text-gray-200'>User image</Table.HeadCell>
                <Table.HeadCell className='text-gray-700 dark:text-gray-200'>Username</Table.HeadCell>
              </Table.Head>
              {users &&
                users.map((user) => (
                  <Table.Body key={user._id} className='divide-y'>
                    <Table.Row className='dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell>
                        <img
                          src={user.profilePicture}
                          alt='user'
                          className='w-10 h-10 rounded-full bg-gray-500'
                        />
                      </Table.Cell>
                      <Table.Cell className='text-gray-700 dark:text-gray-300 text-sm'>{user.username}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
            </Table>
          </div>

          <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800'>
            <div className='flex items-center justify-between py-3 text-sm font-semibold'>
              <h1 className='text-center p-2 font-semibold text-gray-700 dark:text-gray-100'>Recent Comments</h1>
              <Button outline gradientDuoTone='purpleToPink' className='self-center'>
                <Link to={'/dashboard?tab=comments'}>See all</Link>
              </Button>
            </div>
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell className='text-gray-700 dark:text-gray-200'>Comment Content</Table.HeadCell>
                <Table.HeadCell className='text-gray-700 dark:text-gray-200'>Likes</Table.HeadCell>
              </Table.Head>
              {comments &&
                comments.map((comment) => (
                  <Table.Body key={comment._id} className='divide-y'>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell className='w-96'>
                          <p className='line-clamp-2 text-xs text-gray-600 dark:text-gray-300'>{comment.content}</p>
                      </Table.Cell>
                      <Table.Cell className='text-gray-500 dark:text-gray-200'>{comment.numberOfLikes}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
            </Table>
          </div>

          <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800'>
            <div className='flex items-center justify-between py-3 text-sm font-semibold'>
              <h1 className='text-center p-2 font-semibold text-gray-700 dark:text-gray-100'>Recent posts</h1>
              <Button outline gradientDuoTone='purpleToPink' className='self-center'>
                <Link to={'/dashboard?tab=posts'}>See all</Link>
              </Button>
            </div>
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell className='text-gray-700 dark:text-gray-200'>Post Image</Table.HeadCell>
                <Table.HeadCell className='text-gray-700 dark:text-gray-200'>Post Title</Table.HeadCell>
                <Table.HeadCell className='text-gray-700 dark:text-gray-200'>Category</Table.HeadCell>
              </Table.Head>
              {posts &&
                posts.map((post) => (
                  <Table.Body key={post._id} className='divide-y'>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell>
                        <img
                          src={post.image}
                          alt='user'
                          className='w-14 h-10 rounded-md bg-gray-500'
                        />
                      </Table.Cell>
                      <Table.Cell className='w-96 text-xs text-gray-600 dark:text-gray-200 font-medium'>{post.title}</Table.Cell>
                      <Table.Cell className='w-5 text-purple-500 cursor-pointer font-medium text-sm hover:text-purple-600'>{post.category}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
}