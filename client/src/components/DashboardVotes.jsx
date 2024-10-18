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
  });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

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
          });
        }
      } catch (error) {
        console.error('Error fetching poll votes:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser.isAdmin) {
      setLoading(true);
      setTimeout(fetchVotes, 2000); // Fetch after a 2-second delay
      fetchVotes();
    }
  }, [currentUser._id]);

  const handleReset = async () => {
    try {
      const res = await fetch(`/api/pollVote/reset`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to reset votes');
      setVotes({ React: 0, Vue: 0, Angular: 0 });
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

  return (
    <div className="relative mx-auto py-2 table-auto overflow-x-scroll scrollbar">
      {currentUser.isAdmin ? (
        <div>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Framework</Table.HeadCell>
              <Table.HeadCell>Votes</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {Object.entries(votes).map(([framework, count]) => (
                <Table.Row
                  key={framework}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="py-3 px-6 text-left">{framework}</Table.Cell>
                  <Table.Cell className="py-3 px-6 text-center">{count}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          {/* Button to Open the Modal */}
          <div className="mt-6 flex justify-center">
            <Button
              onClick={() => setShowModal(true)}
              gradientDuoTone="redToYellow"
            >
              Reset Poll
            </Button>
          </div>
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
              Are you sure you want to reset the poll?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
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
  );
}





