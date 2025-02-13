// components/layout/Navbar.tsx
'use client';
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";


export default function Navbar() {
    const { data: session } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu visibility

    return (
        <nav className="bg-blue-600 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                {/* <h1 className="text-2xl font-bold">Career Settles</h1> */}
                <div className="container mx-auto flex flex-col sm:flex-row sm:justify-between items-center text-center">
                {/* Logo */}
                    <h1 className="text-2xl sm:ml-12 xl:ml-2 font-bold">Career Settles</h1>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden lg:flex space-x-4">
                    <li>
                        <Link href="/" className="hover:text-blue-200 transition-colors duration-200">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="hover:text-blue-200 transition-colors duration-200">
                            About
                        </Link>
                    </li>
                    {(session?.user.role === "ADMIN") && (
                    <li>
                        <Link href="/dashboard" className="hover:text-blue-200 transition-colors duration-200">
                            Dashboard
                        </Link>
                    </li>)}

                    <li>
                        <Link href="/question-papers" className="hover:text-blue-200 transition-colors duration-200">
                            Paper
                        </Link>
                    </li>
                    { session && (
                    <li>
                        <Button onClick={() => signOut()} className="hover:text-blue-200 transition-colors duration-200">
                            Sign Out
                        </Button>
                    </li>
                    )}
                    {!session && (
                        <li>
                            <Link href="/login" className="hover:text-blue-200 transition-colors duration-200">
                                Login
                            </Link>
                        </li>
                    )}
                </ul>

                {/* Mobile Menu Toggle Button */}
                <Button
                    variant="ghost"
                    className="lg:hidden p-2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </Button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden mt-4">
                    <ul className="flex flex-col space-y-2">
                        <li>
                            <Link
                                href="/"
                                className="block p-2 hover:bg-blue-500 rounded transition-colors duration-200"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="block p-2 hover:bg-blue-500 rounded transition-colors duration-200"
                            >
                                About
                            </Link>
                        </li>

                        {(session?.user.role === "ADMIN") && (
                            <li>
                                <Link href="/dashboard" 
                                className="block p-2 hover:bg-blue-500 rounded transition-colors duration-200">
                                    Dashboard
                                </Link>
                        </li>)}

                        <li>
                            <Link
                                href="/question-papers"
                                className="block p-2 hover:bg-blue-500 rounded transition-colors duration-200"
                            >
                                Paper
                            </Link>
                        </li>
                        { session && (
                    <li>
                        <Button onClick={() => signOut()}
                            className="block p-2 hover:bg-blue-500 rounded transition-colors duration-200">
                            Sign Out
                        </Button>
                    </li>
                    )}
                    {!session && (
                        <li>
                            <Link href="/login" 
                            className="block p-2 hover:bg-blue-500 rounded transition-colors duration-200">
                                Login
                            </Link>
                        </li>
                    )}
                    </ul>
                </div>
            )}
        </nav>
    );
}