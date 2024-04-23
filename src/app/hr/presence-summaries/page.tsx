"use client";

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
import { LuInfo } from "react-icons/lu";
import { Label } from "@/components/ui/label";
import { usePresences } from "@/hooks";
import { Cookie } from "@/lib";
import { z } from "zod";
import { SearchProps } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  started_at: z.string(),
  ended_at: z.string(),
});

const PresenceSummariesPage: FC = (props) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<SearchProps>({
    resolver: zodResolver(schema),
  });

  const { isLoading, presences, getPresences } = usePresences();

  const onSearch = async (values: SearchProps) => {
    getPresences({ employeeId: Cookie.getEmployeeId(), ...values });
  };

  if (isLoading) return <div>Loading</div>;

  return (
    <div className="">
      {!presences && (
        <div className="md:text-base text-xs text-center flex flex-row items-center justify-center">
          <LuInfo className="md:mr-1.5 sm:mr-1 md:w-5 mr-0.5 md:h-5 w-3 h-3" />
          Karyawan Kamu belum pernah malakukan presensi
        </div>
      )}

      {presences && (
        <>
          <div className="font-semibold md:text-xl text-base">
            Riwayat Presensi
          </div>

          <form onSubmit={handleSubmit(onSearch)}>
            <div className="flex flex-col md:flex-row justify-center md:justify-center gap-2 items-start md:items-end md:mt-4 mt-2 md:mb-3 mb-2">
              <div>
                <Label id="startDate" className="md:text-base text-sm">
                  Tanggal Awal
                </Label>
                <Input
                  id="startDate"
                  className="md:text-base text-sm"
                  type="date"
                  {...register("started_at")}
                />
              </div>
              <div>
                <Label id="endDate">Tanggal Akhir</Label>
                <Input id="endDate" type="date" {...register("ended_at")} />
              </div>
              <Button type="submit" size="sm" disabled={!isValid}>
                Cari
              </Button>
            </div>
          </form>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>
                  Tanggal
                  <div className="mt-1 md:hidden">Datang | Pulang</div>
                </TableHead>
                <TableHead className="md:block hidden">Datang</TableHead>
                <TableHead className="md:block hidden">Pulang</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {presences?.map((presence, idx) => (
                <TableRow key={idx}>
                  <TableCell>{presence.name}</TableCell>
                  <TableCell>
                    {presence.date}
                    <div className="mt-1 md:hidden">
                      {presence.in_time} | {presence.out_time}
                    </div>
                  </TableCell>
                  <TableCell className="md:block hidden">
                    {presence.in_time}
                  </TableCell>
                  <TableCell className="md:block hidden">
                    {presence.out_time}
                  </TableCell>
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
