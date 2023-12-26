import { Footer as FooterFB } from 'flowbite-react';
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from 'react-icons/bs';

const Footer = () => {
  return (
    <FooterFB bgDark className='relative z-100'>
      <div className='w-full'>
        <div className='grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4'>
          <div>
            <FooterFB.Title title='Company' />
            <FooterFB.LinkGroup col>
              <FooterFB.Link href='#'>About</FooterFB.Link>
              <FooterFB.Link href='#'>Careers</FooterFB.Link>
              <FooterFB.Link href='#'>Brand Center</FooterFB.Link>
              <FooterFB.Link href='#'>Blog</FooterFB.Link>
            </FooterFB.LinkGroup>
          </div>
          <div>
            <FooterFB.Title title='help center' />
            <FooterFB.LinkGroup col>
              <FooterFB.Link href='#'>Discord Server</FooterFB.Link>
              <FooterFB.Link href='#'>Twitter</FooterFB.Link>
              <FooterFB.Link href='#'>Facebook</FooterFB.Link>
              <FooterFB.Link href='#'>Contact Us</FooterFB.Link>
            </FooterFB.LinkGroup>
          </div>
          <div>
            <FooterFB.Title title='legal' />
            <FooterFB.LinkGroup col>
              <FooterFB.Link href='#'>Privacy Policy</FooterFB.Link>
              <FooterFB.Link href='#'>Licensing</FooterFB.Link>
              <FooterFB.Link href='#'>Terms &amp; Conditions</FooterFB.Link>
            </FooterFB.LinkGroup>
          </div>
          <div>
            <FooterFB.Title title='download' />
            <FooterFB.LinkGroup col>
              <FooterFB.Link href='#'>iOS</FooterFB.Link>
              <FooterFB.Link href='#'>Android</FooterFB.Link>
              <FooterFB.Link href='#'>Windows</FooterFB.Link>
              <FooterFB.Link href='#'>MacOS</FooterFB.Link>
            </FooterFB.LinkGroup>
          </div>
        </div>
        <div className='w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between'>
          <FooterFB.Copyright href='#' by='GroovyGoodies™' year={2023} />
          <div className='mt-4 flex space-x-6 sm:mt-0 sm:justify-center'>
            <FooterFB.Icon href='#' icon={BsFacebook} />
            <FooterFB.Icon href='#' icon={BsInstagram} />
            <FooterFB.Icon href='#' icon={BsTwitter} />
            <FooterFB.Icon href='#' icon={BsGithub} />
            <FooterFB.Icon href='#' icon={BsDribbble} />
          </div>
        </div>
      </div>
    </FooterFB>
  );
};
export default Footer;
