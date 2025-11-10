"use client";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="bg-red-50 border-2 border-red-300 text-red-800 px-6 py-4 rounded-lg max-w-md w-full shadow-lg">
        <div className="flex items-center mb-3">
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="font-bold text-lg">Error</p>
        </div>
        <p className="mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors font-semibold"
          >
            Coba Lagi
          </button>
        )}
      </div>
    </div>
  );
}
