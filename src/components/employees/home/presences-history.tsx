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

export const PresenceHistory: FC<{ className?: string }> = (props) => {
  const presences = [
    { in_time: "09:00", out_time: "17:00", date: "2000-10-10" },
  ];

  return (
    <div className={props.className}>
      {presences.length < 1 && (
        <div className="md:text-base text-xs text-center flex flex-row items-center justify-center">
          <LuInfo className="md:mr-1.5 sm:mr-1 md:w-5 mr-0.5 md:h-5 w-3 h-3" />
          Anda belum pernah malakukan presensi
        </div>
      )}

      {presences.length > 0 && (
        <>
          <div className="md:text-xl text-base font-semibold">
            Riwayat Presensi
          </div>

          <div className="flex flex-row justify-evenly items-center md:mt-4 mt-2 md:mb-3 mb-1">
            <Input type="date" placeholder="Tanggal Awal" />
            <Input
              type="date"
              placeholder="Tanggal Akhir"
              className="md:mx-4 mx-1.5"
            />
            <Button size="sm">Cari</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Datang</TableHead>
                <TableHead>Pulang</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {presences.map((presence, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    {dayjs(presence.date).format("DD MMMM YYYY")}
                  </TableCell>
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
