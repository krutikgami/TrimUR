import React from 'react';
import ProfileImg from "../assets/Profile_Url.jpg"
function About() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-yellow-50 items-center justify-center text-black px-6">

      <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">

        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-700">
          <img src={ProfileImg} alt="Profile" className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <h1 className="text-3xl font-semibold">My name is Krutik Gami.</h1>
          <p className="text-lg max-w-xl">
            I am a passionate MERN Stack developer, always eager to learn new technologies and improve my skills. I enjoy working on meaningful projects that make a difference.
          </p>
          <p className="italic text-gray-600">
            "The only way to do great work is to love what you do." – Steve Jobs
          </p>
        </div>
      </div>
      <div className="flex space-x-6 mt-8">
        <a href="https://github.com/krutikgami" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
          <i className="fab fa-github text-3xl"></i>
        </a>
        <a href="https://www.linkedin.com/in/krutik-gami-168477257/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
          <i className="fab fa-linkedin text-3xl"></i>
        </a>
      </div>
    </div>
  );
}

export default About;
