import { useState } from 'react';

export default function EducationSection({ education, setEducation }) {
  const [entry, setEntry] = useState({
    degree: '',
    institution: '',
    startYear: '',
    endYear: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry({ ...entry, [name]: value });
  };

  const addEntry = () => {
    const { degree, institution, startYear, endYear } = entry;
    if (!degree || !institution || !startYear || !endYear) return;
    setEducation([...education, entry]);
    setEntry({ degree: '', institution: '', startYear: '', endYear: '' });
  };

  const removeEntry = (index) => {
    const updated = [...education];
    updated.splice(index, 1);
    setEducation(updated);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow mt-6">
      <h3 className="text-xl font-semibold mb-4">Education</h3>

      {education.map((edu, index) => (
        <div key={index} className="border border-gray-700 p-4 rounded mb-3">
          <div className="flex justify-between">
            <p className="text-white font-semibold">{edu.degree} at {edu.institution}</p>
            <button onClick={() => removeEntry(index)} className="text-red-400 hover:text-red-500 text-sm">Remove</button>
          </div>
          <p className="text-gray-400 text-sm">From {edu.startYear} to {edu.endYear}</p>
        </div>
      ))}

      <div className="space-y-2 mt-4">
        <input
          type="text"
          name="degree"
          value={entry.degree}
          onChange={handleChange}
          placeholder="Degree"
          className="w-full p-2 rounded bg-gray-700"
        />
        <input
          type="text"
          name="institution"
          value={entry.institution}
          onChange={handleChange}
          placeholder="Institution"
          className="w-full p-2 rounded bg-gray-700"
        />
        <input
          type="text"
          name="startYear"
          value={entry.startYear}
          onChange={handleChange}
          placeholder="Start Year"
          className="w-full p-2 rounded bg-gray-700"
        />
        <input
          type="text"
          name="endYear"
          value={entry.endYear}
          onChange={handleChange}
          placeholder="End Year"
          className="w-full p-2 rounded bg-gray-700"
        />
        <button
          type="button"
          onClick={addEntry}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Education
        </button>
      </div>
    </div>
  );
}
