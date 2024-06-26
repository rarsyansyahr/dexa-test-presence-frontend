"use client";

import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { useLogin } from "@/hooks";
import { LoginProps } from "@/types";

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const LoginPage: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginProps>({
    resolver: zodResolver(schema),
  });

  const { onLogin, isLoading } = useLogin();

  return (
    <main className="min-h-screen bg-indigo-200 flex justify-center items-center">
      <div className="bg-white rounded-md shadow-md px-8 py-6 w-10/12 md:w-5/12">
        <div className="flex justify-center items-center">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={200}
            height={100}
            className="md:w-56 w-44"
          />
        </div>

        <form onSubmit={handleSubmit(onLogin)}>
          <div className="mt-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                {...register("email")}
                disabled={isLoading}
              />
            </div>

            <div className="mt-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                {...register("password")}
                disabled={isLoading}
              />
            </div>
            <Button
              size="sm"
              className="mt-4"
              type="submit"
              disabled={!isValid || isLoading}
            >
              Masuk
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
