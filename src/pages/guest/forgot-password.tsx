import Button from "@/components/form/button";
import InputField from "@/components/form/input-field";
import GuestLayout from "@/layouts/guest";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useApiRequest from '@/hooks/api-request/request';
import { EmptyFormInput } from '@/utils/helper-support';

const ForgotPassword = () => {
      //handle form submission
        const formSchema = yup.object({
            email: yup.string().label('email').required(),
        });
    
        const  {
            setValue,
            setError,
            formState: {errors},
            handleSubmit,
            getValues,
            reset
        } = useForm({resolver: yupResolver(formSchema)});

        const {
            Post,
            requestLoading,
            errorMessage,
            isSuccessRequest
        } = useApiRequest(setError);

    const submit = async (data:any) => {
        const onSubmit = await Post({endpoint: 'auth/forgot-password', payload: data});
        if ( ! onSubmit ){
            return;
        };
        const emptyValues = EmptyFormInput(formSchema);
        reset(emptyValues)
    }
    return (
        <GuestLayout>
            <div>
            <h1 className="page-title">Forgot Password?</h1>
            <p className="themeTextMuted">We will send you an email to reset your password</p>
            <form onSubmit={handleSubmit(submit)} className="grid gap-6 mt-10">
            {isSuccessRequest && <p className="p-2 text-white bg-green-800 themeRounded themeTextMuted">Password reset email sent</p>}
            {errorMessage && <p className="p-2 text-white bg-red-800 themeRounded themeTextMuted">{errorMessage}</p>}
                <InputField
                    type="email"
                    label="Email"
                    value={getValues('email')}
                    error={errors.email?.message}
                    onChangeInput={(e) => [setValue('email', e.target.value), setError('email', {message: ''})]}
                />
                <Button
                    text="Reset Password"
                    isLoading={requestLoading}
                    type="submit"
                />
                <div className="text-center">
                    <Link to={'/login'} className="hover:underline themeTextMuted hover:text-primary">Back to Sign In</Link>
                </div>
            </form>
        </div>
        </GuestLayout>
    )
}

export default ForgotPassword