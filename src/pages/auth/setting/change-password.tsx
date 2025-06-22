import { useState } from "react";
import { Link } from "react-router-dom";
import { set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useApiRequest from '@/hooks/api-request/request';
import { EmptyFormInput } from '@/utils/helper-support';
import Button from "@/components/form/button";
import InputField from "@/components/form/input-field";
import { onLogout } from "@/store/auth";
import { SuccessToast } from "@/utils/toast-notification";

const ChangePassword = () => {

    //handle form submission
    const formSchema = yup.object({
        current_password: yup.string().label('current password').required(),
        password: yup.string().label('password').required(),
        password_confirmation: yup.string().label('confirm password').required(),
    });

    const  {
        setValue,
        setError,
        formState: {errors},
        handleSubmit,
        getValues,
        reset
    } = useForm({resolver: yupResolver(formSchema)});

    const changePassword = async (data:any) => {
        const onSubmit = await Post({endpoint: 'change-password', payload: data});
            if ( ! onSubmit ){
                setValue('current_password', '');
                return;
            };
            const emptyValues = EmptyFormInput(formSchema);
            reset(emptyValues)
            SuccessToast('Password changed successfully');
            setTimeout(() => {
                onLogout();
            }, 1000);
    }

    const {
            Post,
            requestLoading,
            errorMessage,
        } = useApiRequest(setError);
    
    return (
        <div className="grid gap-4">
            <h4 className="themeTextSecondary">Change password</h4>
            <p className="themeTextMuted">You'll be logged out after changing your password</p>
                <form onSubmit={handleSubmit(changePassword)} style={{ boxShadow:'rgba(149, 157, 165, 0.2) 0px 8px 24px' }} className="grid gap-4 p-5 themeRounded">
                    <InputField 
                        label="Current password" 
                        type="password"
                        value={getValues('current_password')}
                        error={errors.current_password?.message}
                        onChangeInput={(e) => [setValue('current_password', e.target.value), setError('current_password', {message: ''})]}
                    />
                    <div className="grid gap-4 md:grid-cols-2">
                        <InputField 
                            label="New password" 
                            type="password"
                            value={getValues('password')}
                            error={errors.password?.message}
                            onChangeInput={(e) => [setValue('password', e.target.value), setError('password', {message: ''})]}
                        />
                        <InputField 
                            label="Confirm new password" 
                            type="password"
                            value={getValues('password_confirmation')}
                            error={errors.password_confirmation?.message}
                            onChangeInput={(e) => [setValue('password_confirmation', e.target.value), setError('password_confirmation', {message: ''})]}
                        />
                    </div>
                    <Button isLoading={requestLoading} text="Save changes" type="submit"/>
                </form>
        </div>
    );
}

export default ChangePassword