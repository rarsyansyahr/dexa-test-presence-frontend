import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import { LuInfo } from "react-icons/lu";
import { Label } from "@/components/ui/label";

const PresenceSummariesPage: FC = (props) => {
  const presences = [
    {
      name: "Rizky Arsyansyah Rinjani",
      in_time: "09:00",
      out_time: "17:00",
      date: "2000-10-10",
    },
  ];

  return (
    <div className="">
      {presences.length < 1 && (
        <div className="md:text-base text-xs text-center flex flex-row items-center justify-center">
          <LuInfo className="md:mr-1.5 sm:mr-1 md:w-5 mr-0.5 md:h-5 w-3 h-3" />
          Karyawan Anda belum pernah malakukan presensi
        </div>
      )}

      {presences.length > 0 && (
        <>
          <div className="flex flex-row justify-evenly md:justify-center gap-2 items-end md:mt-4 mt-2 md:mb-3 mb-2">
            <div>
              <Label id="startDate" className="md:text-base text-sm">
                Tanggal Awal
              </Label>
              <Input
                id="startDate"
                className="md:text-base text-sm"
                type="date"
                placeholder="Tanggal Awal"
              />
            </div>
            <div>
              <Label id="endDate">Tanggal Akhir</Label>
              <Input id="endDate" type="date" placeholder="Tanggal Akhir" />
            </div>
            <Button size="sm">Cari</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Datang</TableHead>
                <TableHead>Pulang</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {presences.map((presence, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    {dayjs(presence.date).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>{presence.name}</TableCell>
                  <TableCell>{presence.in_time}</TableCell>
                  <TableCell>{presence.out_time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

export default PresenceSummariesPage;
