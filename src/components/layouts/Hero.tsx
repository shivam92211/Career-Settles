// components/layout/Hero.tsx

export default function Hero() {
    return (
      <section className="bg-blue-50 py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-blue-900 mb-4">
            Welcome to My Awesome App
          </h1>
          <p className="text-xl text-blue-700 mb-8">
            A place where you can find amazing features and services.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
            Get Started
          </button>
        </div>
      </section>
    );
  }