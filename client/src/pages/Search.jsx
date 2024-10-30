import { Button, Select, TextInput, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchPostCard from '../components/PostCard';

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });

  console.log(sidebarData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();

      // Simulate 2-second delay for the loading state
      setTimeout(async () => {
          const res = await fetch(`/api/post/getposts?${searchQuery}`);
          if (!res.ok) {
              setLoading(false);
              return;
          }
          if (res.ok) {
              const data = await res.json();
              setPosts(data.posts);
              setLoading(false);
              setShowMore(data.posts.length === 9);
          }
          }, 2000);
      };

    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === 'sort') {
      const order = e.target.value || 'desc';
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === 'category') {
      const category = e.target.value || 'uncategorized';
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();

    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  }; 


  return (
    <section className='min-h-screen bg-white dark:bg-[rgb(16,23,42)] w-full pt-20 '>
      <div className='flex flex-col md:flex-row'>
          <div className='p-6 border-b md:border-r md:min-h-screen border-r-gray-300 dark:border-r-gray-800 border-b-gray-400 dark:border-b-gray-800'>
            <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
              <div className='flex flex-col gap-2'>
                <label className='whitespace-nowrap font-semibold justify-start'>
                Search Term:
                </label>
                <TextInput
                placeholder='Search...'
                id='searchTerm'
                type='text'
                value={sidebarData.searchTerm}
                onChange={handleChange}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label className='font-semibold'>Sort:</label>
                <Select onChange={handleChange} value={sidebarData.sort} id='sort'>
                  <option value='desc'>Latest</option>
                  <option value='asc'>Oldest</option>
                </Select>
              </div>
              <div className='flex flex-col gap-2'>
                <label className='font-semibold'>Category:</label>
                <Select
                onChange={handleChange}
                value={sidebarData.category}
                id='category'
                >
                  <option value='uncategorized'>Select a Category</option>
                  <option value='javascript'>JavaScript</option>
                  <option value='mysql'>MySQL</option>
                  <option value='reactjs'>React.js</option>
                  <option value='nextjs'>Next.js</option>
                  <option value='typescript'>TypeScript</option>
                  <option value='vuejs'>Vue.js</option>
                  <option value='html'>HTML</option>
                  <option value='c++'>C++</option>
                  <option value='c-sharp'>C-sharp</option>
                  <option value='css'>CSS</option>
                  <option value='java'>Java</option>
                  <option value='php'>PHP</option>
                  <option value='shell'>Shell</option>
                  <option value='python'>Python</option>
                  <option value='tailwindcss'>Tailwindcss</option>
                  <option value='career'>Career</option>
                  <option value='frontend'>Frontend</option>
                  <option value='backend'>Backend</option>
                  <option value='devops'>DevOps</option>
                  <option value='git'>Git</option>
                </Select>
              </div>
              <Button type='submit' outline gradientDuoTone='purpleToPink'>
                  Apply Filters
              </Button>
            </form>
          </div>
          <div className='w-full'>
              <h1 className='self-center bg-gradient-to-r from-indigo-600 via-blue-500 to-pink-800 rounded-lg text-white text-2xl font-semibold sm:border-b dark:border-b-gray-800 border-b-gray-300 p-3 mx-2 '>
              Posts results
              </h1>
              <div className='p-2 flex flex-wrap gap-4'>
                  {!loading && posts.length === 0 && (
                      <p className='text-xl text-gray-500'>No posts found.</p>
                  )}
                  {loading && 
                      <div className="flex py-20 justify-center items-center w-full">
                          <Spinner aria-label="Loading posts" size="xl" />
                      </div>
                  }
                  <div className="grid gap-4 md:gap-6 lg:gap-2 justify-center items-center md:grid-cols-2 lg:grid-cols-3">
                      {!loading &&
                          posts &&
                          posts.map((post) => <SearchPostCard key={post._id} post={post} />
                      )}
                  </div>
                  {showMore && (
                      <div className='text-center mx-auto py-8'>
                          <Button
                          onClick={handleShowMore}
                          className='text-lg my-4'
                          gradientDuoTone='purpleToBlue' outline 
                          >
                          Show More
                          </Button>
                      </div>
                  )}
              </div>
          </div>
      </div>
    </section>
  );
}