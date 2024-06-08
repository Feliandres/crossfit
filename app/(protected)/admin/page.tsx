import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import {
    Card,
    CardHeader,
    CardContent
} from "@/components/ui/card";
import { Role } from "@prisma/client";


const AdminPage = async () => {

    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    Admin
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <RoleGate allowedRole={Role.ADMIN}>
                    <FormSuccess message="You are allowed to see this content"/>
                </RoleGate>
            </CardContent>
        </Card>
    );
};

export default AdminPage