// components/layout/Features.tsx

export default function Features() {
    const features = [
      {
        icon: "🚀",
        title: "Fast Performance",
        description: "Our app is optimized for speed and efficiency.",
      },
      {
        icon: "🔒",
        title: "Secure & Reliable",
        description: "Your data is safe with our advanced security measures.",
      },
      {
        icon: "🎨",
        title: "Beautiful Design",
        description: "Enjoy a modern and intuitive user interface.",
      },
    ];
  
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-blue-50 rounded-lg shadow-lg">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-blue-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }