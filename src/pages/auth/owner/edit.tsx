import useApiRequest from "@/hooks/api-request/request";
import PageTitle from "@/layouts/partials/page-title";
import OwnerForm from "./owner-form";
import { useParams } from "react-router-dom"
import AuthLayout from "@/layouts/auth";

const EditOwner = () => {

    const {
        requestLoading,
        isErrorRequest,
        Get,
        getData
    } = useApiRequest();

    const { uuid } = useParams();
    Get(`admin/owner/${uuid}`);


    // const deleteUser = async () => {
    //     const fullQueryString = window.location.search || '?page=1';
    //     await Post({ endpoint: `admin/owner/${owner?.uuid}/delete`, refreshEndpoint: `admin/owner${fullQueryString}` });
    //     if (isErrorRequest) return;
    //     SuccessToast(`User deleted successfully`);
    //     //handleClose();
    // }

    // const suspendUser = async () => {
    //     const fullQueryString = window.location.search || '?page=1';
    //     await Post({ endpoint: `admin/owner/${owner?.uuid}/suspend`, refreshEndpoint: `admin/owner${fullQueryString}` });
    //     if (isErrorRequest) return;
    //     SuccessToast(`User ${owner?.is_suspended ? 'unsuspended' : 'suspended'} successfully`);
    //     //handleClose();
    // }

    const Page = () => (
        <div>
            <OwnerForm isEdit={true} owner={getData} />
        </div>
    )

    return (
        <AuthLayout>
            <div>
                {!requestLoading && <PageTitle title="Edit Owner" back="/owners" />}
                {isErrorRequest && <p className="p-2 text-white bg-red-800 themeRounded themeTextMuted">Owner not found</p>}
                {getData && <Page />}
            </div>
        </AuthLayout>
    );
}



export default EditOwner