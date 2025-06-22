import VehicleTypeForm from "./vehicle-type-form";
import useApiRequest from "@/hooks/api-request/request";
import { useParams } from "react-router-dom"
import AuthLayout from "@/layouts/auth";
import PageTitle from "@/layouts/partials/page-title";


const EditVehicleType = () => {

    const {
        requestLoading,
        isErrorRequest,
        Get,
        getData
    } = useApiRequest();

    const { uuid } = useParams();
    Get(`admin/vehicle-type/${uuid}`);

    const Page = () => (
        <div>
            <VehicleTypeForm isEdit={true} vehicleType={getData} />
        </div>
    )

    return (
        <AuthLayout>
            <div>
                {!requestLoading && <PageTitle title="Edit Vehicle Type" back="/vehicle/type" />}
                {isErrorRequest && <p className="p-2 text-white bg-red-800 themeRounded themeTextMuted">Vehicle Type not found</p>}
                {getData && <Page />}
            </div>
        </AuthLayout>
    );
}

export default EditVehicleType