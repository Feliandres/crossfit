"use client";
import { startTransition, useCallback, useEffect, useState, useRef } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import axios from 'axios';
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const attemptedVerification = useRef(false); // Ref to track if verification has been attempted

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    console.log("Token from URL:", token); // Debugging

    const verifyToken = async (token: string) => {
        try {
            const response = await axios.post('/api/verification_token', { token });
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

    const onSubmit = useCallback(() => {
        if (success || error || attemptedVerification.current) return;

        if (!token) {
            setError("Missing token");
            return;
        }

        attemptedVerification.current = true; // Set ref to true to prevent re-submission

        startTransition(() => {
            verifyToken(token)
                .then((data) => {
                    console.log("Verification response:", data); // Debugging
                    setSuccess(data.success);
                    setError(data.error);
                })
                .catch((error) => {
                    setError("Something went wrong");
                    console.error("Verification error:", error); // Debugging
                });
        });
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <div className="flex items-center w-full justify-center">
                {!success && !error && (
                    <BeatLoader />
                )}
                <FormSuccess message={success} />
                {!success && (
                    <FormError message={error} />
                )}
            </div>
        </CardWrapper>
    );
};