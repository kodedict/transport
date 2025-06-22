import useApiRequest from "@/hooks/api-request/request";
import PageTitle from "@/layouts/partials/page-title";
import EnforcerForm from "./enforcer-form";
import { useParams } from "react-router-dom"
import AuthLayout from "@/layouts/auth";

const EditEnforcer = () => {

    const {
        requestLoading,
        isErrorRequest,
        Get,
        getData
    } = useApiRequest();

    const { uuid } = useParams();
    Get(`admin/enforcer/${uuid}`);


    // const deleteUser = async () => {
    //     const fullQueryString = window.location.search || '?page=1';
    //     await Post({ endpoint: `admin/enforcer/${enforcer?.uuid}/delete`, refreshEndpoint: `admin/enforcer${fullQueryString}` });
    //     if (isErrorRequest) return;
    //     SuccessToast(`User deleted successfully`);
    //     //handleClose();
    // }

    // const suspendUser = async () => {
    //     const fullQueryString = window.location.search || '?page=1';
    //     await Post({ endpoint: `admin/enforcer/${enforcer?.uuid}/suspend`, refreshEndpoint: `admin/enforcer${fullQueryString}` });
    //     if (isErrorRequest) return;
    //     SuccessToast(`User ${enforcer?.is_suspended ? 'unsuspended' : 'suspended'} successfully`);
    //     //handleClose();
    // }

    const Page = () => (
        <div>
            <EnforcerForm isEdit={true} enforcer={getData} />
        </div>
    )

    return (
        <AuthLayout>
            <div>
                {!requestLoading && <PageTitle title="Edit Enforcer" back="/enforcers" />}
                {isErrorRequest && <p className="p-2 text-white bg-red-800 themeRounded themeTextMuted">Enforcer not found</p>}
                {getData && <Page />}
            </div>
        </AuthLayout>
    );
}



export default EditEnforcer