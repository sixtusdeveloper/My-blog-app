import { Modal, Table, Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashboardVotes() {
  const { currentUser } = useSelector((state) => state.user);
  const [votes, setVotes] = useState({
    React: 0,
    Vue: 0,
    Angular: 0,
    Nextjs: 0,
    Svelte: 0,
    TypeScript: 0,
    Express: 0,
    MongoDB: 0,
    Laravel: 0,
    PostgreSQL: 0,
    Django: 0,
    Flask:0,
    MySQL:0,
    Bootstrap: 0,
    TailwindCSS: 0,
    MaterialUI: 0,
    ChakraUI: 0,
    Shadcn: 0,
    GraphQL: 0,
    Docker: 0,
    Kubernetes: 0,
  });

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState(''); // Track the selected framework

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const res = await fetch(`/api/pollVote`);
        const data = await res.json();
        if (res.ok) {
          setVotes({
            React: data.reactVotes,
            Vue: data.vueVotes,
            Angular: data.angularVotes,
            Nextjs: data.nextjsVotes,
            Svelte: data.svelteVotes,
            TypeScript: data.typescriptVotes,
            Express: data.expressVotes,
            MongoDB: data.mongodbVotes,
            Laravel: data.laravelVotes,
            PostgreSQL: data.postgresqlVotes,
            Django: data.djangoVotes,
            Flask: data.flaskVotes,
            MySQL: data.mysqlVotes,
            Bootstrap: data.bootstrapVotes,
            TailwindCSS: data.tailwindcssVotes,
            MaterialUI: data.materialuiVotes,
            ChakraUI: data.chakrauiVotes,
            Shadcn: data.shadcnVotes,
            GraphQL: data.graphqlVotes,
            Docker: data.dockerVotes,
            Kubernetes: data.kubernetesVotes,
          });
          
        }
      } catch (error) {
        console.error('Error fetching poll votes:', error.message);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    setTimeout(fetchVotes, 2000); // Fetch after a 2-second delay
  }, [currentUser._id]);

  // Handle the reset for a specific framework
  const handleReset = async () => {
    try {
      const res = await fetch(`/api/pollVote/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ framework: selectedFramework }), // Send framework name
      });
      if (!res.ok) throw new Error('Failed to reset votes');
      setVotes((prevVotes) => ({ ...prevVotes, [selectedFramework]: 0 }));
      setShowModal(false); // Close the modal after resetting
    } catch (error) {
      console.error('Error resetting votes:', error.message);
    }
  };

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
    <section style={backgroundStyle} className="min-h-[100vh] w-full overflow-auto">
      <div
        className="relative mx-auto py-2 table-auto overflow-x-scroll border dark:border-gray-800 border-gray-300
      scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700
      dark:scrollbar-thumb-slate-500"
      >
        {votes ? (
          <div>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell className="text-gray-600 dark:text-gray-200">
                  Framework
                </Table.HeadCell>
                <Table.HeadCell className="text-center mx-auto text-gray-600 dark:text-gray-200">
                  Votes
                </Table.HeadCell>
                {currentUser.isAdmin && (
                  <Table.HeadCell className="text-center mx-auto text-gray-600 dark:text-gray-200">
                    Update
                  </Table.HeadCell>
                )}
              </Table.Head>
              <Table.Body className="divide-y">
                {Object.entries(votes).map(([framework, count]) => (
                  <Table.Row
                    key={framework}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="py-3 px-6 text-left">{framework}</Table.Cell>
                    <Table.Cell className="py-3 px-6 text-center">{count}</Table.Cell>
                    {currentUser.isAdmin && (
                      <Table.Cell className="py-3 px-6 text-center">
                        <button
                          onClick={() => {
                            setSelectedFramework(framework); // Track the selected framework
                            setShowModal(true); // Open the modal
                          }}
                          className="mx-auto text-center font-medium text-xs bg-purple-800 cursor-pointer text-white px-2 py-1 rounded-md hover:bg-purple-600"
                        >
                          Reset
                        </button>
                      </Table.Cell>
                    )}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        ) : (
          <h1 className="text-center text-2xl">No Votes Found</h1>
        )}

        {/* Modal Component */}
        <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
          <Modal.Header />
          <Modal.Body>
            <div className="text-center p-4">
              <HiOutlineExclamationCircle className="h-14 w-14 mx-auto mb-4 text-red-800" />
              <h3 className="text-lg mb-4 text-gray-500 dark:text-gray-400">
                Are you sure you want to reset the votes for {selectedFramework}?
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  gradientDuoTone="purpleToBlue"
                  onClick={handleReset}
                  className="text-base font-semibold"
                >
                  Yes, Reset
                </Button>
                <Button
                  color="gray"
                  onClick={() => setShowModal(false)}
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





