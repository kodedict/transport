import Dropdown from "@/components/dropdown/default-dropdown";
import LayoutType from "@/types/layout-type";
import { Bell, BookUser, CarFront, ChevronDown, ChevronLeft, ChevronRight, CircleX, House, IdCard, LandPlot, List, LogOut, Menu, Notebook, Siren, Sprout, SquareUser, User, UserCog, Users, Users2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AppNotification from "./partials/app-notification";
import Tooltip from "@/components/tooltip";
import LineLoader from "@/components/loader/line-loader";
import { ToastContainer } from "react-toastify";
import useApiRequest from "@/hooks/api-request/request";
import { AuthUser, onLogout } from "@/store/auth";
import DefaultModal from "@/components/modal/default-modal";
import { abbreviateString, getGreeting, ucFirst } from "@/utils/helper-support";
import { can_permission, can_role } from "@/utils/permission";
import Button from "@/components/form/button";

const SiteName = (import.meta as any).env.VITE_APP_NAME;

const AuthLayout : React.FC <LayoutType> = ({children}) => {
    const [collapsed, setCollapsed] = useState(false);

    const location = useLocation();

    const currentUrl = useMemo(() => location.pathname, [location]);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const {Get, getData, isErrorRequest} = useApiRequest();

    //notification
    const [currentNotificationPage, setCurrentNotificationPage] = useState<number>(1);

    // Get(`notification?page=${currentNotificationPage}`);

    //${isMenuOpen ? 'translate-x-0 h-full w-full ' : '-translate-x-full md:translate-x-0'}

    interface sidebarLinksType{
        to:string,
        label:string,
        icon: React.ReactNode,
    }

    const Auth = AuthUser();

    const sidebarLinks : sidebarLinksType[] = [
        { to: "/", label: "Dashboard", icon: <House size={18} /> },
        { to: "/owners", label: "Owners", icon: <BookUser size={18} /> },
        { to: "/drivers", label: "Drivers", icon: <IdCard size={18} /> },
        { to: "/vehicles", label: "Vehicles", icon: <CarFront size={18} /> },
        { to: "/enforcers", label: "Enforcers", icon: <Siren size={18} /> },
        { to: "/supervisors", label: "Supervisors", icon: <Users2 size={18} /> },
        { to: "/settings", label: "Settings", icon: <UserCog size={18} /> },
];
    
    return (
        <div className="flex-col min-h-screen">
            <div className="relative w-full m-0 md:flex m-h-screen">
                <div className={`${collapsed ? 'lg:w-[5em] ' : `lg:w-1/5 ${isMenuOpen ? 'translate-x-0 h-full w-full ' : '-translate-x-full md:translate-x-0'}`} z-20 absolute  md:relative md:flex flex-col min-h-screen py-5 pb-20 text-white duration-500  bg-secondary`}>
                    <div className={`relative flex items-center pb-5 mt-5 space-x-3 ${!collapsed ? 'px-10 justify-between' : 'justify-center'}`}>
                        <h1 className={`font-bold lowercase`}>
                            <span className={`${collapsed ? 'hidden' : ''} capitalize duration-500 whitespace-nowrap`}>tellr</span>
                        </h1>
                    </div>
                    <div className="mt-[2em] font-[400] text-[14px]">
                        <div className="grid gap-y-3">
                            {sidebarLinks.map((menu, index) => (
                                <Link
                                    to={menu.to}
                                    key={index}
                                    className={`relative flex items-center py-3 transition-all duration-500 ease-in-out hover:bg-primary hover:font-[700] ${currentUrl === menu.to ? 'font-[700] bg-primary' : ''
                                        } ${collapsed ? 'justify-center lg:w-[5.7em]' : 'px-10 w-full'}`}
                                >
                                    <div className="relative">
                                        {menu.icon}
                                    </div>
                                    <h3 className={`absolute whitespace-nowrap left-16 transition-all duration-300 ${collapsed ? 'hidden' : 'ml-3'}`}>
                                        {menu.label}
                                    </h3>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="relative w-full">
                    <div id="line_loader" className="fixed z-50 hidden w-full"><LineLoader /></div>
                    <div className="outer-container">
                        <div className="flex justify-between">
                            <h3 className="page-title text-[1.3em] font-medium">{getGreeting()}</h3>
                            <div className="flex items-center space-x-6">
                                <AppNotification setCurrentNotificationPage={setCurrentNotificationPage} data={getData} />
                                <MenuDropdown />
                            </div>
                        </div>
                        <button onClick={() => setIsMenuOpen(true)} type="button" className="flex items-center my-3 space-x-2 md:hidden">
                            <Menu size={18} />
                            <span>Open navigation</span>
                        </button>
                        <div className='my-5'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer pauseOnFocusLoss={false} />
            <div id="unauthorized_layout">

            </div>
        </div>
    )
}

export default AuthLayout

const MenuDropdown = () => {
    const Auth = AuthUser();
    const {
            Post,
            requestLoading,
        } = useApiRequest();

    const logout = async () => {
        const logout = await Post({endpoint: '/logout'});
        if ( ! logout ) return;
        onLogout();
    }

    const trigger = (
        <div className="flex items-center space-x-4 cursor-pointer">
                <h2 className="page-title text-[.8em] uppercase">
                    Sudo Admin
                </h2>
                <div className="flex items-center justify-center w-8 h-8 overflow-hidden bg-green-300 rounded-full">
                    {`${Auth.first_name?.charAt(0) ?? ''}${Auth.last_name?.charAt(0) ?? ''}`}
                </div>
                {/* <ChevronDown size={18} /> */}
            </div>
    );
    return (
        <Dropdown params={{ trigger }}>
            <div className="grid gap-4">
                <h2 className="page-title text-[.8em] uppercase">
                    {abbreviateString(`${Auth.first_name} ${Auth.last_name}`, 15)}
                    </h2>
                <Link to={'/settings'} className="flex space-x-2 text-[15px] hover:text-primary items-center">
                    <span><UserCog size={18} /></span>
                    <span>Account</span>
                </Link>
                <span onClick={logout} className="flex space-x-2 text-[15px] hover:text-primary cursor-pointer items-center">
                    <span><LogOut size={18} /></span>
                    <span>Logout</span>
                </span>
            </div>
        </Dropdown>
    );
}