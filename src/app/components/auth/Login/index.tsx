"use client";
import { signIn } from "next-auth/react";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormData = {
  username: string;
  password: string;
  login_type: string;
};

export default function Login() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = useCallback(async (data: FormData) => {
    const signInData: FormData = {
      ...data,
      login_type: "email",
    };
    try {
      const response = await signIn("credentials", {
        ...signInData,
        redirect: false,
      });
      if (!response?.ok) {
        toast.error("Erro de validação.");
      } else if (response.ok) {
        toast.success("Login realizado com sucesso!");
      }
    } catch (error) {
      console.log(error);

      toast.error("Erro ao fazer login. Tente novamente mais tarde.");
    }
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Username"
          {...register("username", { required: true })}
        />
        <input
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
