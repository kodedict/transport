import PageTitle from "@/layouts/partials/page-title";
import AuthLayout from "@/layouts/auth";
import VehicleTypeForm from "./vehicle-type-form";

interface CreateVehicleTypeProps {
    buttonTrigger?: React.ReactNode;
}

const CreateVehicleType = ({ buttonTrigger }: CreateVehicleTypeProps) => {


    return (
        <AuthLayout>
            <>
                <PageTitle title="Add New Vehicle Type" back="/vehicle/type" />
                <VehicleTypeForm />
            </>
        </AuthLayout>
    );
}

export default CreateVehicleType