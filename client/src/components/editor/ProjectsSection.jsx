
import { useState } from 'react';

export default function ProjectsSection({ projects, setProjects }) {
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    liveLink: '',
    githubLink: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleAdd = () => {
    if (!newProject.title || !newProject.description) return;
    setProjects([...projects, newProject]);
    setNewProject({ title: '', description: '', liveLink: '', githubLink: ''});
  };

  const handleRemove = (index) => {
    const updated = [...projects];
    updated.splice(index, 1);
    setProjects(updated);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow mt-6">
      <h3 className="text-xl font-semibold mb-4">Projects</h3>

      {projects.map((proj, index) => (
        <div key={index} className="border border-gray-700 p-4 rounded mb-4">
          <div className="flex justify-between">
            <h4 className="font-bold text-lg">{proj.title}</h4>
            <button
              onClick={() => handleRemove(index)}
              className="text-red-400 hover:text-red-500 text-sm"
            >
              Remove
            </button>
          </div>
          <p className=" text-gray-300 break-words">{proj.description}</p>
          <div className="text-sm mt-2">
            {proj.liveLink && <a href={proj.liveLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 mr-2">Live</a>}
            {proj.githubLink && <a href={proj.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-400">GitHub</a>}
          </div>
        </div>
      ))}

      {/* Add new project form */}
      <div className="space-y-2 mt-4">
        <input
          type="text"
          name="title"
          value={newProject.title}
          onChange={handleChange}
          placeholder="Project Title"
          className="w-full p-2 rounded bg-gray-700"
        />
        <textarea
          name="description"
          value={newProject.description}
          onChange={handleChange}
          placeholder="Short Description"
          rows={2}
          className="w-full p-2 rounded bg-gray-700 text-gray-300 break-words"
        />
        <input
          type="text"
          name="liveLink"
          value={newProject.liveLink}
          onChange={handleChange}
          placeholder="Live Site URL"
          className="w-full p-2 rounded bg-gray-700"
        />
        <input
          type="text"
          name="githubLink"
          value={newProject.githubLink}
          onChange={handleChange}
          placeholder="GitHub Repo URL"
          className="w-full p-2 rounded bg-gray-700"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Project
        </button>
      </div>
    </div>
  );
}
