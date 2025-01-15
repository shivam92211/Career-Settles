// src/app/page.tsx

// import { getServerSession } from "next-auth";
// import { authOptions } from "./api/auth/[...nextauth]/route";
// import { LoginButton, LogoutButton } from "@/components/auth";
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



//   return(
//     <main>
//       <div>
//         <LoginButton /><br/>
//         <LogoutButton /><br/>
//         Hello World
//       </div>
//       <pre>
//         {JSON.stringify(session)}
//       </pre>
//     </main>
//   )
  
// }


// app/page.tsx



