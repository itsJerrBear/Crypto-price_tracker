import React from 'react';
import {withRouter} from 'react-router-dom';
import Loading from './Loading';
import { API_URL } from '../../config';
import { handleResponse } from '../../helpers';
import './Search.css';

class Search extends React.Component {
constructor(){
  super();

  this.state = {
    searchQuery: '',
    loading: false,
    searchResults: [],
  };

  //this.handleSubmit = this.handleSubmit.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.handleRedirect = this.handleRedirect.bind(this);

}

//#region old handle submit
  //controlled component method for handling forms
  //use 'ref' as uncontrolled method, but useful for 3rd party dom integrations
  /*
  handleSubmit(event) {
      event.preventDefault();
      //console.log("submitted");
      //console.log(this.searchQuery.value);
      //console.log(this.firstname.value);

      console.log(this.state);
  }
  */
 //#endregion 

 handleChange(event){
  //console.log(event.target.name);
  //console.log(event.target.value);

  
  const searchQuery = event.target.value;

  //better way
  this.setState({ searchQuery});
  
  // if we don't have a search query, don't send the request to the server
  if(!searchQuery){
    return '';
  }

  this.setState({ loading: true});

  fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
    .then(handleResponse)
    .then((result) => {
      //console.log(result);

      this.setState({ 
        loading: false,
        searchResults: result,
      });

  });

  //#region basic way
  //basic way
  /*
  if(inputName === 'searchQuery') {
    this.setState({searchQuery: inputValue});
  } else if (inputName === 'firstname'){
    this.setState({firstname: inputValue});
  }
  */
 //#endregion

  console.log(this.state);
}

handleRedirect(currencyId){

    //clearing search input value and closing autocomplete container
    this.setState({
      searchQuery: '',
      searchResults: [],
    });

    this.props.history.push(`/currency/${currencyId}`);

}

renderSearchResults() {
    const {searchResults,searchQuery, loading} = this.state;

    if(!searchQuery){
      return '';
    }

    if(searchResults.length > 0) {
      return(
        <div className="Search-result-container" >
         {searchResults.map(result =>(
            <div
           key={result.id}
            className="Search-result"
            onClick={() => this.handleRedirect(result.id)}
            >
           {result.name} ({result.symbol})  
            </div>
         )
          )}
        </div>
      )
    }
  
    if(!loading){
      return(
        <div className="Search-result-container  ">
          <div className= "Search-no-result">
            No results found.
          </div>
        </div>
      );
    }   
  }

  render() {
    const {loading,searchQuery} = this.state;

    return (
      //div used to be form element. wanted to not refresh page so am using div instead
      <div className="Search">
        <span className="Search-icon" />

        <input  
        className="Search-input"
        type="text"
        placeholder="Currency name"
        onChange = {this.handleChange}
        value={searchQuery}
        />
        
        {loading &&
        <div className="Search-loading">
          <Loading 
            width = '12px'
            height = '12px'
          />
        </div> }

        {this.renderSearchResults()}
      </div>
    );
  }
}

export default withRouter(Search);
