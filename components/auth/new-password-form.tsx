"use client";

import { useCallback, useState, useTransition, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NewPasswordSchema } from "@/schemas";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

export const NewPasswordForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        },
    });

    const resetPassword = async (token: string, password: string) => {
        try {
            console.log("Sending request to API with token:", token, "and password:", password); // Debugging
            const response = await axios.post('/api/new_password', { token, password });
            console.log("Response from API:", response); // Debugging
            return response.data;
        } catch (error) {
            console.error("Error resetting password:", error);

            if (axios.isAxiosError(error)) {
                return { error: error.response?.data?.error || 'Something went wrong' };
            } else if (error instanceof Error) {
                return { error: error.message };
            } else {
                return { error: 'Something went wrong' };
            }
        }
    };

    const onSubmit = useCallback((values: z.infer<typeof NewPasswordSchema>) => {
        console.log("Form submitted with values:", values); // Debugging
        setError("");
        setSuccess("");

        if (!token) {
            setError("Missing token");
            return;
        }

        startTransition(() => {
            resetPassword(token, values.password)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                });
        });
    }, [token]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CardWrapper
                headerLabel="Enter a new password"
                backButtonLabel="Back to Login"
                backButtonHref="/auth/login"
            >
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="Enter your new password"
                                                type="password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button
                            disabled={isPending}
                            type="submit"
                            className="w-full"
                        >
                            Update Password
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </Suspense>
    );
};