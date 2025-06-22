import { useEffect, useState } from "react";
import { get, set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useApiRequest from '@/hooks/api-request/request';
import { EmptyFormInput } from '@/utils/helper-support';
import Button from "@/components/form/button";
import InputField from "@/components/form/input-field";
import { SuccessToast } from "@/utils/toast-notification";

const SetNotificationSetting = () => {
    //handle form submission
    const formSchema = yup.object({
        subscription_due_reminder_day: yup.string().label('subscription due reminder day').required(),
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
        data['type'] = 'subscription_due_reminder_day';
        const onSubmit = await Post({endpoint: '/admin/setting', payload: data, refreshEndpoint: 'admin/setting/subscription_due_reminder_day'});
        if ( ! onSubmit ) return;
        SuccessToast('Notification settings updated successfully');
    }

    const {
            Post,
            requestLoading,
            errorMessage,
            Get,
            getData,
            isSuccessRequest,
        } = useApiRequest(setError);

        Get('admin/setting/subscription_due_reminder_day');

        useEffect(() => {
            if ( isSuccessRequest ){
                getData && setValue('subscription_due_reminder_day', getData.value)
            }
        }, [getData])

    return (
        <div className="grid gap-4">
            <h4 className="themeTextSecondary">Notification settings</h4>
            <form onSubmit={handleSubmit(submit)} style={{ boxShadow:'rgba(149, 157, 165, 0.2) 0px 8px 24px' }} className="grid gap-4 p-5 themeRounded">
                <div className="flex">
                    <InputField 
                        label="Send Reminder X Days Before Due Date"
                        toolTip="Specify how many days in advance to notify customers about their upcoming subscription renewal."
                        value={getValues('subscription_due_reminder_day') ?? getData?.value ?? ''}
                        error={errors.subscription_due_reminder_day?.message}
                        onChangeInput={(e) => [setValue('subscription_due_reminder_day', e.target.value), setError('subscription_due_reminder_day', {message: ''})]}
                        type="number"
                        placeholder="e.g 3"
                    />
                </div>
                <Button text="Save changes" isLoading={requestLoading} type="submit"/>
            </form>
        </div>
    )
}

export default SetNotificationSetting