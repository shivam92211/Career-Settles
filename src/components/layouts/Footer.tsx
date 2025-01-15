// components/layout/Footer.tsx

export default function Footer() {
    return (
      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 My Awesome App. All rights reserved.</p>
          <div className="mt-4">
            <a href="#" className="mx-2 hover:text-blue-200">Privacy Policy</a>
            <a href="#" className="mx-2 hover:text-blue-200">Terms of Service</a>
          </div>
        </div>
      </footer>
    );
  }