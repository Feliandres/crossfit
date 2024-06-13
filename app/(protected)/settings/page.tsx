"use client";

<<<<<<< HEAD
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
=======
import axios from "axios"; 
import { logout } from "@/actions/logout"; // action
import { useCurrentUser } from "@/hooks/use-current-usere";
import { signOut } from "next-auth/react";

const SettingsPage =  () => {
    //const session = useSession(); // sin hooks
    const user = useCurrentUser();

    const onClick = async () => {

        signOut(); // Para el client

        /*
        // Probando implementar la api route aqui
        try {
            await axios.post('/api/logout');
            return
        } catch (error) {
            console.error('Error logging out:', error);
        }
        */
    }

    return (
        <div className="bg-white p-10 rounded-xl">
            <button onClick={onClick} type="submit">
                Sign Out
            </button>
        </div>
>>>>>>> 9c41f12f419b04f98443bb68f6dea5672469a670
    )
}

export default SettingsPage;