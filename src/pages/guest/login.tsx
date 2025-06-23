import Button from "@/components/form/button";
import InputField from "@/components/form/input-field";
import TickerField from "@/components/form/ticker-field";
import GuestLayout from "@/layouts/guest";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useApiRequest from '@/hooks/api-request/request';
import { EmptyFormInput } from '@/utils/helper-support';
import { useAppStore } from "@/store/auth";

const Login = () => {
    const {handleLogin} = useAppStore();

    const [rememberMe, setRememberMe] = useState<boolean>(false);

    //handle form submission
        const formSchema = yup.object({
            email: yup.string().label('email').required(),
            password: yup.string().label('password').required(),
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
        } = useApiRequest(setError);

    const login = async (data:any) => {
        const onSubmit = await Post({endpoint: 'auth/login', payload: data});
            if ( ! onSubmit ){
                setValue('password', '');
                return;
            };
            const emptyValues = EmptyFormInput(formSchema);
            reset(emptyValues)
            handleLogin(onSubmit)
    }

    return (
        <GuestLayout>
            <div>
            <h1 className="page-title">Sign In</h1>
            <p className="themeTextMuted">Enter your account credentials</p>
            <form onSubmit={handleSubmit(login)} className="grid gap-6 mt-10">
                {errorMessage && <p className="p-2 text-white bg-red-800 themeRounded themeTextMuted">{errorMessage}</p>}
                <InputField
                    type="email"
                    label="Email"
                    value={getValues('email')}
                    error={errors.email?.message}
                    onChangeInput={(e) => [setValue('email', e.target.value), setError('email', {message: ''})]}
                />
                <InputField
                    type="password"
                    label="Password"
                    value={getValues('password')}
                    error={errors.password?.message}
                    onChangeInput={(e) => [setValue('password', e.target.value), setError('password', {message: ''})]}
                />
                <div className="flex items-center justify-between">
                    <TickerField label="Remember me" checked={rememberMe} onChangeInput={setRememberMe}/>
                    <Link to={'/forgot-password'} className="hover:underline themeTextMuted hover:text-primary">Forgot Password</Link>
                </div>
                <Button
                    isLoading={requestLoading}
                    text="Sign In" 
                    type="submit"
                    className="w-full"
                />
                {/* <div className="text-center">
                    <Link to={'/register'} className="hover:underline themeTextMuted hover:text-primary">Don't have an account?</Link>
                </div> */}
            </form>
        </div>
        </GuestLayout>
    )
}

export default Login