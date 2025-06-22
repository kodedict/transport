import Button from "@/components/form/button";
import InputField from "@/components/form/input-field";
import GuestLayout from "@/layouts/guest";
import { useAppStore } from "@/store/auth";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useApiRequest from '@/hooks/api-request/request';
import { EmptyFormInput } from '@/utils/helper-support';
import NotFound from "@/routes/not-found";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");

    const [email, setEmail] = useState<string|null>(null);

    const [name, setName] = useState<string|null>(null);

    const {handleLogin} = useAppStore();

    const [notFound, setNotFound] = useState<boolean>(false);

     //handle form submission
        const formSchema = yup.object({
            password: yup.string().label('password').required(),
            password_confirmation: yup.string().label('password').required(),
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

    const VerifyResetToken = async () => {
        if ( ! token ){
            setNotFound(true);
            return;
        }
        const request = await Post({endpoint: 'auth/verify-password-token', payload: {token}});
        if ( ! request ){
            setNotFound(true);
            return;
        };

        setEmail(request.email);

        setName(request.name);
    }

    useEffect(() => {VerifyResetToken()}, []);

    const submit = async (data:any) => {
        data.email = email;
        data.token = token;
        const onSubmit = await Post({endpoint: 'auth/reset-password', payload: data});
            if ( ! onSubmit ){
                return;
            };
            const emptyValues = EmptyFormInput(formSchema);
            reset(emptyValues)
            handleLogin(onSubmit)
    }
    return (
        <>
            {notFound && <NotFound/>}
            {email &&(
                <GuestLayout>
            <div>
            <h1 className="page-title">Reset Your Password</h1>
            <p className="themeTextMuted">Go ahead and reset your password</p>
            <form onSubmit={handleSubmit(submit)} className="grid gap-6 mt-10">
                <InputField
                    type="password"
                    label="New password"
                    placeholder="Enter new password"
                    value={getValues('password')}
                    error={errors.password?.message}
                    onChangeInput={(e) => [setValue('password', e.target.value), setError('password', {message: ''})]}
                />
                <InputField
                    type="password"
                    label="Confirm new password"
                    placeholder="Confirm new password"
                    value={getValues('password_confirmation')}
                    error={errors.password_confirmation?.message}
                    onChangeInput={(e) => [setValue('password_confirmation', e.target.value), setError('password_confirmation', {message: ''})]}
                />
                <Button
                    text="Reset Password" 
                    type="submit"
                    isLoading={requestLoading}
                />
            </form>
        </div>
        </GuestLayout>
            )}
        </>
    )
}

export default ResetPassword