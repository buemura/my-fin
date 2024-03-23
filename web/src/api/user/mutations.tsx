"use client";

import { useMutation } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/store";
import { UserSigninSchema, UserSignupSchema } from "@/types";
import { UserService } from "./api";

export function useMutateUserSignin() {
  const { setUser } = useUserStore();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (user: UserSigninSchema) =>
      await UserService.signinUser(user),
    onSuccess: ({ user }) => setUser(user),
    onError: () => {
      toast({
        title: "Failed to signin.",
        className: "bg-red-600 text-white",
      });
    },
  });
}

export function useMutateUserSignup() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (user: UserSignupSchema) =>
      await UserService.signupUser(user),
    onError: () => {
      toast({
        title: "Failed to signup.",
        className: "bg-red-600 text-white",
      });
    },
  });
}
