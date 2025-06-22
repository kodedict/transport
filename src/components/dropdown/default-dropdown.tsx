import LayoutType from "@/types/layout-type";
import { ChevronDown } from "lucide-react";
import { use, useEffect, useRef, useState } from "react";

type DropdownType = {
    trigger: React.ReactNode;
};

interface DropdownProps extends LayoutType {
    params?: DropdownType;
    forceClose?: boolean; //to force close the dropdown, set this to true
}

const Dropdown: React.FC<DropdownProps> = ({ children, params, forceClose }) => {
    
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
        const dropdownRef = useRef<HTMLDivElement>(null);
    
        // Handle clicks outside the dropdown
        const handleOnClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
    
        // Attach event listeners when the component mounts
        useEffect(() => {
            document.addEventListener("click", handleOnClickOutside);
    
            return () => {
                document.removeEventListener("click", handleOnClickOutside);
            };
        }, []);

        useEffect(() => {
            forceClose && setShowDropdown(!forceClose);
        }
        , [forceClose]);
    
    return (
        <div ref={dropdownRef} className="relative">
            <button onClick={() => setShowDropdown(!showDropdown)} type="button">
                {params?.trigger ? params.trigger : (
                    <div className="flex items-center space-x-2">
                        <span>Dropdown</span>
                        <ChevronDown size={18}/>
                    </div>
                )}
            </button>
            {/* Dropdown Menu with Animation */}
            <div className={`absolute right-0 z-50 w-[15em] bg-white rounded top-10 p-5 transition-all duration-200 ease-in-out
                ${showDropdown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-10px] pointer-events-none"}`}
                style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}>
                {children}
            </div>
        </div>
    );
};

export default Dropdown;
