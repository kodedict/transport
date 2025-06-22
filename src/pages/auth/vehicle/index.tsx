import Button from "@/components/form/button";
import DatePickerField from "@/components/form/date-picker"
import InputField from "@/components/form/input-field";
import AuthLayout from "@/layouts/auth";
import PageTitle from "@/layouts/partials/page-title";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditUser from "./edit";
import { CornerRightUp } from "lucide-react";
import moment from "moment";
import EmptyState from "@/components/empty-state";
import TablePagination from "@/components/table/table-pagination";
import useApiRequest from "@/hooks/api-request/request";
import debounce from "lodash.debounce";


const ListVehicle = () => {
     const [date, setDate] = useState<string>('');
    const [vehicle, setUser] = useState<UserType|null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const [searchInput, setSearchInput] = useState<string>('');
    const [queryParams, setQueryParams] = useState<string>('');
    const {Get, getData, isErrorRequest} = useApiRequest();
    Get(`admin/vehicle?page=${currentPage}${queryParams}`);

    useEffect(() => {
        const handler = debounce(() => {
            setCurrentPage(1)
            setSearch(searchInput)
        }, 500)

        handler()
        return () => handler.cancel()
        }, [searchInput])

        useEffect(() => {
        let params = '';
        search && (params += `&search=${search}`);
        date && (params += `&date_registered=${date}`);
        const query = (currentPage === 1 && params === '') ? '/vehicles' : `?page=${currentPage}${params}`;
        window.history.pushState({}, '', query);
        setQueryParams(params);
    }, [currentPage, date, search]);
    return (
        <AuthLayout>
            <div>
                <PageTitle title="Vehicles" />
                <div className="items-center space-x-2 md:flex">
                        <Link to={'create'}>
                            <Button text="Add New Vehicle"/>
                        </Link>
                        <Link to={'/vehicle/type'}>
                            <Button design="primary-outline" text="Vehicle Type"/>
                        </Link>
                        <DatePickerField onChangeInput={(date) => setDate(date)} value={date} placeholder="Filter by date added"/>
                        <InputField onChangeInput={(e) => setSearchInput(e.target.value)} value={searchInput} placeholder="Search for vehicle" type="search"/>
                    </div>
                    {!isErrorRequest && (
                        <div className="mt-[3em] space-y-[3em]">
                            <div className="relative overflow-x-auto ">
                                    <table className="text-secondary font-[500] text-[14px] w-full relative z-10 whitespace-nowrap">
                                        <thead>
                                            <tr className="border-b border-[#E6EAF0] bg-[#fafafa]">
                                                <td className="px-4 py-3">Plate Number</td>
                                                <td className="px-6 py-3">Type</td>
                                                <td className="px-6 py-3">Driver</td>
                                                <td className="px-6 py-3">Owner</td>
                                                <td className="px-6 py-3">Date Created</td>
                                            </tr>
                                        </thead>
                                        <tbody className="relative">
                                            {getData ? getData?.items?.map((item: UserType, index: number)=>(
                                                <tr key={index} className="border-b border-[#E6EAF0] themeTextMuted">
                                                <td className="flex px-4 py-3 space-x-2 capitalize cursor-pointer text-secondary hover:underline uppercase">
                                                    <Link to={`/vehicles/${item.uuid}/show`} className="flex items-center space-x-2">
                                                        <span>{item.plate_number} {item.last_name}</span>
                                                        <CornerRightUp size={18} />
                                                    </Link>
                                                    </td>
                                                    <td className="px-6 py-3 capitalize">{item.vehicle_type}</td>
                                                    <td className="px-6 py-3 capitalize">{item.driver.first_name} {item.driver.last_name}</td>
                                                    <td className="px-6 py-3 capitalize">{item.owner.first_name} {item.owner.last_name}</td>
                                                <td className="px-6 py-3">{moment(`${item.created_at}`).format('Do MMM, YYYY')}</td>
                                            </tr>
                                            )) : (
                                                <></>
                                            )}
                                        </tbody>
                                    </table>
                            </div> 
                            <TablePagination
                                totalPages={getData?.totalPages ?? 0} 
                                onPageChange={(page) => setCurrentPage(page)} 
                                currentPage={getData?.page}
                            />
                        {getData?.items.length === 0 && <EmptyState page="vehicle"/>}
                        </div>
                    )}
            </div>
        </AuthLayout>
    )
}

export default ListVehicle