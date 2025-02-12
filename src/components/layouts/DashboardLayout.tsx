'use client';
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Menu, X } from "lucide-react"; // Icons for the sidebar toggle

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const { data: session } = useSession();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

    if (!session) {
        return <div>Please Login</div>;
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar Toggle Button (Mobile) */}
            <button
                className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md lg:hidden"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed lg:relative w-64 bg-white shadow-lg p-4 transform transition-transform duration-200 ease-in-out ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                } lg:translate-x-0 z-40 h-screen`}
            >
                <div className="flex items-center mb-6">
                    <Avatar className="mr-2">
                        <AvatarImage src={session.user?.image || ""} />
                        <AvatarFallback>{session.user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-lg font-bold">Dashboard</h2>
                </div>
                <ul className="space-y-2">
                    <li>
                        <Link
                            href="/dashboard/classes"
                            className="flex items-center p-2 hover:bg-gray-100 rounded transition-colors duration-200"
                        >
                            Class
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/dashboard/subjects"
                            className="flex items-center p-2 hover:bg-gray-100 rounded transition-colors duration-200"
                        >
                            Subjects
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/dashboard/chapters"
                            className="flex items-center p-2 hover:bg-gray-100 rounded transition-colors duration-200"
                        >
                            Chapters
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/dashboard/questions"
                            className="flex items-center p-2 hover:bg-gray-100 rounded transition-colors duration-200"
                        >
                            Questions
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/dashboard/question-papers"
                            className="flex items-center p-2 hover:bg-gray-100 rounded transition-colors duration-200"
                        >
                            Question Papers
                        </Link>
                    </li>
                </ul>
                <Button onClick={() => signOut()} className="w-full mt-4">
                    Sign Out
                </Button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Welcome back, {session.user?.name}!</CardTitle>
                        <CardDescription>Here's what's happening today.</CardDescription>
                    </CardHeader>
                    <CardContent>{children}</CardContent>
                </Card>
            </main>
        </div>
    );
};

export default DashboardLayout;