import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';

const Pagination = (props) => {

    const{page, totalPages, handlePaginationClick} = props;
    
    return (
        <div className="Pagination">
        <button className="Pagination-button"
        
        //below would call  button immediately, because we don't want the () after
        // onclick={handlePaginationClick('prev')}>
        
        //can do this
        onClick ={() => handlePaginationClick('prev')}

        //disabling if no pages
        disabled={page <= 1}
        >
        
        
        &larr;
        </button>

        <span className="Pagination-info">
            page <b>{page}</b> of <b>{totalPages}</b>
        </span>
        
        <button className="Pagination-button"
        //or this
        onClick={handlePaginationClick.bind(this,'next')}
        disabled={page >= totalPages}
        >
        &rarr;
        </button>    
        </div>
    )
}

Pagination.propTypes = {
    totalPages: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    handlePaginationClick: PropTypes.func.isRequired,
};

export default Pagination;