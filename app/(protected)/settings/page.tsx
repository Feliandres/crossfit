"use client";

import {
    Card,
    CardHeader,
    CardContent
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

const SettingsPage =  () => {

    const onClick = () => {
        //s
    }


    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    Settings
                </p>
            </CardHeader>

            <CardContent>
                <Button>
                    Update name
                </Button>
            </CardContent>
        </Card>
    )
}

export default SettingsPage;