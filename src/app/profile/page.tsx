export default function ComingSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 p-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">🚧 Feature Coming Soon</h1>
        <p className="text-gray-600 text-lg mb-6">
          We are working hard to bring you this feature. Stay tuned!
        </p>
        <div className="flex justify-center">
          <svg
            className="animate-spin h-8 w-8 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
