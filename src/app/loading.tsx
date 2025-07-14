export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="w-12 h-12 mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      <p className="text-blue-600 text-lg font-medium animate-pulse">Loading...</p>
    </div>
  );
}
