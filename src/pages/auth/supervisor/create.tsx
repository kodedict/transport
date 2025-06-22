import PageTitle from "@/layouts/partials/page-title";
import AuthLayout from "@/layouts/auth";
import SupervisorForm from "./supervisor-form";


const CreateSupervisor = () => {

    return (
        <AuthLayout>
            <>
                <PageTitle title="Add New Supervisor" back="/supervisors" />
                <SupervisorForm />
            </>
        </AuthLayout>
    );
}

export default CreateSupervisor