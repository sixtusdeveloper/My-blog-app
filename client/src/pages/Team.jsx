import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';

// Sample team member data
const teamMembers = [
  {
    name: 'Sixtus Aondoakaa',
    title: 'Founder & Lead Engineer',
    photo: '/profile-img.png', // Update with your photo path
    bio: `I am a passionate Software Engineer with a focus on creating engaging and efficient applications. 
          My journey began with a simple love for technology and has transformed into a full-fledged career 
          in full-stack software engineer. I believe in continuous learning and thrive on solving complex problems. 
          Whether it's collaborating with cross-functional teams or mentoring junior developers, I believe in 
          the power of teamwork and continuous learning. I invite you to explore my work, share insights, and 
          connect with me through various channels. Together, we can push the boundaries of what's possible in 
          technology.`,
    socialLinks: {
      twitter: 'https://x.com/dev_elites', // Update with your social links
      linkedin: 'https://www.linkedin.com/in/sixtusushrey/',
      github: 'https://github.com/sixtusdeveloper/',
      youtube: 'https://www.youtube.com/@Sixtusdev',
    },
  },
];

const MeetTheTeam = () => {
  return (
    <section className="w-full bg-white dark:bg-[rgb(16,23,42)]">
      <div
        className="relative flex items-center pt-14 md:py-10 md:px-4 lg:px-10 min-h-screen lg:min-h-[85vh] bg-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: 'url("/bg-img.avif")', // Replace with your desired background image.
        }}
        >
        <div className="absolute inset-0 bg-black opacity-70"></div> {/* Dark overlay for contrast */}

        <div className="relative text-white mt-10 p-4 max-w-3xl space-y-8">
          <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight text-white mb-4">
          Meet The Engineer
          </h1>

          <p className="text-lg lg:text-xl text-gray-100 mb-6">
          I'm a dedicated software engineer committed to delivering high-quality solutions and innovative 
          applications. With a passion for technology and a keen eye for detail, I strive to create seamless 
          user experiences that solve real-world problems. 
          </p>
          <Link to='/about'>
              <Button 
              size="lg" 
              gradientDuoTone="purpleToBlue"
              className="hover:scale-105 transform transition-transform my-7 duration-300"
              >
              More about me
              </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-10 py-10">
          <div className="py-6">
              {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-wrap justify-between lg:flex-nowrap items-center gap-6 border border-gray-300 dark:border-gray-800 shadow-md rounded-lg p-4">
                  <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-58 object-cover rounded-t-lg"
                  />
                  <div className="mt-4">
                      <h2 className="lg:text-3xl md:text-2xl py-2 font-semibold">{member.name}</h2>
                      <p className="text-gray-600 dark:text-gray-300">{member.title}</p>
                      <p className="mt-4 leading-7">{member.bio}</p>
                      <div className="flex items-center justify-start mt-6 space-x-8">
                        <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                          <FaTwitter size={20} />
                        </a>
                        <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                          <FaLinkedin size={20} />
                        </a>
                        <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                          <FaGithub size={20} />
                        </a>
                        <a href={member.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                          <FaYoutube size={20} />
                        </a>
                      </div>
                  </div>
              </div>
              ))}
          </div>
      </div>
    </section>
  );
};

export default MeetTheTeam;
