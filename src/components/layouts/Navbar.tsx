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
                <div className="flex items-center">
                <img src="/logo.png" alt="Edu Smart Logo" className="h-8 w-auto" />
                <h1 className="text-2xl font-bold pl-2 ml-2">Edu Smart</h1>
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
                        </li>
                    )}
                    <li>
                        <Link href="/question-papers" className="hover:text-blue-200 transition-colors duration-200">
                            Paper
                        </Link>
                    </li>
                    {/* Conditional Rendering for Login/Sign Up or Sign Out */}
                    {!session ? (
                        <>
                            <li>
                                <Link href="/register" className="hover:text-blue-200 transition-colors duration-200">
                                    Sign Up
                                </Link>
                            </li>
                            <li>
                                <Link href="/login" className="hover:text-blue-200 transition-colors duration-200">
                                    Login
                                </Link>
                            </li>
                        </>
                    ) : (
                        <li>
                            <button onClick={() => signOut()} className="hover:text-blue-200 transition-colors duration-200 bg-transparent border-none">
                                Sign Out
                            </button>
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
                                <Link
                                    href="/dashboard"
                                    className="block p-2 hover:bg-blue-500 rounded transition-colors duration-200"
                                >
                                    Dashboard
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link
                                href="/question-papers"
                                className="block p-2 hover:bg-blue-500 rounded transition-colors duration-200"
                            >
                                Paper
                            </Link>
                        </li>
                        {/* Conditional Rendering for Login/Sign Up or Sign Out */}
                        {!session ? (
                            <>
                                <li>
                                    <Link
                                        href="/register"
                                        className="block p-2 hover:bg-blue-500 rounded transition-colors duration-200"
                                    >
                                        Sign Up
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/login"
                                        className="block p-2 hover:bg-blue-500 rounded transition-colors duration-200"
                                    >
                                        Login
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <button
                                    onClick={() => signOut()}
                                    className="block p-2 hover:bg-blue-500 rounded transition-colors duration-200 w-full text-left bg-transparent border-none"
                                >
                                    Sign Out
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
}