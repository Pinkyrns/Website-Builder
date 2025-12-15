export default function Topbar() {
  return (
    <header className="flex justify-between items-center mb-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Our Websites
        </h2>
        <p className="text-sm text-gray-500">
          Manage and edit your websites
        </p>
      </div>

      <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700">
        + New Website
      </button>
    </header>
  );
}
