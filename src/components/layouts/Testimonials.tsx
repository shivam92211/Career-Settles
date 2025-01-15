// components/Testimonials.tsx

export default function Testimonials() {
    const testimonials = [
      {
        name: "John Doe",
        role: "CEO of Company A",
        quote: "This app has transformed the way we do business. Highly recommended!",
      },
      {
        name: "Jane Smith",
        role: "CTO of Company B",
        quote: "The features are amazing and the support team is very responsive.",
      },
      {
        name: "Alice Johnson",
        role: "Product Manager of Company C",
        quote: "A game-changer for our team. We could not be happier!",
      },
    ];
  
    return (
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-12">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-lg">
                <p className="text-blue-700 italic mb-4">"{testimonial.quote}"</p>
                <h3 className="text-xl font-bold text-blue-900">{testimonial.name}</h3>
                <p className="text-blue-600">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }