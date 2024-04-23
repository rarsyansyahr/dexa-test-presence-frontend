"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useProfile, useUpdateEmployee, useUpload } from "@/hooks";
import { Cookie } from "@/lib";
import { EmployeeForm } from "@/types";

const schema = z.object({
  phone_number: z.string(),
  password: z.string().nullable(),
  photo: z.string().nullable(),
});

const ProfilePage: FC = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const { isLoading, profile } = useProfile();
  const { update } = useUpdateEmployee();
  const { upload, filename } = useUpload();

  const defaultValues: EmployeeForm = {
    // @ts-ignore
    phone_number: profile?.employee?.phone_number,
    password: null,
    photo: null,
  };

  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
    resetField,
    setValue,
  } = useForm<EmployeeForm>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const onCancel = () => {
    setIsEdit(false);
    setImage(null);
    reset(defaultValues);
  };

  const onSubmit = async (values: EmployeeForm) => {
    await update({
      // @ts-ignore
      id: Cookie.getEmployeeId(),
      ...values,
      // @ts-ignore
      photo_path: values.photo,
    });
    resetField("password");
    resetField("photo");
    setIsEdit(false);
  };

  const onUpload = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // @ts-ignore
    upload(image);
    resetField("photo");
  };

  const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  if (isLoading) return <div>Loading</div>;

  useEffect(() => {
    setValue("photo", filename);
  }, [filename]);

  return (
    <>
      <div className="flex flex-col justify-center items-center mb-4 md:mb-6">
        <Image
          // @ts-ignore
          src={
            // @ts-ignore
            image ? URL.createObjectURL(image) : profile?.employee.photo_path
          }
          width={200}
          height={200}
          alt="Profile Photo"
          className="w-28 h-28 md:w-48 md:h-48 mb-3 md:mb-4 rounded-full"
        />

        {isEdit && (
          <div className="flex fle-row justify-center">
            <Input type="file" disabled={!isEdit} onChange={onChangeImage} />
            <Button size="sm" className="ml-1.5 md:ml-2" onClick={onUpload}>
              Upload
            </Button>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="hidden" {...register("photo")} />

        <div>
          <Label htmlFor="name">Nama</Label>
          <Input
            id="name"
            disabled
            className="mt-1 md:mt-2"
            value={profile?.name}
          />
        </div>

        <div className="mt-3 md:mt-4">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            disabled
            className="mt-1 md:mt-2"
            value={profile?.email}
          />
        </div>

        <div className="mt-3 md:mt-4">
          <Label htmlFor="position">Posisi</Label>
          <Input
            id="position"
            disabled
            className="mt-1 md:mt-2"
            value={profile?.employee?.position}
          />
        </div>

        <div className="mt-3 md:mt-4">
          <Label htmlFor="phone_number">Nomor HP</Label>
          <Input
            id="phone_number"
            type="number"
            disabled={!isEdit}
            className="mt-1 md:mt-2"
            maxLength={13}
            {...register("phone_number")}
          />
        </div>

        <div className="mt-3 md:mt-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            disabled={!isEdit}
            className="mt-1 md:mt-2"
            {...register("password")}
          />
        </div>

        <div className="mt-6 md:mt-8 flex flex-row justify-between">
          {!isEdit && (
            <Button className="bg-yellow-600" onClick={() => setIsEdit(true)}>
              Edit
            </Button>
          )}
          {isEdit && (
            <>
              <Button className="bg-red-500" onClick={onCancel}>
                Batal
              </Button>
              <Button
                type="submit"
                className="bg-indigo-500"
                disabled={!isValid}
              >
                Simpan Perubahan
              </Button>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default ProfilePage;
