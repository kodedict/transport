import { Info } from "lucide-react";
import { useRef, useState } from "react";

interface TooltipType {
    text: string;
    info?: React.ReactNode;
}

const Tooltip = ({ text, info }: TooltipType) => {
    const [showContent, setShowContent] = useState<boolean>(false);
    const tooltipRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={tooltipRef}
            className="inline-block relativee"
            onMouseEnter={() => setShowContent(true)}
            onMouseLeave={() => setShowContent(false)}
        >
            <span className="cursor-pointer">
                {info ?? <Info size={15}/>}
            </span>
            {showContent && (
                <div className="bg-gray-200  text-secondary p-2 font-light text-[13px] absolute z-20 w-fit" style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}>
                    {text}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
