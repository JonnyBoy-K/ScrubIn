import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { differenceInMinutes, format } from "date-fns";
import React from "react";
import { formatDurationHM } from "../helpers/time";
import { Timesheet } from "@scrubin/schemas";

export default function TimesheetTable({ timesheets }: { timesheets: Timesheet[] }) {
    const formatTimesheetWorkDuration = (timesheet: Timesheet) => {
        if (!timesheet.clockInTime || !timesheet.clockOutTime) return ""

        const breakDuration = (timesheet.startBreakTime && timesheet.endBreakTime) ?
        differenceInMinutes(new Date(timesheet.endBreakTime), new Date(timesheet.startBreakTime)) : 0;

        return formatDurationHM(new Date(timesheet.clockInTime), new Date(timesheet.clockOutTime), breakDuration);
    }
    return (
        <Table className="mt-4">
            <TableHeader className="bg-muted/50">
                <TableRow>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold">Clock in</TableHead>
                    <TableHead className="font-semibold">Start Break</TableHead>
                    <TableHead className="font-semibold">End Break</TableHead>
                    <TableHead className="font-semibold">Clock out</TableHead>
                    <TableHead className="font-semibold">Duration</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {timesheets && timesheets.map((timesheet: Timesheet) => {
                    return (
                        <TableRow key={timesheet.id}>
                            <TableCell>{new Date(timesheet.shift.startTime).toLocaleDateString()}</TableCell>
                            <TableCell>{timesheet.clockInTime ? format(new Date(timesheet.clockInTime), "hh:mm a") : "_ _"}</TableCell>
                            <TableCell>{timesheet.startBreakTime ? format(new Date(timesheet.startBreakTime), "hh:mm a") : "_ _"}</TableCell>
                            <TableCell>{timesheet.endBreakTime ? format(new Date(timesheet.endBreakTime), "hh:mm a") : "_ _"}</TableCell>
                            <TableCell>{timesheet.clockOutTime ? format(new Date(timesheet.clockOutTime), "hh:mm a") : "_ _"}</TableCell>
                            <TableCell>{formatTimesheetWorkDuration(timesheet)}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}
