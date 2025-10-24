"use client";
import {
    UsersRound,
    Plus,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import React from "react";

export default function TeamPage() {
  // temporary mock data
  const members = [
    { id: 1, name: "Admin Annie", role: "Admin" },
    { id: 2, name: "SubAdmin Sam", role: "Sub-Admin" },
    { id: 3, name: "Regular Reggie", role: "Employee" },
  ];

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-gray-700">
          <UsersRound />
          <h1 className="text-2xl font-semibold text-gray-700">Team</h1>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-[#3F37C9] text-white">
          <Plus size={18} /> Add member
        </button>
      </header>

      <div className="overflow-x-auto rounded-2xl border text-gray-500">
        <table className="min-w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-gray-700">Name</th>
              <th className="p-3 text-gray-700">Role</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id} className="border-t">
                <td className="p-3">{m.name}</td>
                <td className="p-3">{m.role}</td>
                <td className="p-3"><ChevronDown size={18} className="text-gray-700" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
