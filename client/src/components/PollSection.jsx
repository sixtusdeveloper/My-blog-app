import { useState, useEffect } from 'react';
import { Button } from 'flowbite-react';

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

        <div className="flex flex-wrap md:flex-nowrap gap-4 justify-center space-x-4">
          <Button
            onClick={() => handleVote('React')}
            className="self-center px-2 py-1"
            gradientDuoTone="purpleToPink"
          >
            React [{votes.React}]
          </Button>
          <Button
            onClick={() => handleVote('Vue')}
            className="self-center px-2 py-1"
            gradientDuoTone="purpleToBlue"
          >
            Vue [{votes.Vue}]
          </Button>
          <Button
            onClick={() => handleVote('Angular')}
            className="self-center px-2 py-1"
            gradientDuoTone="purpleToBlue"
          >
            Angular [{votes.Angular}]
          </Button>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold py-2">Results:</h3>

          <table className="table-auto border-collapse w-full mt-4">
            <thead>
              <tr className="bg-white dark:bg-[rgb(16,23,42)] border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-200 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Framework</th>
                <th className="py-3 px-6 text-center">Votes</th>
              </tr>
            </thead>
            <tbody className="text-sm font-light border border-gray-300 dark:border-gray-700">
              <tr className="border-b border-gray-200 dark:bg-[rgb(16,23,42)] dark:border-gray-700 bg-white hover:bg-gray-100">
                <td className="py-3 px-6 text-left">React</td>
                <td className="py-3 px-6 text-center">{votes.React}</td>
              </tr>
              <tr className="border-b border-gray-300 dark:border-gray-700 dark:bg-[rgb(16,23,42)] bg-white hover:bg-gray-100">
                <td className="py-3 px-6 text-left">Vue</td>
                <td className="py-3 px-6 text-center">{votes.Vue}</td>
              </tr>
              <tr className="border-b border-gray-300 dark:border-gray-700 dark:bg-[rgb(16,23,42)] bg-white hover:bg-gray-100">
                <td className="py-3 px-6 text-left">Angular</td>
                <td className="py-3 px-6 text-center">{votes.Angular}</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </section>
  );
};

export default PollSection;








