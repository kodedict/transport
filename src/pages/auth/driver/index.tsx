import Button from "@/components/form/button";
import DatePickerField from "@/components/form/date-picker"
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


const ListDriver = () => {
     const [date, setDate] = useState<string>('');
    const [user, setUser] = useState<UserType|null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const [searchInput, setSearchInput] = useState<string>('');
    const [queryParams, setQueryParams] = useState<string>('');
    const {Get, getData, isErrorRequest} = useApiRequest();
    Get(`admin/driver?page=${currentPage}${queryParams}`);

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
        const query = (currentPage === 1 && params === '') ? '/drivers' : `?page=${currentPage}${params}`;
        window.history.pushState({}, '', query);
        setQueryParams(params);
    }, [currentPage, date, search]);
    return (
        <AuthLayout>
            <div>
                <PageTitle title="Drivers" />
                <div className="items-center space-x-2 md:flex">
                        <Link to={'create'}>
                            <Button text="Add New Driver"/>
                        </Link>
                        <DatePickerField onChangeInput={(date) => setDate(date)} value={date} placeholder="Filter by date created"/>
                        <InputField onChangeInput={(e) => setSearchInput(e.target.value)} value={searchInput} placeholder="Search for driver" type="search"/>
                    </div>
                    {!isErrorRequest && (
                        <div className="mt-[3em] space-y-[3em]">
                            <div className="relative overflow-x-auto ">
                                    <table className="text-secondary font-[500] text-[14px] w-full relative z-10 whitespace-nowrap">
                                        <thead>
                                            <tr className="border-b border-[#E6EAF0] bg-[#fafafa]">
                                                <td className="px-4 py-3">Fullname</td>
                                                <td className="px-6 py-3">Email</td>
                                                <td className="px-6 py-3">Date Created</td>
                                            </tr>
                                        </thead>
                                        <tbody className="relative">
                                            {getData ? getData?.items?.map((item: UserType, index: number)=>(
                                                <tr key={index} className="border-b border-[#E6EAF0] themeTextMuted">
                                                <td className="flex px-4 py-3 space-x-2 capitalize cursor-pointer text-secondary hover:underline">
                                                    <Link to={`/drivers/${item.uuid}/show`} className="flex items-center space-x-2">
                                                            <span>{item.first_name} {item.last_name}</span>
                                                            <CornerRightUp size={18} />
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-3">{item.email}</td>
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
                        {getData?.items.length === 0 && <EmptyState page="driver"/>}
                        </div>
                    )}
            </div>
        </AuthLayout>
    )
}

export default ListDriver