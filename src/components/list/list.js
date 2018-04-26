import React from 'react';
import { handleResponse } from '../../helpers';
import {API_URL} from '../../config';
import Loading from '../common/Loading';
import Table from './Table';
import Pagination from './Pagination';

class List extends React.Component {
    constructor() {
        super();

        //inital state after super
        this.state = {
            loading: false,
            currencies: [],
            error: null,
            totalPages: 0,
            page: 1,
        };

        this.handlePaginationClick = this.handlePaginationClick.bind(this);
    }

    //React life cycle. 'Will' is before object constructor, 'Did' would be right after
    //can do ComponentWillReceiveProps, ComponentWillMount, ComponentWillUnmount
    componentDidMount() {
        //this.load(this.props);
        this.fetchCurrencies();
    }

    //need method to call next / prev set of currencies
    fetchCurrencies() {
        //pasted from component DidMount
        this.setState({ loading: true })

        const {page} = this.state;

        fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
            .then(handleResponse)
            .then((data) => {
                //console.log('Success', data);
                const { currencies, totalPages} = data;

                this.setState({
                    currencies: currencies,
                    totalPages: totalPages,
                    loading: false,

                });
            })
            .catch((error) => {
                this.setState({
                    error: error.errorMessage,
                    loading: false,
                })
                //console.log('Error', error);
            });
    }

    

        handlePaginationClick(direction) {
        //handlePaginationClick = (direction) => {
        //console.log(this); was undefined before binding it
        //fixed it with =, => above
        //going to do another way, defining it in constructor 

        let nextPage = this.state.page;

        //shorter way than commented area below
        nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1;

        this.setState({page: nextPage}, () => {
            //call fetchCurrencies function inside setState's callback
            // because we have to make sure first page state is updated
            this.fetchCurrencies();
        });

        /*
        if(direction === 'next'){
            nextPage++;
        } else{
            nextPage--;
        }
        */
    }

    render() {
        //console.log(this.state);

        const {loading, error, currencies, page, totalPages} = this.state;

        //render only loading component, if loading state is set to true 
        if (loading) {
            return <div className="loading-container"><Loading /></div>
        }

        //render only error message, if error occured while fetching data
        if(error){
            return <div className="error">{error}</div>
        }

        return (
            <div>
            <Table currencies = {currencies}
            />

            <Pagination 
            page={page}
            totalPages ={totalPages}
            handlePaginationClick={this.handlePaginationClick}
            />

            </div>
        );
    }
}

export default List;