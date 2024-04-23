"use client";

import React, { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const EmployeesPage: FC = () => {
  const employees = [
    {
      name: "Rizky Arsyansyah Rinjani",
      id: "1902839120",
    },
  ];

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee, idx) => (
            <TableRow key={idx}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>
                <Link
                  href={`/hr/employees/${employee.id}`}
                  className="bg-blue-500 px-2 py-1 md:px-3 md:py-1.5 rounded-sm text-xs md:text-sm text-white"
                >
                  Detail
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default EmployeesPage;
