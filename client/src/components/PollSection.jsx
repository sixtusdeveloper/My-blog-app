import { useState, useEffect } from 'react';
import { Button, Table } from 'flowbite-react';  // Import the Button component

const PollSection = () => {
  const [votes, setVotes] = useState({
    React: 0,
    Vue: 0,
    Angular: 0,
  });

  // Fetch poll votes on component mount
  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const response = await fetch('/api/pollVote');
        const data = await response.json();
        setVotes({
          React: data.reactVotes,
          Vue: data.vueVotes,
          Angular: data.angularVotes,
        });
      } catch (error) {
        console.error('Error fetching poll votes', error);
      }
    };

    fetchVotes();
  }, []);

  const handleVote = async (framework) => {
    try {
      const response = await fetch('/api/pollVote/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ framework }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit vote');
      }

      const data = await response.json();
      setVotes({
        React: data.reactVotes,
        Vue: data.vueVotes,
        Angular: data.angularVotes,
      });
    } catch (error) {
      console.error('Error submitting vote', error);
    }
  };


  return (
    <section className="poll-section py-10">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-6">Your Opinion Matters</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">Which JavaScript framework do you prefer?</p>

        <div className="relative mx-auto py-2 table-auto overflow-x-scroll scrollbar">
          
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Framework</Table.HeadCell>
              <Table.HeadCell className='text-center mx-auto'>Votes</Table.HeadCell>
              <Table.HeadCell className='text-center mx-auto'>Lang</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">

              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="py-3 px-6 text-left">React</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">{votes.React}</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">
                  <Button
                    onClick={() => handleVote('React')}
                    className="mx-auto text-center text-xs md:text-sm"
                    gradientDuoTone="redToYellow"
                  >
                      React [{votes.React}]
                  </Button>
                </Table.Cell>
              </Table.Row>

              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="py-3 px-6 text-left">Vue</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">{votes.Vue}</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">
                  <Button
                    onClick={() => handleVote('Vue')}
                    className="mx-auto text-center text-xs md:text-sm"
                    gradientDuoTone="redToYellow"
                  >
                      Vue [{votes.Vue}]
                  </Button>
                </Table.Cell>
              </Table.Row>

              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="py-3 px-6 text-left">Angular</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">{votes.Angular}</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">
                  <Button
                    onClick={() => handleVote('Angular')}
                    className="mx-auto text-center text-xs md:text-sm"
                    gradientDuoTone="redToYellow"
                  >
                      Angular [{votes.Angular}]
                  </Button>
                </Table.Cell>
              </Table.Row>
             
            </Table.Body>
          </Table>    
        </div>
      </div>
    </section>
  );
};

export default PollSection;








