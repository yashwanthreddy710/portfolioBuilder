import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import ProjectsSection from '../components/editor/ProjectsSection';
import EducationSection from '../components/editor/EducationSection';
import CustomSection from '../components/editor/CustomSection';
import Layout from '../components/Layout';

export default function PortfolioEditor() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    about: '',
    skills: '',
    certifications: '',
    theme: 'default',
    contact: { email: '', phone: '', linkedin: '', github: '' },
    slug: '',
  });
  const [role, setRole] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [projects, setProjects] = useState([]);
  const [education, setEducation] = useState([]);
  const [customSections, setCustomSections] = useState([]);

  const fetchMyPortfolio = async () => {
    try {
      const res = await API.get('/portfolio/me');
      if (res.data) {
        const { about, skills, certifications, contact, slug, theme, projects, education, customSections } = res.data;
        setForm({
          about,
          skills: skills.join(', '),
          certifications: certifications.join(', '),
          contact,
          slug,
          theme,
          role
        });
        setRole(role || '');
        setProjects(projects || []);
        setEducation(education || []);
        setCustomSections(customSections || []);
      }
    } catch (err) {
      console.log('No existing portfolio found.');
    }
  };

  useEffect(() => {
    if (!token) navigate('/');
    else fetchMyPortfolio();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('contact.')) {
      const key = name.split('.')[1];
      setForm((prev) => ({ ...prev, contact: { ...prev.contact, [key]: value } }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('about', form.about);
    formData.append('role', role);
    formData.append('slug', form.slug);
    formData.append('theme', form.theme);
    formData.append('skills', JSON.stringify(form.skills.split(',').map((s) => s.trim())));
    formData.append('certifications', JSON.stringify(form.certifications.split(',').map((c) => c.trim())));
    formData.append('contact', JSON.stringify(form.contact));
    formData.append('projects', JSON.stringify(
    projects.map(({ title, description, liveLink, githubLink }) => ({
        title,
        description,
        liveLink,
        githubLink
    }))
    ));


    formData.append('education', JSON.stringify(education || []));
    formData.append('experience', JSON.stringify([]));

    // Custom Sections
    formData.append(
    'customSections',
    JSON.stringify(
        (customSections || []).map((cs, i) => {
        const isFile = cs.image instanceof File;
        return {
            title: cs.title || '',
            description: cs.description || '',
            link: cs.link || '',
            image: isFile ? '' : cs.image || '',
        };
        })
    )
    );



    // Custom Section images
    (customSections || []).forEach((cs, i) => {
      if (cs.image instanceof File) {
        formData.append(`customImage_${i}`, cs.image);
      }
    });

    if (profileImage) formData.append('profileImage', profileImage);

    try {
      await API.post('/portfolio', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/dashboard');
    } catch (err) {
      console.log('Portfolio submission error:', err.response?.data || err.message);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Edit Your Portfolio</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              placeholder="your-name"
              className="w-full p-3 rounded bg-gray-800 text-white"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Role</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Enter your professional role"
              className="bg-gray-800 text-white p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">About You</label>
            <textarea
              name="about"
              value={form.about}
              onChange={handleChange}
              rows="3"
              className="w-full p-3 rounded bg-gray-800 text-white"
              placeholder="Tell us something about yourself"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Skills (comma separated)</label>
            <input
              type="text"
              name="skills"
              value={form.skills}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-white"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Certifications (comma separated)</label>
            <input
              type="text"
              name="certifications"
              value={form.certifications}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-white"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Contact Info</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                name="contact.email"
                value={form.contact.email}
                onChange={handleChange}
                placeholder="Email"
                className="p-3 rounded bg-gray-800 text-white"
              />
              <input
                type="text"
                name="contact.phone"
                value={form.contact.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="p-3 rounded bg-gray-800 text-white"
              />
              <input
                type="text"
                name="contact.linkedin"
                value={form.contact.linkedin}
                onChange={handleChange}
                placeholder="LinkedIn"
                className="p-3 rounded bg-gray-800 text-white"
              />
              <input
                type="text"
                name="contact.github"
                value={form.contact.github}
                onChange={handleChange}
                placeholder="GitHub"
                className="p-3 rounded bg-gray-800 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfileImage(e.target.files[0])}
              className="w-full p-2 rounded bg-gray-800 text-white"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Theme</label>
            <select
              name="theme"
              value={form.theme}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-white"
            >
              <option value="default">Default</option>
              <option value="minimal">Minimal</option>
              <option value="dark">Dark</option>
              <option value="professional">Professional</option>
            </select>
          </div>

          {/* Editor Sections */}
          <ProjectsSection projects={projects} setProjects={setProjects} />
          <EducationSection education={education} setEducation={setEducation} />
          <CustomSection customSections={customSections} setCustomSections={setCustomSections} />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded mt-6"
          >
            Save Portfolio
          </button>
        </form>
      </div>
    </Layout>
  );
}
