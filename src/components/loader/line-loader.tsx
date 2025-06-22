import React from "react";

const LineLoader : React.FC = () => {
    return(
        <div className="relative w-full h-[4px] overflow-hidden bg-gray-200">
                <div className="h-full bg-primary loading-line"></div>
            </div>
    );
}

export default LineLoader