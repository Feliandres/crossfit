import { Session } from "next-auth";
import {
    Card,
    CardHeader,
    CardContent
} from "@/components/ui/card";

interface UserInfoProps {
    user?: Session["user"];
    label: string;
}

export const UserInfo = ({
    user,
    label,
}: UserInfoProps) => {
    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    {label}
                </p>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        ID
                    </p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {user?.id}
                    </p>
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Name
                    </p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {user?.name}
                    </p>
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Email
                    </p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {user?.email}
                    </p>
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Role
                    </p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {user?.role}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}