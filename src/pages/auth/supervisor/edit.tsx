import useApiRequest from "@/hooks/api-request/request";
import PageTitle from "@/layouts/partials/page-title";
import SupervisorForm from "./supervisor-form";
import { useParams } from "react-router-dom"
import AuthLayout from "@/layouts/auth";

const EditSupervisor = () => {

    const {
        requestLoading,
        isErrorRequest,
        Get,
        getData
    } = useApiRequest();

    const { uuid } = useParams();
    Get(`admin/supervisor/${uuid}`);


    // const deleteUser = async () => {
    //     const fullQueryString = window.location.search || '?page=1';
    //     await Post({ endpoint: `admin/supervisor/${supervisor?.uuid}/delete`, refreshEndpoint: `admin/supervisor${fullQueryString}` });
    //     if (isErrorRequest) return;
    //     SuccessToast(`User deleted successfully`);
    //     //handleClose();
    // }

    // const suspendUser = async () => {
    //     const fullQueryString = window.location.search || '?page=1';
    //     await Post({ endpoint: `admin/supervisor/${supervisor?.uuid}/suspend`, refreshEndpoint: `admin/supervisor${fullQueryString}` });
    //     if (isErrorRequest) return;
    //     SuccessToast(`User ${supervisor?.is_suspended ? 'unsuspended' : 'suspended'} successfully`);
    //     //handleClose();
    // }

    const Page = () => (
        <div>
            <SupervisorForm isEdit={true} supervisor={getData} />
        </div>
    )

    return (
        <AuthLayout>
            <div>
                {!requestLoading && <PageTitle title="Edit Supervisor" back="/supervisors" />}
                {isErrorRequest && <p className="p-2 text-white bg-red-800 themeRounded themeTextMuted">Supervisor not found</p>}
                {getData && <Page />}
            </div>
        </AuthLayout>
    );
}



export default EditSupervisor