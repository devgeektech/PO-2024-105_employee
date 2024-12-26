
import React, { useState } from "react";
import Pagination from "react-bootstrap/Pagination";

interface Props {
    totalRecords: number;
    recordsPerPage?: number;
    onPageChange: (pageNumber: number) => void;  // Function to notify parent about page change event
}

export const CommonPagination = ({ totalRecords, recordsPerPage, onPageChange }: Props) => {
    const [activePage, setActivePage] = useState(1);

    // Calculate total pages
    recordsPerPage = recordsPerPage || 10;
    const totalPages = Math.ceil(totalRecords / recordsPerPage);

    // Handle page click
    const handlePageClick = (pageNumber: number) => {
        setActivePage(pageNumber);
        onPageChange(pageNumber); // Notify parent about the page change
    };

    // Generate pagination items
    const paginationItems = [];
    for (let page = 1; page <= totalPages; page++) {
        paginationItems.push(
            <Pagination.Item
                key={page}
                active={page === activePage}
                onClick={() => handlePageClick(page)}
            >
                {page}
            </Pagination.Item>
        );
    }

    return (
        <div>
            <Pagination>{paginationItems}</Pagination>
        </div>
    );
};
