// src/app/page.tsx

import Hero from "@/components/layouts/Hero";
import Features from "@/components/layouts/Features";
import Testimonials from "@/components/layouts/Testimonials";

export default async function Home() {
  // const session = await getServerSession(authOptions)

  
    return (
      <main>
        <div>
        <Hero />
        <Features />
        <Testimonials />
      </div>
      </main>
      
    );
  }





