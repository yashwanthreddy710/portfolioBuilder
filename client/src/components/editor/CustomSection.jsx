import { useState } from 'react';

export default function CustomSection({ customSections, setCustomSections }) {
  const [entry, setEntry] = useState({
    title: '',
    description: '',
    link: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setEntry(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const addEntry = () => {
    if (!entry.title || !entry.description) return;
    setCustomSections(prev => [...prev, entry]);
    setEntry({ title: '', description: '', link: '', image: null });
  };

  const removeEntry = (index) => {
    const updated = [...customSections];
    updated.splice(index, 1);
    setCustomSections(updated);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow mt-6">
      <h3 className="text-xl font-semibold mb-4">Custom Sections</h3>

      {customSections.map((section, i) => (
        <div key={i} className="border border-gray-700 p-4 rounded mb-4">
          <div className="flex justify-between">
            <p className="font-semibold">{section.title}</p>
            <button onClick={() => removeEntry(i)} className="text-red-400 text-sm">Remove</button>
          </div>
          <p className="text-gray-300">{section.description}</p>
          {section.link && <a href={section.link} className="text-blue-400 text-sm" target="_blank">Visit Link</a>}
          {section.image && typeof section.image === 'string' && (
            <img src={section.image} alt="custom" className="mt-2 w-32 h-auto object-cover rounded" />
          )}
        </div>
      ))}

      <div className="space-y-2 mt-4">
        <input name="title" value={entry.title} onChange={handleChange} placeholder="Title"
               className="w-full p-2 rounded bg-gray-700" />
        <textarea name="description" value={entry.description} onChange={handleChange}
                  placeholder="Description" rows={2} className="w-full p-2 rounded bg-gray-700 text-gray-300 break-words" />
        <input name="link" value={entry.link} onChange={handleChange} placeholder="Optional Link"
               className="w-full p-2 rounded bg-gray-700" />
        <input type="file" accept="image/*" onChange={handleImageChange}
               className="w-full p-2 rounded bg-gray-700" />
        <button type="button" onClick={addEntry}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Add Custom Section
        </button>
      </div>
    </div>
  );
}
