import Button from "@/components/form/button"
import InputField from "@/components/form/input-field"
import { set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import useApiRequest from '@/hooks/api-request/request';
import { EmptyFormInput, strReplace } from '@/utils/helper-support';
import { use, useEffect, useState } from "react"
import { SuccessToast } from "@/utils/toast-notification"
import SearchableDropdown from "@/components/form/searchable-dropdown"
import debounce from "lodash.debounce"
import OptionType from "@/types/option-type";

const VehicleForm = ({
    isEdit = false,
    vehicle,
} : {
    isEdit?: boolean,
    vehicle?: UserType | any,
}) => {
        //handle form submission
        const formSchema = yup.object({
            plate_number: yup.string().label('first name').required(),
            driver_id: yup.string().label('driver').required(),
            owner_id: yup.string().label('owner').required(),
            vehicle_type_id: yup.string().label('vehicle type').required(),
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
            ReturnGet,
        } = useApiRequest(setError);


    const [searchOwner, setSearchOwner] = useState<string>('');
    const [owners, setOwners] = useState<OptionType[]>([]);

    useEffect(() => {
        const handler = debounce(async () => {
            const response = await ReturnGet(`admin/owner?search=${searchOwner}`)
            if (!response) return;
            setOwners(response.items.map((item: UserType) => ({ value: item.uuid, name: `${item.first_name} ${item.last_name}` })));
        }, 500)

        handler()
        return () => handler.cancel()
    }, [searchOwner])

    const [searchDriver, setSearchDriver] = useState<string>('');
    const [drivers, setDrivers] = useState<OptionType[]>([]);

    useEffect(() => {
        const handler = debounce(async () => {
            const response = await ReturnGet(`admin/driver?search=${searchDriver}`)
            if (!response) return;
            setDrivers(response.items.map((item: UserType) => ({ value: item.uuid, name: `${item.first_name} ${item.last_name}` })));
        }, 500)

        handler()
        return () => handler.cancel()
    }, [searchDriver])

    const [searchVehicle, setSearchVehicle] = useState<string>('');
    const [vehicles, setVehicles] = useState<OptionType[]>([]);

    useEffect(() => {
        const handler = debounce(async () => {
            const response = await ReturnGet(`admin/vehicle-type?search=${searchVehicle}`)
            if (!response) return;
            setVehicles(response.items.map((item: VehicleModelType) => ({ value: item.uuid, name: `${item.model}` })));
        }, 500)

        handler()
        return () => handler.cancel()
    }, [searchVehicle])

       

    useEffect(() => {
        if (vehicle) {
            reset({
                plate_number: vehicle.plate_number,
                driver_id: vehicle.driver_id,
                owner_id: vehicle.owner_id,
                vehicle_type_id: vehicle.vehicle_type_id,
            });
            setSearchDriver(`${vehicle.driver.first_name} ${vehicle.driver.last_name}`);
            setSearchOwner(`${vehicle.owner.first_name} ${vehicle.owner.last_name}`);
            setSearchVehicle(vehicle.vehicle_type);
        }
    }, [vehicle])

    const Submit = async (data:any) => {
        data['uuid'] = vehicle?.uuid;
        const endpoint = isEdit ? `admin/vehicle/update` : 'admin/vehicle';
        const onSubmit = await Post({endpoint, payload: data, refreshEndpoint: `admin/vehicle`});
        if ( ! onSubmit )return;
        SuccessToast(`Vehicle ${isEdit ? 'updated' : 'created'} successfully`)
        if (!isEdit) {
            const emptyValues = EmptyFormInput(formSchema);
            reset(emptyValues)
            setSearchDriver('');
            setSearchOwner('');
            setSearchVehicle('');
            return
        }
    }

    return (
        <form onSubmit={handleSubmit(Submit)} className="grid gap-5 mt-10">
            <div className="grid gap-5 md:grid-cols-2 p-5 themeRounded" style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
                <SearchableDropdown
                    label="Vehicle type"
                    error={errors.vehicle_type_id?.message}
                    onChangeInput={(e) => setSearchVehicle(e.target.value)}
                    value={searchVehicle}
                    options={vehicles}
                    onSelectedOption={(value => setValue('vehicle_type_id', value))}
                />
                <InputField 
                    label="Plate number"
                    value={getValues('plate_number')}
                    error={errors.plate_number?.message}
                    onChangeInput={(e) => [setValue('plate_number', e.target.value), setError('plate_number', {message: ''})]}
                />
                <SearchableDropdown 
                    label="Owner"
                    error={errors.owner_id?.message}
                    placeholder="Search owner"
                    onChangeInput={(e) => setSearchOwner(e.target.value)}
                    value={searchOwner}
                    options={owners}
                    onSelectedOption={(value => setValue('owner_id', value))}
                />
                <SearchableDropdown
                    label="Driver"
                    error={errors.driver_id?.message}
                    onChangeInput={(e) => setSearchDriver(e.target.value)}
                    value={searchDriver}
                    options={drivers}
                    onSelectedOption={(value => setValue('driver_id', value))}
                />
            </div>
            <Button isLoading={requestLoading} type="submit" className="w-fit" text={`${isEdit ? 'Update' : 'Create'} Vehicle`}/>
        </form>
    )
}

export default VehicleForm