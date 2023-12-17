import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header className='header' id='site_header'>
    <div className='header-content clearfix'>
      <div className='text-logo'>
        <a href='/' target='_self' aria-label='home page'>
          <div className='logo-symbol'>N</div>
          <div className='logo-text'>
            Nurul <span>Islam</span>
          </div>
        </a>
      </div>

      <div className='site-nav mobile-menu-hide'>
        <ul className='leven-classNameic-menu site-main-menu'>
          <li className='menu-item current-menu-item'>
            <a href='/' target='_self' aria-label='about me page'>
              About Me
            </a>
          </li>

          <li className='menu-item'>
            <Link to='/resume' aria-label='resume page'>
              Resume
            </Link>
          </li>

          <li className='menu-item'>
            <Link to='/contact' aria-label='contact page'>
              Contact
            </Link>
          </li>
        </ul>
      </div>

      <Link to='/' aria-label='menu toggle' className='menu-toggle mobile-visible'>
        <i className='fa fa-bars' />
      </Link>
    </div>
  </header>
);
export default Header;