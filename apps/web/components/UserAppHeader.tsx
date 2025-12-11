'use client';
import Link from "next/link";
import {
    Bell,
    CalendarDays,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { useParams, usePathname } from "next/navigation";

export default function UserAppHeader() {
    const { id } = useParams<{ id: string }>();
    const href_dashboard = `/workspaces/${id}/user/dashboard`;
    const href_requests = `/workspaces/${id}/user/requests`;
    const href_calendar = `/workspaces/${id}/user/calendar`;

    const pathname = usePathname();

    return (

        <nav className="flex items-center justify-between px-6 py-4 border-b border-border">

            <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-[#3F37C9]" />
                    <span className="text-sm font-medium tracking-wide">Scrubin</span>
                </div>

                <div className="flex items-center gap-6">
                    <Link className={`text-sm ${pathname.startsWith(href_dashboard) ? 'text-foreground': 'text-muted-foreground'} hover:text-muted-foreground font-medium transition-colors`} 
                    href={href_dashboard}>
                        Dashboard
                    </Link>

                    <Link className={`text-sm ${pathname.startsWith(href_requests) ? 'text-foreground': 'text-muted-foreground'} hover:text-muted-foreground font-medium transition-colors`} 
                    href={href_requests}>
                        Requests
                    </Link>

                    <Link className={`text-sm ${pathname.startsWith(href_calendar) ? 'text-foreground': 'text-muted-foreground'} hover:text-muted-foreground font-medium transition-colors`} 
                    href={href_calendar}>
                        Calendar
                    </Link>

                    

                </div>
            </div>

            <div className="flex items-center gap-4">
                <Bell className="w-5 h-5 text-muted-foreground"/>
                <UserButton/>
            </div>

        </nav>


    );
}
