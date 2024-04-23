"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

const schema = z.object({
  phone_number: z.string(),
  password: z.string().nullable(),
  photo: z.string().nullable(),
});

type EmployeeForm = {
  phone_number: string;
  password?: string | null;
  photo?: string | null;
};

const EmployeeDetail: FC = () => {
  const router = useRouter();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);

  const profile = {
    name: "Rizky Arsyansyah Rinjani",
    position: "Operator",
    photo_path: "/images/male.png",
    phone_number: "081283129837",
    email: "andi@gmail.com",
  };

  const defaultValues: EmployeeForm = {
    phone_number: profile.phone_number,
    password: null,
    photo: null,
  };

  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<EmployeeForm>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const onCancel = () => {
    setIsEdit(false);
    setImage(null);
    reset(defaultValues);
  };

  const onSubmit = (values: any) => {
    alert(JSON.stringify(values));
  };

  const onUpload = (event: React.MouseEvent<HTMLButtonElement>) => {
    // event.preventDefault();
    // const url = "http://localhost:3000/uploadFile";
    // const formData = new FormData();
    // formData.append("file", image);
    // formData.append("fileName", image!.name);
    // const config = {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },
    // };
    // axios.post(url, formData, config).then((response) => {
    //   console.log(response.data);
    // });
  };

  const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center mb-4 md:mb-6">
        <Image
          src={image ? URL.createObjectURL(image) : profile.photo_path}
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
            value={profile.name}
          />
        </div>

        <div className="mt-3 md:mt-4">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            disabled
            className="mt-1 md:mt-2"
            value={profile.email}
          />
        </div>

        <div className="mt-3 md:mt-4">
          <Label htmlFor="position">Posisi</Label>
          <Input
            id="position"
            disabled
            className="mt-1 md:mt-2"
            value={profile.position}
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

        <div className="mt-6 md:mt-8 flex flex-row justify-between items-center">
          <div>
            <Button
              type="reset"
              onClick={() => router.back()}
              className="mr-2 md:mr-3"
            >
              Kembali
            </Button>

            {!isEdit && (
              <Button className="bg-yellow-600" onClick={() => setIsEdit(true)}>
                Edit
              </Button>
            )}

            {isEdit && (
              <Button className="bg-red-500" onClick={onCancel}>
                Batal
              </Button>
            )}
          </div>

          {isEdit && (
            <Button type="submit" className="bg-indigo-500" disabled={!isValid}>
              Simpan Perubahan
            </Button>
          )}
        </div>
      </form>
    </>
  );
};

export default EmployeeDetail;