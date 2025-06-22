import Button from "@/components/form/button"
import InputField from "@/components/form/input-field"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import useApiRequest from '@/hooks/api-request/request';
import { EmptyFormInput } from '@/utils/helper-support';
import { useEffect, useState } from "react"
import { SuccessToast } from "@/utils/toast-notification"

const SupervisorForm = ({
    isEdit = false,
    supervisor,
} : {
    isEdit?: boolean,
    supervisor?: UserType | any,
}) => {
        //handle form submission
        const formSchema = yup.object({
            first_name: yup.string().label('first name').required(),
            last_name: yup.string().label('last name').required(),
            phone_number: yup.string().label('phone number').required(),
            ...(!isEdit ? {email: yup.string().label('email').required()} :{email: yup.string().label('email')}),
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
            Get,
            getData
        } = useApiRequest(setError);

        //Get('admin/permission');

        const[permissions, setPermissions] = useState<any>([]);

        useEffect(() => {supervisor && reset({
            first_name: supervisor.first_name,
            last_name: supervisor.last_name,
            phone_number: supervisor.phone_number,
        }); supervisor && setPermissions(supervisor.permissions)}, [supervisor])

    const Submit = async (data:any) => {
        data.permissions = permissions;
        data['uuid'] = supervisor?.uuid;
        data.email = data.email == '' ? undefined : data.email;
        //data.first_name = isEdit ? supervisor.first_name : data.first_name;
        //data.last_name = isEdit ? supervisor.last_name : data.last_name;
        const endpoint = isEdit ? `admin/supervisor/update` : 'admin/supervisor';
        const onSubmit = await Post({endpoint, payload: data, refreshEndpoint: `admin/supervisor`});
        if ( ! onSubmit )return;
        SuccessToast(`Supervisor ${isEdit ? 'updated' : 'created'} successfully`)
        if (!isEdit) {
            const emptyValues = EmptyFormInput(formSchema);
            reset(emptyValues)
            return
        }
        supervisor['email'] = onSubmit.email;
        setValue('email', '');
    }

    return (
        <form onSubmit={handleSubmit(Submit)} className="grid gap-5 mt-10">
            <div className="grid gap-5 md:grid-cols-2 p-5 themeRounded" style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
                <InputField 
                    label="First name"
                    value={getValues('first_name')}
                    error={errors.first_name?.message}
                    onChangeInput={(e) => [setValue('first_name', e.target.value), setError('first_name', {message: ''})]}
                   
                />
                <InputField
                    label="Last name"
                    value={getValues('last_name')}
                    error={errors.last_name?.message}
                    onChangeInput={(e) => [setValue('last_name', e.target.value), setError('last_name', { message: '' })]}

                />
                <div>
                <InputField 
                    label="Email"
                    type="email"
                    value={getValues('email')}
                    placeholder={isEdit ? supervisor?.email : 'Enter email'}
                    error={errors.email?.message}
                    onChangeInput={(e) => [setValue('email', e.target.value), setError('email', {message: ''})]}
                />
                    {isEdit && <p className="mt-1 text-xs themeTextMuted">Enter new email if you want to update</p>}
                </div>
                <InputField
                    label="Phone number"
                    value={getValues('phone_number')}
                    type="number"
                    error={errors.phone_number?.message}
                    onChangeInput={(e) => [setValue('phone_number', e.target.value), setError('phone_number', { message: '' })]}

                />
            </div>
            <Button isLoading={requestLoading} type="submit" className="w-fit" text={`${isEdit ? 'Update' : 'Create'} Supervisor`}/>
        </form>
    )
}

export default SupervisorForm