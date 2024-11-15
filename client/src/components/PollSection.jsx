import { useState, useEffect } from 'react';
import { Table } from 'flowbite-react';  // Import the Button component

const PollSection = () => {
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
    } catch (error) {
      console.error('Error submitting vote', error);
    }
  };


  return (
    <section className="poll-section py-10">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-6">Your Opinion Matters</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">Which technologies and framework do you prefer?</p>

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
                  <button
                    onClick={() => handleVote('React')}
                    className="mx-auto text-center px-3 py-2 text-xs md:text-sm bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-500 rounded-lg text-white"
                  >
                      React [{votes.React}]
                  </button>
                </Table.Cell>
              </Table.Row>

              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="py-3 px-6 text-left">Vue</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">{votes.Vue}</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleVote('Vue')}
                    className="mx-auto text-center px-3 py-2 text-xs md:text-sm bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-800 rounded-lg text-white"
                  >
                      Vue [{votes.Vue}]
                  </button>
                </Table.Cell>
              </Table.Row>

              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="py-3 px-6 text-left">Angular</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">{votes.Angular}</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleVote('Angular')}
                    className="mx-auto text-center px-3 py-2 text-xs md:text-sm bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 rounded-lg text-white"
                  >
                      Angular [{votes.Angular}]
                  </button>
                </Table.Cell>
              </Table.Row>

              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="py-3 px-6 text-left">Svelte</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">{votes.Svelte}</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleVote('Svelte')}
                    className="mx-auto text-center px-3 py-2 text-xs md:text-sm bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 rounded-lg text-white"
                  >
                      Svelte [{votes.Svelte}]
                  </button>
                </Table.Cell>
              </Table.Row>

              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="py-3 px-6 text-left">Nextjs</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">{votes.Nextjs}</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleVote('Nextjs')}
                    className="mx-auto text-center px-3 py-2 text-xs md:text-sm bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 rounded-lg text-white"
                  >
                      Nextjs [{votes.Nextjs}]
                  </button>
                </Table.Cell>
              </Table.Row>

              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="py-3 px-6 text-left">TypeScript</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">{votes.TypeScript}</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleVote('TypeScript')}
                    className="mx-auto text-center px-3 py-2 text-xs md:text-sm bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 rounded-lg text-white"
                  >
                      TypeScript [{votes.TypeScript}]
                  </button>
                </Table.Cell>
              </Table.Row>

              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="py-3 px-6 text-left">Express</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">{votes.Express}</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleVote('Express')}
                    className="mx-auto text-center px-3 py-2 text-xs md:text-sm bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 rounded-lg text-white"
                  >
                      Express [{votes.Express}]
                  </button>
                </Table.Cell>
              </Table.Row>

              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="py-3 px-6 text-left">MongoDB</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">{votes.MongoDB}</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleVote('MongoDB')}
                    className="mx-auto text-center px-3 py-2 text-xs md:text-sm bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 rounded-lg text-white"
                  >
                      MongoDB [{votes.MongoDB}]
                  </button>
                </Table.Cell>
              </Table.Row>

              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="py-3 px-6 text-left">Laravel</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">{votes.Laravel}</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleVote('Laravel')}
                    className="mx-auto text-center px-3 py-2 text-xs md:text-sm bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 rounded-lg text-white"
                  >
                      Laravel [{votes.Laravel}]
                  </button>
                </Table.Cell>
              </Table.Row>

              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="py-3 px-6 text-left">PostgreSQL</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">{votes.PostgreSQL}</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleVote('PostgreSQL')}
                    className="mx-auto text-center px-3 py-2 text-xs md:text-sm bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 rounded-lg text-white"
                  >
                      PostgreSQL [{votes.PostgreSQL}]
                  </button>
                </Table.Cell>
              </Table.Row>

              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="py-3 px-6 text-left">Django</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">{votes.Django}</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleVote('Django')}
                    className="mx-auto text-center px-3 py-2 text-xs md:text-sm bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 rounded-lg text-white"
                  >
                      Django [{votes.Django}]
                  </button>
                </Table.Cell>
              </Table.Row>

              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="py-3 px-6 text-left">Flask</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">{votes.Flask}</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleVote('Flask')}
                    className="mx-auto text-center px-3 py-2 text-xs md:text-sm bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 rounded-lg text-white"
                  >
                      Flask [{votes.Flask}]
                  </button>
                </Table.Cell>
              </Table.Row>

              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="py-3 px-6 text-left">MySQL</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">{votes.MySQL}</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleVote('MySQL')}
                    className="mx-auto text-center px-3 py-2 text-xs md:text-sm bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 rounded-lg text-white"
                  >
                      MySQL [{votes.MySQL}]
                  </button>
                </Table.Cell>
              </Table.Row>

              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="py-3 px-6 text-left">Bootstrap</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">{votes.Bootstrap}</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleVote('Bootstrap')}
                    className="mx-auto text-center px-3 py-2 text-xs md:text-sm bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 rounded-lg text-white"
                  >
                      Bootstrap [{votes.Bootstrap}]
                  </button>
                </Table.Cell>
              </Table.Row>

              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="py-3 px-6 text-left">TailwindCSS</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">{votes.TailwindCSS}</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleVote('TailwindCSS')}
                    className="mx-auto text-center px-3 py-2 text-xs md:text-sm bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 rounded-lg text-white"
                  >
                      TailwindCSS [{votes.TailwindCSS}]
                  </button>
                </Table.Cell>
              </Table.Row>

              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="py-3 px-6 text-left">MaterialUI</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">{votes.MaterialUI}</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleVote('MaterialUI')}
                    className="mx-auto text-center px-3 py-2 text-xs md:text-sm bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 rounded-lg text-white"
                  >
                      MaterialUI [{votes.MaterialUI}]
                  </button>
                </Table.Cell>
              </Table.Row>

              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="py-3 px-6 text-left">Shadcn</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">{votes.Shadcn}</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleVote('MaterialUI')}
                    className="mx-auto text-center px-3 py-2 text-xs md:text-sm bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 rounded-lg text-white"
                  >
                      Shadcn [{votes.Shadcn}]
                  </button>
                </Table.Cell>
              </Table.Row>

              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="py-3 px-6 text-left">ChakraUI</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">{votes.ChakraUI}</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleVote('ChakraUI')}
                    className="mx-auto text-center px-3 py-2 text-xs md:text-sm bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 rounded-lg text-white"
                  >
                      ChakraUI [{votes.ChakraUI}]
                  </button>
                </Table.Cell>
              </Table.Row>

              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="py-3 px-6 text-left">GraphQL</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">{votes.GraphQL}</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleVote('GraphQL')}
                    className="mx-auto text-center px-3 py-2 text-xs md:text-sm bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 rounded-lg text-white"
                  >
                      GraphQL [{votes.GraphQL}]
                  </button>
                </Table.Cell>
              </Table.Row>

              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="py-3 px-6 text-left">Docker</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">{votes.Docker}</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleVote('Docker')}
                    className="mx-auto text-center px-3 py-2 text-xs md:text-sm bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 rounded-lg text-white"
                  >
                      Docker [{votes.Docker}]
                  </button>
                </Table.Cell>
              </Table.Row>

              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="py-3 px-6 text-left">Kubernetes</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">{votes.Kubernetes}</Table.Cell>
                <Table.Cell className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleVote('Kubernetes')}
                    className="mx-auto text-center px-3 py-2 text-xs md:text-sm bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 rounded-lg text-white"
                  >
                      Kubernetes [{votes.Kubernetes}]
                  </button>
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








