import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../services/api';
import { FiLinkedin, FiGithub } from 'react-icons/fi';
import { HiMenu, HiX } from 'react-icons/hi';

export default function PublicPortfolio() {
  const { slug } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [navOpen, setNavOpen] = useState(false);

  const fetchPortfolio = async () => {
    try {
      const res = await API.get(`/portfolio/profile/${slug}`);
      setPortfolio(res.data);
    } catch (err) {
      console.error('Error loading portfolio:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, [slug]);

  if (loading)
    return <div className="min-h-screen bg-gray-900 text-white p-6">Loading...</div>;
  if (!portfolio)
    return <div className="min-h-screen bg-gray-900 text-white p-6">Portfolio not found.</div>;

  return (
    <div className="bg-[#02274d] text-white min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-[#001933] shadow-lg sticky top-0 z-50">
        <h1 className="text-white text-xl font-bold md:3xl">Portfolio</h1>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-6 text-white">
          {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`} className="hover:text-cyan-400 duration-200">
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger menu */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setNavOpen(!navOpen)}
        >
          {navOpen ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      {/* Mobile dropdown nav */}
      {navOpen && (
        <ul className="md:hidden bg-[#001933] px-6 py-4 space-y-2">
          {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="block text-white hover:text-cyan-400 duration-200"
                onClick={() => setNavOpen(false)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* Hero Section */}
      <section id="home" className="flex flex-col md:flex-row items-center justify-between px-6 py-16">
        <div className="md:w-1/2 text-center md:text-left space-y-4">
          <h2 className="text-2xl">
            Hello, It's Me{' '}
            <span className="text-4xl font-bold text-cyan-200">{slug}</span>
          </h2>
          <h3 className="text-xl">
            And I'm a{' '}
            <span className="text-purple-400 font-bold text-3xl">{portfolio.role}</span>
          </h3>
          <p className="text-gray-300 break-all whitespace-normal overflow-hidden w-full">{portfolio.about}</p>

          <div className="flex justify-center md:justify-start gap-4 pt-2 items-center flex-wrap">
            <span className="text-xl">Let's Connect:</span>
            <a href={portfolio.contact.linkedin} target="_blank">
              <FiLinkedin className="text-white bg-blue-700 text-3xl p-1 rounded" />
            </a>
            <a href={portfolio.contact.github} target="_blank">
              <FiGithub className="text-white bg-black text-3xl p-1 rounded" />
            </a>
          </div>
        </div>

        {/* Show one image on mobile, two on md+ */}
        <div className="md:w-1/2 flex justify-center pt-8 md:pt-0 gap-6">
          {portfolio.profileImage && (
            <>
              <img
                src={`https://portfoliobuilder-nz9o.onrender.com/uploads/${portfolio.profileImage}`}
                alt="Profile"
                className="w-48 h-48 object-cover rounded-full border-8 border-purple-400 shadow-xl md:w-64 md:h-64"
              />

            </>
          )}
        </div>
      </section>

      {/* About Section */}
<section id="about" className="flex flex-col md:flex-row items-center justify-between px-10 py-16">
  <div className="hidden md:flex md:w-1/2 justify-center">
    {portfolio.profileImage && (
      <img
        src={`https://portfoliobuilder-nz9o.onrender.com/uploads/${portfolio.profileImage}`}
        alt="Profile"
        className="w-64 h-64 object-cover rounded-full border-8 border-purple-500 shadow-xl"
      />
    )}
  </div>

  <div className="md:w-1/2 mt-6 md:mt-0 md:pl-10 text-gray-300">
    <h2 className="text-3xl text-purple-400 font-bold mb-4">About Me</h2>
    <p className="text-gray-300 break-all whitespace-normal w-full overflow-hidden">
      {portfolio.about}
    </p>
  </div>
</section>


      {/* Skills */}
      <section id="skills" className="px-6 py-16">
        <h2 className="text-3xl font-bold text-purple-400 mb-6">Skills</h2>
        <div className="flex flex-wrap gap-3">
          {portfolio.skills.map((skill, i) => (
            <span key={i} className="bg-cyan-700 px-4 py-2 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Projects */}
      {portfolio.projects.length > 0 && (
        <section id="projects" className="px-6 py-16">
          <h2 className="text-3xl font-bold text-purple-400 mb-6">Projects</h2>
          <div className="space-y-6">
            {portfolio.projects.map((proj, i) => (
              <div key={i} className="bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold text-white">{proj.title}</h3>
                <p className="text-gray-300 break-all whitespace-normal overflow-hidden w-full">{proj.description}</p>
                <div className="mt-2">
                  {proj.liveLink && (
                    <a
                      href={proj.liveLink}
                      className="text-cyan-400 mr-4 hover:underline"
                      target="_blank"
                    >
                      Live
                    </a>
                  )}
                  {proj.githubLink && (
                    <a
                      href={proj.githubLink}
                      className="text-cyan-400 hover:underline"
                      target="_blank"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {portfolio.customSections.map((sec, i) => (
        <section key={i} className="px-6 py-16">
          <h2 className="text-3xl font-bold text-purple-400 mb-6">{sec.title}</h2>
          <div className="bg-gray-800 p-6 rounded shadow">
            <p className="text-gray-300 break-all whitespace-normal overflow-hidden w-full">{sec.description}</p>
            {sec.link && (
              <a href={sec.link} target="_blank" className="text-cyan-400 block mt-2">
                Visit
              </a>
            )}
            {sec.image && (
              <img
                src={`https://portfoliobuilder-nz9o.onrender.com/uploads/${sec.image}`}
                alt="custom"
                className="mt-4 w-32 h-auto rounded"
              />
            )}
          </div>
        </section>
      ))}

      {/* Contact */}
      <section id="contact" className="px-6 py-16">
        <h2 className="text-3xl font-bold text-cyan-400 mb-6">Contact Me</h2>
        <div className="text-gray-300 space-y-2">
          <p>Email: {portfolio.contact.email}</p>
          <p>Phone: {portfolio.contact.phone}</p>
          <p>
            LinkedIn:{' '}
            <a href={portfolio.contact.linkedin} target="_blank" className="text-cyan-400">
              {portfolio.contact.linkedin}
            </a>
          </p>
          <p>
            GitHub:{' '}
            <a href={portfolio.contact.github} target="_blank" className="text-cyan-400">
              {portfolio.contact.github}
            </a>
          </p>
        </div>
      </section>

     {/* Footer */}
      <footer className="bg-[#001933] text-gray-400 text-sm text-center py-6 px-4">
        <p>
          &copy; {new Date().getFullYear()} {slug}. All rights reserved.
        </p>
        <div className="flex justify-center gap-4 mt-2 text-xl ">
          {portfolio.contact.linkedin && (
            <a
              href={portfolio.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors border rounded-full bg-blue-800 p-1"
            >
              <FiLinkedin />
            </a>
          )}
          {portfolio.contact.github && (
            <a
              href={portfolio.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors border rounded-full bg-black p-1"
            >
              <FiGithub />
            </a>
          )}
        </div>
      </footer>



    </div>
  );
}

