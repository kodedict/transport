import VehicleForm from "./vehicle-form";
import useApiRequest from "@/hooks/api-request/request";
import AuthLayout from "@/layouts/auth";
import PageTitle from "@/layouts/partials/page-title";
import { useParams } from "react-router-dom"


const EditVehicle = () => {

    const {
        requestLoading,
        isErrorRequest,
        Get,
        getData
    } = useApiRequest();

    const { uuid } = useParams();
    Get(`admin/vehicle/${uuid}`);

    const Page = () => (
        <div>
            <VehicleForm isEdit={true} vehicle={getData} />
        </div>
    )

    return (
        <AuthLayout>
            <div>
                {!requestLoading && <PageTitle title="Vehicle" back="/vehicles" />}
                {isErrorRequest && <p className="p-2 text-white bg-red-800 themeRounded themeTextMuted">Owner not found</p>}
                {getData && <Page />}
            </div>
        </AuthLayout>
    );
}

export default EditVehicle