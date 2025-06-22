import useApiRequest from "@/hooks/api-request/request";
import PageTitle from "@/layouts/partials/page-title";
import DriverForm from "./driver-form";
import { useParams } from "react-router-dom"
import AuthLayout from "@/layouts/auth";

const EditDriver = () => {

    const {
        requestLoading,
        isErrorRequest,
        Get,
        getData
    } = useApiRequest();

    const { uuid } = useParams();
    Get(`admin/driver/${uuid}`);


    // const deleteUser = async () => {
    //     const fullQueryString = window.location.search || '?page=1';
    //     await Post({ endpoint: `admin/driver/${driver?.uuid}/delete`, refreshEndpoint: `admin/driver${fullQueryString}` });
    //     if (isErrorRequest) return;
    //     SuccessToast(`User deleted successfully`);
    //     //handleClose();
    // }

    // const suspendUser = async () => {
    //     const fullQueryString = window.location.search || '?page=1';
    //     await Post({ endpoint: `admin/driver/${driver?.uuid}/suspend`, refreshEndpoint: `admin/driver${fullQueryString}` });
    //     if (isErrorRequest) return;
    //     SuccessToast(`User ${driver?.is_suspended ? 'unsuspended' : 'suspended'} successfully`);
    //     //handleClose();
    // }

    const Page = () => (
        <div>
            <DriverForm isEdit={true} driver={getData} />
        </div>
    )

    return (
        <AuthLayout>
            <div>
                {!requestLoading && <PageTitle title="Edit Driver" back="/drivers" />}
                {isErrorRequest && <p className="p-2 text-white bg-red-800 themeRounded themeTextMuted">Driver not found</p>}
                {getData && <Page />}
            </div>
        </AuthLayout>
    );


}



export default EditDriver