import { useState } from "react";
import Button from "@/components/form/button";
import { CircleX } from "lucide-react";
import UserForm from "./vehicle-form";
import SideSlidingModal from "@/components/modal/wrapper/side-sliding-modal";
import PageTitle from "@/layouts/partials/page-title";
import VehicleForm from "./vehicle-form";
import AuthLayout from "@/layouts/auth";

interface CreateVehicleProps {
    buttonTrigger?: React.ReactNode;
}

const CreateVehicle = ({ buttonTrigger }: CreateVehicleProps) => {
    const [open, setOpen] = useState(false);

    const handleClose = (refresh: boolean = false) => {
        setOpen(false);
    }

    return (
        <AuthLayout>
            <>
                <PageTitle title="Add New Vehicle" back="/vehicles" />
                <VehicleForm />
            </>
        </AuthLayout>
    );
}

export default CreateVehicle