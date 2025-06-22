import Button from "@/components/form/button";
import InputField from "@/components/form/input-field";
import AuthLayout from "@/layouts/auth";
import PageTitle from "@/layouts/partials/page-title";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CornerRightUp } from "lucide-react";
import moment from "moment";
import EmptyState from "@/components/empty-state";
import TablePagination from "@/components/table/table-pagination";
import useApiRequest from "@/hooks/api-request/request";
import debounce from "lodash.debounce";


const ListVehicleType = () => {
     const [date, setDate] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const [searchInput, setSearchInput] = useState<string>('');
    const [queryParams, setQueryParams] = useState<string>('');
    const {Get, getData, isErrorRequest} = useApiRequest();
    Get(`admin/vehicle-type?page=${currentPage}${queryParams}`);

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
        const query = (currentPage === 1 && params === '') ? '/vehicle/type' : `?page=${currentPage}${params}`;
        window.history.pushState({}, '', query);
        setQueryParams(params);
    }, [currentPage, date, search]);
    return (
        <AuthLayout>
            <div>
                <PageTitle title="Vehicle Type" back="/vehicles" />
                <div className="items-center space-x-2 md:flex">
                        <Link to={'create'}>
                            <Button text="Add New Vehicle Type"/>
                        </Link>
                        <InputField onChangeInput={(e) => setSearchInput(e.target.value)} value={searchInput} placeholder="Search for vehicle type" type="search"/>
                    </div>
                    {!isErrorRequest && (
                        <div className="mt-[3em] space-y-[3em]">
                            <div className="relative overflow-x-auto ">
                                    <table className="text-secondary font-[500] text-[14px] w-full relative z-10">
                                        <thead>
                                            <tr className="border-b border-[#E6EAF0] bg-[#fafafa]">
                                                <td className="px-4 py-3">Model</td>
                                                <td className="px-6 py-3">Date Created</td>
                                            </tr>
                                        </thead>
                                        <tbody className="relative">
                                            {getData ? getData?.items?.map((item: VehicleModelType, index: number)=>(
                                                <tr key={index} className="border-b border-[#E6EAF0] themeTextMuted">
                                                <td className="flex px-4 py-3 space-x-2 capitalize cursor-pointer text-secondary hover:underline">
                                                    <Link to={`/vehicle/type/${item.uuid}/show`} className="flex items-center space-x-2">
                                                        <span>{item.model}</span>
                                                        <CornerRightUp size={18} />
                                                    </Link>
                                                </td>
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
                        {getData?.items.length === 0 && <EmptyState page="Vehicle Type"/>}
                        </div>
                    )}
            </div>
        </AuthLayout>
    )
}

export default ListVehicleType