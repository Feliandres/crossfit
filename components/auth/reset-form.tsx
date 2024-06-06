"use client";

import { CardWrapper } from "@/components/auth/card-wrapper"
import {useForm} from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ResetSchema } from "@/schemas";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import axios from "axios";
//import { reset } from "@/actions/reset";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"

export const ResetForm = () => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        },
    });

    const reset = async (email: string) => {
        try {
            const response = await axios.post('/api/reset_password', { email });
            return response.data;
        } catch (error) {
            console.error("Error verifying token:", error);

            if (axios.isAxiosError(error)) {
                // Axios error has a response property
                return { error: error.response?.data?.error || 'Something went wrong' };
            } else if (error instanceof Error) {
                // General JS error
                return { error: error.message };
            } else {
                // Fallback for any other type of error
                return { error: 'Something went wrong' };
            }
        }
    };

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            reset(values.email)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                });
        });

    };

    return (
        <CardWrapper
            headerLabel="Forgot your passwowrd?"
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
                        name="email"
                        render={({field}) => (
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
                </div>
                <FormError message= {error}/>
                <FormSuccess message= {success}/>
                <Button
                    disabled={isPending}
                    type="submit"
                    className="w-full"
                >
                    Send reset email
                </Button>
            </form>
        </Form>
        </CardWrapper>
    );
};