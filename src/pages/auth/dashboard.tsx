import Button from "@/components/form/button";
import DatePickerField from "@/components/form/date-picker"
import InputField from "@/components/form/input-field";
import TickerField from "@/components/form/ticker-field";
import NairaSvg from "@/components/naira-svg";
import useApiRequest from "@/hooks/api-request/request";
import AuthLayout from "@/layouts/auth";
import GuestLayout from "@/layouts/guest";
import PageTitle from "@/layouts/partials/page-title";
import { numberWithCommas } from "@/utils/helper-support";
import { can_permission, can_role } from "@/utils/permission";
import { ArrowRight, Book, BookUser, CarFront, GraduationCap, IdCard, LandPlot, List, Play, Siren, SquareUser, TvMinimal, Users, Users2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [date, setDate] = useState<string>('');
    const {Get, getData} = useApiRequest();
    Get('dashboard-metrics')
    return (
        <AuthLayout>
            <div>
            <PageTitle title="Dashboard" />
            <div className="grid gap-4 mt-5 md:grid-cols-3">
                <div className="p-1 border themeRounded border-primary bg-gray-50">
                    <div className="p-4 ">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-10 h-10 bg-white themeRounded text-primary">
                                    <BookUser size={18} />
                                </div>
                                <div>
                                    <h4 className="md:text-[2em] font-bold">{getData?.total_products || 0}</h4>
                                    <p className="themeTextMuted">Total Owners</p>
                                </div>
                        </div>
                        <div className="mt-1">
                        </div>
                    </div>
                </div>
                <div className="p-1 border themeRounded border-primary bg-gray-50">
                    <div className="p-4 ">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-10 h-10 bg-white themeRounded text-primary">
                                    <IdCard size={18} />
                                </div>
                                <div>
                                    <h4 className="md:text-[2em] font-bold">{getData?.total_products || 0}</h4>
                                    <p className="themeTextMuted">Total Drivers</p>
                                </div>
                        </div>
                        <div className="mt-1">
                        </div>
                    </div>
                </div>
                <div className="p-1 border themeRounded border-primary bg-gray-50">
                    <div className="p-4 ">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-10 h-10 bg-white themeRounded text-primary">
                                    <CarFront size={18} />
                                </div>
                                <div>
                                    <h4 className="md:text-[2em] font-bold">{getData?.total_products || 0}</h4>
                                    <p className="themeTextMuted">Total Vehicles</p>
                                </div>
                        </div>
                        <div className="mt-1">
                        </div>
                    </div>
                </div>
                <div className="p-1 border themeRounded border-primary bg-gray-50">
                    <div className="p-4 ">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-10 h-10 bg-white themeRounded text-primary">
                                    <Siren size={18} />
                                </div>
                                <div>
                                    <h4 className="md:text-[2em] font-bold">{getData?.total_products || 0}</h4>
                                    <p className="themeTextMuted">Total Enforcers</p>
                                </div>
                        </div>
                        <div className="mt-1">
                        </div>
                    </div>
                </div>
                <div className="p-1 border themeRounded border-primary bg-gray-50">
                    <div className="p-4 ">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-10 h-10 bg-white themeRounded text-primary">
                                    <Users2 size={18} />
                                </div>
                                <div>
                                    <h4 className="md:text-[2em] font-bold">{getData?.total_products || 0}</h4>
                                    <p className="themeTextMuted">Total Supervisors</p>
                                </div>
                        </div>
                        <div className="mt-1">
                        </div>
                    </div>
                </div>
                <div className="p-1 border themeRounded border-primary bg-gray-50">
                    <div className="p-4 ">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-10 h-10 bg-white themeRounded text-primary">
                                    <Users size={18} />
                                </div>
                                <div>
                                    <h4 className="md:text-[2em] font-bold">{getData?.total_products || 0}</h4>
                                    <p className="themeTextMuted">Total Admins</p>
                                </div>
                        </div>
                        <div className="mt-1">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </AuthLayout>
    )
}

export default Dashboard