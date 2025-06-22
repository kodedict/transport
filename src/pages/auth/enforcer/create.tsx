import PageTitle from "@/layouts/partials/page-title";
import AuthLayout from "@/layouts/auth";
import EnforcerForm from "./enforcer-form";


const CreateEnforcer = () => {

    return (
        <AuthLayout>
            <>
                <PageTitle title="Add New Enforcer" back="/enforcers" />
                <EnforcerForm />
            </>
        </AuthLayout>
    );
}

export default CreateEnforcer