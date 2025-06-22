import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useApiRequest from '@/hooks/api-request/request';
import { EmptyFormInput } from '@/utils/helper-support';
import { useAppStore } from "@/store/auth";
import Button from "@/components/form/button";
import InputField from "@/components/form/input-field";
import GuestLayout from "@/layouts/guest";
import { Link } from "react-router-dom";

const Register = ({registerAs = 'customer'}) => {

    const {handleLogin} = useAppStore();
    //handle form submission
    const formSchema = yup.object({
        email: yup.string().label('email').required(),
        password: yup.string().label('password').required(),
        first_name: yup.string().label('first name').required(),
        last_name: yup.string().label('last name').required(),
        ...(registerAs === 'realtor' && { business_name: yup.string().label('business name').required() }),
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

    const register = async (data:any) => {
        data['role'] = registerAs;
        const onSubmit = await Post({endpoint: 'auth/register', payload: data});
        if ( ! onSubmit ) return;
        const emptyValues = EmptyFormInput(formSchema);
        reset(emptyValues)
        handleLogin(onSubmit)
    }
    return (
        <GuestLayout>
            <div>
            <h1 className="page-title">Sign Up</h1>
            <p className="themeTextMuted">Welcome, let's create your account</p>
            <form onSubmit={handleSubmit(register)} className="grid gap-6 mt-10">
                {errorMessage && <p className="p-2 text-white bg-red-800 themeRounded themeTextMuted">{errorMessage}</p>}
                <div className="grid gap-6 md:grid-cols-2">
                    <InputField
                        label="First name"
                        value={getValues('first_name')}
                        error={errors.first_name?.message}
                        onChangeInput={(e) => [setValue<any>('first_name', e.target.value), setError('first_name', {message: ''})]}
                    />
                    <InputField
                        label="Last name"
                        value={getValues('last_name')}
                        error={errors.last_name?.message}
                        onChangeInput={(e) => [setValue<any>('last_name', e.target.value), setError('last_name', {message: ''})]}
                    />
                </div>
                <InputField
                    type="email"
                    label="Email"
                    value={getValues('email')}
                    error={errors.email?.message}
                    onChangeInput={(e) => [setValue<any>('email', e.target.value), setError('email', {message: ''})]}
                />
                <InputField
                    type="password"
                    label="Password"
                    value={getValues('password')}
                    error={errors.password?.message}
                    onChangeInput={(e) => [setValue<any>('password', e.target.value), setError('password', {message: ''})]}
                />
                {registerAs === 'realtor' && (
                    <>
                        <InputField
                        label="Business name"
                        value={getValues('business_name')}
                        error={errors.business_name?.message}
                        onChangeInput={(e) => [setValue<any>('business_name', e.target.value), setError('business_name', {message: ''})]}
                    />
                    </>
                )}
                <Button
                    text="Sign Up"
                    isLoading={requestLoading}
                    type="submit"
                    className='w-full'
                />
                <div className="text-center">
                    <Link to={'/login'} className="hover:underline themeTextMuted hover:text-primary">Already have an account?</Link>
                </div>
            </form>
        </div>
        </GuestLayout>
    )
}

export default Register