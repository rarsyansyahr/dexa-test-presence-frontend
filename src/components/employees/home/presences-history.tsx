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

export const PresenceHistory: FC<{ className?: string }> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<SearchProps>({
    resolver: zodResolver(schema),
  });

  const { isLoading, presences, getPresences } = usePresences({
    employeeId: Cookie.getEmployeeId(),
  });

  const onSearch = async (values: SearchProps) => {
    getPresences({ employeeId: Cookie.getEmployeeId(), ...values });
  };

  if (isLoading) return <div>Loading</div>;

  return (
    <div className={props.className}>
      {/* @ts-ignore */}
      {presences?.length < 1 && (
        <div className="md:text-base text-xs text-center flex flex-row items-center justify-center">
          <LuInfo className="md:mr-1.5 sm:mr-1 md:w-5 hidden md:block mr-0.5 md:h-5 w-3 h-3" />
          Kamu belum pernah malakukan presensi sebelumnya
        </div>
      )}

      {/* @ts-ignore */}
      {presences?.length > 0 && (
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
                <TableHead>Tanggal</TableHead>
                <TableHead>Datang</TableHead>
                <TableHead>Pulang</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {presences?.map((presence, idx) => (
                <TableRow key={idx}>
                  <TableCell>{presence.date}</TableCell>
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
