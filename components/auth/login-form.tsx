"use client";

import { signIn } from "next-auth/react";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import Link from "next/link";
import axios from "axios";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { AccessDenied } from "@auth/core/errors"; // Import AccessDenied error (Ensure the correct import path)

export const LoginForm = () => {
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use with different provider"
        : "";

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post('/api/login', { email, password });

            if (response.data.error) {
                return { error: response.data.error };
            }

            if (response.data.success) {
                try {
                    const signInResponse = await signIn('credentials', {
                        redirect: false,
                        email,
                        password,
                        callbackUrl: DEFAULT_LOGIN_REDIRECT,
                    });

                    if (signInResponse?.error) {
                        throw new AuthError("CredentialsSignin");
                    } else if (signInResponse?.url) {
                        window.location.href = signInResponse.url;
                    }
                } catch (error) {
                    if (error instanceof AccessDenied) {
                        setSuccess("Confirm email sent");
                        setError("");
                    } else if (error instanceof AuthError) {
                        switch (error.type) {
                            case "CredentialsSignin":
                                setError("Invalid credentials");
                                break;
                            default:
                                setError("Something went wrong");
                        }
                    } else {
                        setError("Something went wrong");
                    }
                }
            }

            return { success: response.data.success };
        } catch (error) {
            console.error("Error:", error);

            if (axios.isAxiosError(error)) {
                return { error: error.response?.data?.error || 'Something went wrong' };
            } else if (error instanceof Error) {
                return { error: error.message };
            } else {
                return { error: 'Something went wrong' };
            }
        }
    };

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values.email, values.password)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                });
        });
    };

    return (
        <CardWrapper
            headerLabel="Welcome back"
            backButtonLabel="Don’t have an account?"
            backButtonHref="/auth/register"
            showSocial
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="john.doe@gmail.com"
                                            type="email"
                                        />
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
                                        <Input
                                            disabled={isPending}
                                            {...field}
                                            placeholder="*********"
                                            type="password"
                                        />
                                    </FormControl>
                                    <Button
                                        size="sm"
                                        variant="link"
                                        asChild
                                        className="px-0 font-normal"
                                    >
                                        <Link href="/auth/reset">
                                            Forgot password?
                                        </Link>
                                    </Button>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};