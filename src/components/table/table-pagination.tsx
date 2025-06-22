import React from "react";

type TablePaginationType = {
    onPageChange: (page: number) => void,
    totalPages: number,
    currentPage?: number,
}

const TablePagination: React.FC<TablePaginationType> = ({
    onPageChange,
    totalPages,
    currentPage = 1,
}: TablePaginationType) => {
    let pages: (number | string)[] = [];

    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        pages.push(1, 2, 3);

        const secondLastPage = totalPages - 2;
        const lastPage = totalPages - 1;
        if (currentPage >= 3) {
            if ( currentPage >= secondLastPage) {
                pages.push('...');
                ( currentPage !== secondLastPage || currentPage !== lastPage ) && pages.push(currentPage - 1);
            }else{
                ( ! pages.includes(currentPage - 2) ) && pages.push(currentPage - 2);
                ( ! pages.includes(currentPage - 1) ) && pages.push(currentPage - 1);
                ( ! pages.includes(currentPage)) && pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push(currentPage + 2);
                pages.push('...');
            }  
        }else{
            pages.push('...');
        }

        ! pages.includes(secondLastPage)   && pages.push(secondLastPage)    
        ! pages.includes(lastPage)   && pages.push(lastPage)    
        ! pages.includes(totalPages)   && pages.push(totalPages)  

        const ellipsisIndex = pages.indexOf('...');

        let numbers = pages.filter(item => typeof item === 'number') as number[];

        numbers.sort((a, b) => a - b);
        const sortedPages: (number | string)[] = [...numbers];
        sortedPages.splice(ellipsisIndex, 0, '...');

        pages = sortedPages;
    }

    return (
        <div className="flex space-x-5 text-[13px] text-gray-500">
            {pages.map((page, index) => (
                <div
                    className={`px-3 py-1 hover:bg-gray-100 hover:text-secondary rounded-md cursor-pointer ${currentPage === page ? 'bg-primary text-white' : ''}`}
                    onClick={() => typeof page === 'number' && onPageChange(page)}
                    key={index}
                >
                    {page}
                </div>
            ))}
        </div>
    );
}

export default TablePagination;
