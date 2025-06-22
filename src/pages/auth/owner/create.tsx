import { useState } from "react";
import Button from "@/components/form/button";
import { CircleX } from "lucide-react";
import UserForm from "./owner-form";
import SideSlidingModal from "@/components/modal/wrapper/side-sliding-modal";
import PageTitle from "@/layouts/partials/page-title";
import VehicleForm from "./owner-form";
import AuthLayout from "@/layouts/auth";
import OwnerForm from "./owner-form";

interface CreateOwnerProps {
    buttonTrigger?: React.ReactNode;
}

const CreateOwner = ({ buttonTrigger }: CreateOwnerProps) => {
    const [open, setOpen] = useState(false);

    const handleClose = (refresh: boolean = false) => {
        setOpen(false);
    }

    return (
        <AuthLayout>
            <>
                <PageTitle title="Add New Owner" back="/owners" />
                <OwnerForm />
            </>
        </AuthLayout>
    );
}

export default CreateOwner