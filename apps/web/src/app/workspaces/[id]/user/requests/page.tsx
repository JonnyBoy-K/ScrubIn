"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import React, { useState } from "react";

export default function Page() {
    type RequestStatus = "pending" | "approved" | "rejected";
    type ShiftDetails = {
        date: string;
        time: string;
        role?: string;
        location?: string;
    };
    type TradeRequest = {
        id: string;
        requesterName: string;
        requestedWithName: string;
        giving: ShiftDetails;
        taking: ShiftDetails;
        status: RequestStatus;
        managerStatus?: RequestStatus;
    };
    type CoverRequest = {
        id: string;
        requesterName: string;
        role: string;
        shift: ShiftDetails;
        status: RequestStatus;
        managerStatus?: RequestStatus;
    };
    type OutgoingTradeRequest = TradeRequest & { managerStatus: RequestStatus };
    type OutgoingCoverRequest = CoverRequest & { managerStatus: RequestStatus };

    const [tradeRequests, setTradeRequests] = useState<TradeRequest[]>([
        {
            id: "t1",
            requesterName: "Alex Johnson",
            requestedWithName: "You",
            giving: {
                date: "Dec 5, 2025",
                time: "9:00 AM - 5:00 PM",
                role: "Front Desk",
            },
            taking: {
                date: "Dec 12, 2025",
                time: "9:00 AM - 5:00 PM",
                role: "Front Desk",
            },
            status: "pending",
        },
        {
            id: "t2",
            requesterName: "Morgan Lee",
            requestedWithName: "You",
            giving: {
                date: "Dec 7, 2025",
                time: "10:00 AM - 6:00 PM",
                role: "Vet Tech",
            },
            taking: {
                date: "Dec 14, 2025",
                time: "10:00 AM - 6:00 PM",
                role: "Vet Tech",
            },
            status: "approved",
            managerStatus: "pending",
        },
    ]);

    const [coverRequests, setCoverRequests] = useState<CoverRequest[]>([
        {
            id: "c1",
            requesterName: "Jamie Rivera",
            role: "Front Desk",
            shift: {
                date: "Dec 6, 2025",
                time: "12:00 PM - 8:00 PM",
                role: "Front Desk",
            },
            status: "pending",
        },
        {
            id: "c2",
            requesterName: "Taylor Smith",
            role: "Vet Tech",
            shift: {
                date: "Dec 9, 2025",
                time: "7:00 AM - 3:00 PM",
                role: "Vet Tech",
            },
            status: "rejected",
        },
    ]);

    const setStatusBadge = (status: RequestStatus) => {
        if (status === "approved") return <Badge variant="secondary">Approved</Badge>;
        if (status === "rejected") return <Badge variant="destructive">Rejected</Badge>;
        return <Badge variant="outline">Pending</Badge>;
    };
    const setManagerBadge = (status: RequestStatus) => {
        if (status === "approved") return <Badge variant="secondary">Approved</Badge>;
        if (status === "rejected") return <Badge variant="destructive">Rejected</Badge>;
        return <Badge variant="outline">Pending</Badge>;
    };

    const [outgoingTradeRequests] = useState<OutgoingTradeRequest[]>([
        {
            id: "ot1",
            requesterName: "You",
            requestedWithName: "Alex Johnson",
            giving: {
                date: "Dec 11, 2025",
                time: "9:00 AM - 5:00 PM",
                role: "Front Desk",
            },
            taking: {
                date: "Dec 18, 2025",
                time: "9:00 AM - 5:00 PM",
                role: "Front Desk",
            },
            status: "pending",
            managerStatus: "pending",
        },
        {
            id: "ot2",
            requesterName: "You",
            requestedWithName: "Morgan Lee",
            giving: {
                date: "Dec 12, 2025",
                time: "10:00 AM - 6:00 PM",
                role: "Vet Tech",
            },
            taking: {
                date: "Dec 19, 2025",
                time: "10:00 AM - 6:00 PM",
                role: "Vet Tech",
            },
            status: "approved",
            managerStatus: "approved",
        },
    ]);
    const [outgoingCoverRequests] = useState<OutgoingCoverRequest[]>([
        {
            id: "oc1",
            requesterName: "You",
            role: "Front Desk",
            shift: {
                date: "Dec 10, 2025",
                time: "12:00 PM - 8:00 PM",
                role: "Front Desk",
            },
            status: "pending",
            managerStatus: "pending",
        },
        {
            id: "oc2",
            requesterName: "You",
            role: "Vet Tech",
            shift: {
                date: "Dec 15, 2025",
                time: "7:00 AM - 3:00 PM",
                role: "Vet Tech",
            },
            status: "approved",
            managerStatus: "rejected",
        },
    ]);

    const approveTrade = (id: string) => {
        setTradeRequests((prev) =>
            prev.map((r) =>
                r.id === id ? { ...r, status: "approved", managerStatus: "pending" } : r
            )
        );
    };
    const rejectTrade = (id: string) => {
        setTradeRequests((prev) =>
            prev.map((r) => (r.id === id ? { ...r, status: "rejected" } : r))
        );
    };
    const approveCover = (id: string) => {
        setCoverRequests((prev) =>
            prev.map((r) =>
                r.id === id ? { ...r, status: "approved", managerStatus: "pending" } : r
            )
        );
    };
    const rejectCover = (id: string) => {
        setCoverRequests((prev) =>
            prev.map((r) => (r.id === id ? { ...r, status: "rejected" } : r))
        );
    };

    return (
        <main className="mt-4">
            <div className="w-full flex justify-end px-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="flex items-center gap-2 text-white">
                            <Plus />
                            New Request
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create a new request</DialogTitle>
                            <DialogDescription>
                                Select a request type. Options coming soon.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex gap-2">
                            <Button disabled>Shift Request</Button>
                            <Button variant="outline" disabled>Meeting Request</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <Tabs className="flex w-full justify-center items-center" defaultValue="incoming-requests">
                <TabsList>
                    <TabsTrigger className="p-4" value="incoming-requests">Incoming Requests</TabsTrigger>
                    <TabsTrigger className="p-4" value="outgoing-requests">Outgoing Requests</TabsTrigger>
                </TabsList>

                <TabsContent className="w-full flex justify-center" value="incoming-requests">

                    <div className="w-1/2 space-y-4">
                        {tradeRequests.map((req) => (
                            <Card key={req.id} className="hover:bg-gray-50 hover:cursor-pointer">
                                <CardHeader className="flex items-center justify-between">
                                    <CardTitle className="font-semibold">
                                        Shift Trade: {req.requesterName} ↔ {req.requestedWithName}
                                    </CardTitle>
                                    <div className="flex items-center gap-3">
                                        {setStatusBadge(req.status)}
                                        {req.status === "approved" && req.managerStatus && (
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <span>Manager:</span>
                                                {setManagerBadge(req.managerStatus)}
                                            </div>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="rounded-md border p-3">
                                            <div className="text-sm font-medium">Giving</div>
                                            <div className="text-sm text-muted-foreground">
                                                {req.giving.date} • {req.giving.time}
                                            </div>
                                            {req.giving.role && (
                                                <div className="text-xs text-muted-foreground">
                                                    Role: {req.giving.role}
                                                </div>
                                            )}
                                        </div>
                                        <div className="rounded-md border p-3">
                                            <div className="text-sm font-medium">Taking</div>
                                            <div className="text-sm text-muted-foreground">
                                                {req.taking.date} • {req.taking.time}
                                            </div>
                                            {req.taking.role && (
                                                <div className="text-xs text-muted-foreground">
                                                    Role: {req.taking.role}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            onClick={() => approveTrade(req.id)}
                                            disabled={req.status !== "pending"}
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => rejectTrade(req.id)}
                                            disabled={req.status !== "pending"}
                                        >
                                            Reject
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        {coverRequests.map((req) => (
                            <Card key={req.id} className="hover:bg-gray-50 hover:cursor-pointer">
                                <CardHeader className="flex items-center justify-between">
                                    <CardTitle className="font-semibold">
                                        Cover Request: {req.requesterName} • {req.role}
                                    </CardTitle>
                                    <div className="flex items-center gap-3">
                                        {setStatusBadge(req.status)}
                                        {req.status === "approved" && req.managerStatus && (
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <span>Manager:</span>
                                                {setManagerBadge(req.managerStatus)}
                                            </div>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="rounded-md border p-3">
                                        <div className="text-sm font-medium">Shift</div>
                                        <div className="text-sm text-muted-foreground">
                                            {req.shift.date} • {req.shift.time}
                                        </div>
                                        {req.shift.role && (
                                            <div className="text-xs text-muted-foreground">
                                                Role: {req.shift.role}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            onClick={() => approveCover(req.id)}
                                            disabled={req.status !== "pending"}
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => rejectCover(req.id)}
                                            disabled={req.status !== "pending"}
                                        >
                                            Reject
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent className="w-full flex justify-center" value="outgoing-requests">
                    <div className="w-1/2 space-y-4">
                        {outgoingTradeRequests.map((req) => (
                            <Card key={req.id} className="hover:bg-gray-50 hover:cursor-pointer">
                                <CardHeader className="flex items-center justify-between">
                                    <CardTitle className="font-semibold">
                                        Shift Trade: {req.requesterName} ↔ {req.requestedWithName}
                                    </CardTitle>
                                    <div className="flex items-center gap-3">
                                        {setStatusBadge(req.status)}
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <span>Manager:</span>
                                            {setManagerBadge(req.managerStatus)}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="rounded-md border p-3">
                                            <div className="text-sm font-medium">Giving</div>
                                            <div className="text-sm text-muted-foreground">
                                                {req.giving.date} • {req.giving.time}
                                            </div>
                                            {req.giving.role && (
                                                <div className="text-xs text-muted-foreground">
                                                    Role: {req.giving.role}
                                                </div>
                                            )}
                                        </div>
                                        <div className="rounded-md border p-3">
                                            <div className="text-sm font-medium">Taking</div>
                                            <div className="text-sm text-muted-foreground">
                                                {req.taking.date} • {req.taking.time}
                                            </div>
                                            {req.taking.role && (
                                                <div className="text-xs text-muted-foreground">
                                                    Role: {req.taking.role}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        {outgoingCoverRequests.map((req) => (
                            <Card key={req.id} className="hover:bg-gray-50 hover:cursor-pointer">
                                <CardHeader className="flex items-center justify-between">
                                    <CardTitle className="font-semibold">
                                        Cover Request: {req.requesterName} • {req.role}
                                    </CardTitle>
                                    <div className="flex items-center gap-3">
                                        {setStatusBadge(req.status)}
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <span>Manager:</span>
                                            {setManagerBadge(req.managerStatus)}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="rounded-md border p-3">
                                        <div className="text-sm font-medium">Shift</div>
                                        <div className="text-sm text-muted-foreground">
                                            {req.shift.date} • {req.shift.time}
                                        </div>
                                        {req.shift.role && (
                                            <div className="text-xs text-muted-foreground">
                                                Role: {req.shift.role}
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

            </Tabs>
        </main>
    );
}