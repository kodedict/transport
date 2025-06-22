import Button from "@/components/form/button"
import InputField from "@/components/form/input-field"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import useApiRequest from '@/hooks/api-request/request';
import { EmptyFormInput } from '@/utils/helper-support';
import { useEffect } from "react"
import { SuccessToast } from "@/utils/toast-notification"

const VehicleTypeForm = ({
    isEdit = false,
    vehicleType,
} : {
    isEdit?: boolean,
    vehicleType?: UserType | any,
}) => {
        //handle form submission
        const formSchema = yup.object({
            model: yup.string().label('first name').required(),
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
        } = useApiRequest(setError);


        useEffect(() => {vehicleType && reset({
            model: vehicleType.model,
        })}, [vehicleType])

    const Submit = async (data:any) => {
        data['uuid'] = vehicleType?.uuid;
        const endpoint = isEdit ? `admin/vehicle-type/update` : 'admin/vehicle-type';
        const onSubmit = await Post({endpoint, payload: data, refreshEndpoint: `admin/vehicle-type`});
        if ( ! onSubmit )return;
        SuccessToast(`Vehicle Type ${isEdit ? 'updated' : 'created'} successfully`)
        if (!isEdit) {
            const emptyValues = EmptyFormInput(formSchema);
            reset(emptyValues)
            return
        }
    }

    return (
        <form onSubmit={handleSubmit(Submit)} className="grid gap-5 mt-10">
            <div className="grid gap-5 md:grid-cols-2 p-5 themeRounded" style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
                <InputField
                    label="Model"
                    value={getValues('model')}
                    error={errors.model?.message}
                    onChangeInput={(e) => [setValue('model', e.target.value), setError('model', { message: '' })]}

                />
            </div>
            <Button isLoading={requestLoading} type="submit" className="w-fit" text={`${isEdit ? 'Update' : 'Create'} Vehicle Type`}/>
        </form>
    )
}

export default VehicleTypeForm