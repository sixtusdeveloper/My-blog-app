import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsLinkedin } from 'react-icons/bs';

export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid gap-8 lg:gap-10 w-full justify-between lg:grid-cols-2 sm:grid-cols-2'>
          {/* Left section with logo and description */}
          <div className='mt-5 lg:text-left'>
            <Link to="/" className="flex items-center self-center whitespace-nowrap text-sm md:text-base lg:text-lg font-semibold dark:text-white">
              <img src="/Logo-icon.png" alt="Logo icon" width='30px' height="30px" />
              <span className='self-center mx-1 py-1 px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                DevJourney
              </span>
            </Link>
            <p className='text-sm leading-snug mt-3'>
              DevJourney is your go-to platform for expert insights, tutorials, and collaborative projects in the world of development. Whether you're a seasoned developer or just starting your journey, we help you sharpen your skills and build meaningful connections.
            </p>
          </div>

          {/* Center and right sections with important links */}
          <div className='grid grid-cols-2 gap-8 sm:grid-cols-3 mt-5'>
            <div>
              <Footer.Title title='About Us' />
              <Footer.LinkGroup col>
                <Footer.Link href='/about'>Our Mission</Footer.Link>
                <Footer.Link href='/team'>Meet the Team</Footer.Link>
                <Footer.Link href='/contact'>Contact Us</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Resources' />
              <Footer.LinkGroup col>
                <Footer.Link href='/blog'>Blog</Footer.Link>
                <Footer.Link href='/tutorials'>Tutorials</Footer.Link>
                <Footer.Link href='/projects'>Open Source Projects</Footer.Link>
              </Footer.LinkGroup>
            </div>

            {/* Right section with legal links */}
            <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                <Footer.Link href='/privacy-policy'>Privacy Policy</Footer.Link>
                <Footer.Link href='/terms'>Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>

        <Footer.Divider />

        {/* Footer bottom with copyright and social icons */}
        <div className='w-full sm:flex sm:items-center sm:justify-between mt-8'>
          <Footer.Copyright href='#' by="DevJourney" year={new Date().getFullYear()} />
          <div className="flex gap-6 mt-4 sm:mt-0 sm:justify-center lg:justify-end">
            <Footer.Icon href='https://www.facebook.com/' icon={BsFacebook} />
            <Footer.Icon href='https://www.instagram.com/' icon={BsInstagram} />
            <Footer.Icon href='https://www.twitter.com/' icon={BsTwitter} />
            <Footer.Icon href='https://github.com/sahandghavidel' icon={BsGithub} />
            <Footer.Icon href='https://www.linkedin.com/' icon={BsLinkedin} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
