"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { UserService } from "@/api";
import { useUserStore } from "@/store";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  email: z.string().email({
    message: "Email must be a valid email",
  }),
  password: z.string().min(8, {
    message: "Password must contain at least 8 characters",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

export function SignInForm() {
  const { setUser } = useUserStore();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isPending, mutateAsync: signInUser } = useMutation({
    mutationFn: async (user: FormSchema) => await UserService.signinUser(user),
    onSuccess: ({ user }) => {
      setUser(user);
      router.push("/");
    },
    onError: () => {
      toast({
        title: "Failed to signin.",
        className: "bg-red-600 text-white",
      });
      router.refresh();
    },
  });

  const onFormSubmit = async (payload: FormSchema) => await signInUser(payload);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign In
        </Button>
      </form>
    </Form>
  );
}
