import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

const SiteName = (import.meta as any).env.VITE_APP_NAME;

const GuestLayout : React.FC <LayoutProps> = ({children}) => {
    return (
        <div className="md:flex">
            <div className="container w-full md:h-[100vh]  h-[50vh] md:w-1/2">
                <div className="h-full bg-primary "></div>
            </div>
            <div className="md:w-1/2 md:pt-[6rem] w-full themeBg">
                <div className="outer-container md:px-[5em]">
                    <h1 className="text-[1em] font-bold mb-12 capitalize">{SiteName}</h1>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default GuestLayout