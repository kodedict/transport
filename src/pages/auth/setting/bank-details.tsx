import { useEffect, useState } from "react";
import { set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useApiRequest from '@/hooks/api-request/request';
import { EmptyFormInput } from '@/utils/helper-support';
import Button from "@/components/form/button";
import InputField from "@/components/form/input-field";
import { SuccessToast } from "@/utils/toast-notification";

const SetBankDetails = () => {
    //handle form submission
    const formSchema = yup.object({
        account_number: yup.string().label('account number').required(),
        account_name: yup.string().label('account name').required(),
        bank_name: yup.string().label('bank name').required(),
    });

    const  {
        setValue,
        setError,
        formState: {errors},
        handleSubmit,
        getValues,
        reset
    } = useForm({resolver: yupResolver(formSchema)});

    const submit = async (data:any) => {
        data['type'] = 'bank_details';
        const onSubmit = await Post({endpoint: 'admin/setting', payload: data, refreshEndpoint:'admin/setting/bank_details'});
        if ( ! onSubmit ) return;
        SuccessToast('Bank details updated successfully');
    }

    const {
            Post,
            requestLoading,
            errorMessage,
            Get,
            getData,
            isSuccessRequest,
        } = useApiRequest(setError);

        Get('admin/setting/bank_details');

        useEffect(() => {
            if ( isSuccessRequest ){
                getData && reset(getData.value)
            }
        }, [getData])
        

    return (
        <div className="grid gap-4">
            <h4 className="themeTextSecondary">Change password</h4>
            <p className="themeTextMuted">Kindly fill in the appropriate details correctly</p>
            <form onSubmit={handleSubmit(submit)} style={{ boxShadow:'rgba(149, 157, 165, 0.2) 0px 8px 24px' }} className="grid gap-4 p-5 themeRounded">
                <div className="grid gap-4 md:grid-cols-2">
                    <InputField 
                        label="Account number" 
                        value={getValues('account_number') ?? getData?.value?.account_number ?? ''}
                        error={errors.account_number?.message}
                        onChangeInput={(e) => [setValue('account_number', e.target.value), setError('account_number', {message: ''})]}
                    />
                    <InputField 
                        label="Account name" 
                        value={getValues('account_name') ?? getData?.value?.account_name ?? ''}
                        error={errors.account_name?.message}
                        onChangeInput={(e) => [setValue('account_name', e.target.value), setError('account_name', {message: ''})]}
                    />
                    <InputField 
                        label="Bank name" 
                        value={getValues('bank_name') ?? getData?.value?.bank_name ?? ''}
                        error={errors.bank_name?.message}
                        onChangeInput={(e) => [setValue('bank_name', e.target.value), setError('bank_name', {message: ''})]}
                    />
                </div>
                <Button text="Save changes" isLoading={requestLoading} type="submit"/>
            </form>
        </div>
    )
}

export default SetBankDetails