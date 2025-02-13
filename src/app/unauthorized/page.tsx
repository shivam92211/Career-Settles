// src/app/unauthorized/page.tsx

export default function UnauthorizedPage() {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-red-500">Unauthorized</h1>
        <p className="mt-4 text-lg text-gray-600">
          You do not have permission to access this page.
        </p>
      </div>
    );
  }