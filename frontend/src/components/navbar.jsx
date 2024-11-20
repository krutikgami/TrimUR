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

        <ul className="hidden md:flex items-center gap-6 text-white font-semibold">
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
                className='flex items-center justify-center'
              >
                <Dropdown.Header>
                  <span className="block text-sm">Username : {currentUser.data.username}</span>
                </Dropdown.Header>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout} className=" ml-12 border-2 border-yellow-500 rounded-md p-2 w-auto">Logout</Dropdown.Item>
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
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } fixed top-0 right-0 bg-blue-700 text-white shadow-lg z-40 transform transition-all duration-300`}
        style={{
          width: '200px', 
          height: 'auto',
          maxHeight: 'calc(100vh - 4rem)', 
          padding: '1rem',
        }}
      >

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">TrimUR</h1>
          <FaTimes
            className="text-white text-2xl cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
        <ul className="space-y-4">
          <li>
            <Link to="/" className="hover:text-yellow-300 cursor-pointer" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/ShortUrl" className="hover:text-yellow-300 cursor-pointer" onClick={toggleMenu}>
              ShortUrl
            </Link>
          </li>
          <li>
            <Link to="/trackUrl" className="hover:text-yellow-300 cursor-pointer" onClick={toggleMenu}>
              TrackUrl
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-yellow-300 cursor-pointer" onClick={toggleMenu}>
              About
            </Link>
          </li>
          {currentUser ? (
            <>
              <li>
                <button className="hover:text-yellow-300" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">
                <button
                  className="bg-yellow-400 text-blue-800 px-4 py-2 rounded hover:bg-yellow-300"
                  onClick={toggleMenu}
                >
                  Log in
                </button>
              </Link>
            </li>
          )}
        </ul>
      </div>

      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-30"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
}

export default Navbar;
