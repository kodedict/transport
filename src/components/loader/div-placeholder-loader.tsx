import { CircleX } from "lucide-react";
import React from "react";

type SkeletonType = {
    numberOfRows?: number,
    error?: boolean
}

const DivSkeleton : React.FC<SkeletonType> = ({numberOfRows = 1, error=false}: SkeletonType) => {
    const rows  = Array.from({length:numberOfRows})
    return(
        <>
        {!error ? rows.map((item:any, index:number) => (
            <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 p-2 bg-gray-300 rounded-full animate-pulse dark:bg-gray-600"></div>
                <div className="w-full p-2 bg-gray-300 rounded-full animate-pulse dark:bg-gray-600"></div>
            </div>

        )) : <div className="flex items-center space-x-2">
                <div className="flex items-center p-2 text-red-600 rounded-full dark:bg-text-300"><CircleX size={15}/></div>
                <div className="w-full p-2 bg-gray-300 rounded-full dark:bg-gray-600"></div>
            </div>}
        </>
    )
}

export default DivSkeleton;
