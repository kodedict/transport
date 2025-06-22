import { useState } from "react";
import PageTitle from "@/layouts/partials/page-title";
import AuthLayout from "@/layouts/auth";
import DriverForm from "./driver-form";

interface CreateDriverProps {
    buttonTrigger?: React.ReactNode;
}

const CreateDriver = ({ buttonTrigger }: CreateDriverProps) => {
    const [open, setOpen] = useState(false);

    const handleClose = (refresh: boolean = false) => {
        setOpen(false);
    }

    return (
        <AuthLayout>
            <>
                <PageTitle title="Add New Driver" back="/drivers" />
                <DriverForm />
            </>
        </AuthLayout>
    );
}

export default CreateDriver