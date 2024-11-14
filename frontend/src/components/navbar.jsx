import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Avatar, Dropdown } from 'flowbite-react';
import { logout } from '../redux/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(localStorage.getItem('role') || '');
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const Urole = localStorage.getItem('role');
    if (Urole !== user) {
      setUser(Urole || '');
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="bg-blue-600 p-4 fixed w-full top-0 shadow-md z-50">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-white text-2xl ml-6 font-bold">TrimUR</h1>

        <div className="md:hidden text-white text-2xl cursor-pointer mr-4" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul
          className={`md:flex items-center gap-6 text-white font-semibold transition-all duration-300 ${
            isOpen ? 'block' : 'hidden'
          } md:block`}
        >
          <li>
            <Link to="/" className="hover:text-yellow-300 cursor-pointer">
              Home
            </Link>
          </li>
          <li>
            <Link to="/ShortUrl" className="hover:text-yellow-300 cursor-pointer">
              ShortUrl
            </Link>
          </li>
          <li>
            <Link to="/trackUrl" className="hover:text-yellow-300 cursor-pointer">
              TrackUrl
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-yellow-300 cursor-pointer">
              About
            </Link>
          </li>
          {currentUser ? (
            <li>
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar
                    className="w-8 h-8"
                    alt="user"
                    img={`https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png`}
                    rounded
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">Username : {currentUser.data.username}</span>
                </Dropdown.Header>
                <Link to="/dashboard?tab=profile">
                  <Dropdown.Item>Profile</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown>
            </li>
          ) : (
            <li>
              <Link to="/login">
                <button className="bg-yellow-400 text-blue-800 px-9 py-2 rounded hover:bg-yellow-300">
                  Log in
                </button>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
