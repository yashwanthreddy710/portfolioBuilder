import Sidebar from './Sidebar';


export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-950 text-white p-6 min-h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
}


