"use client";

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
    )
}

export default SettingsPage;