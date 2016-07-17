import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {term: ''};

    }
    render() {
        return (
            <div className="search-bar">
            <form className="navbar-form navbar-left" role="search">
                <div className="input-group">
                        <input
                            type="text" 
                            className="form-control dietSearch" 
                            id="dietSearch" 
                            placeholder="Diet Search"
                            value={this.state.term}
                            onChange= {event => this.onInputChange(event.target.value) } />
                <span className="input-group-btn">
                        <button className="btn btn-default dietSearchBTN" id="dietSearchBTN" type="button"><i className="fa fa-search" aria-hidden="true"></i></button>
                </span>
                </div>
                </form>
            </div>
        );
    }

    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermChange(term);
    }

}


module.exports = SearchBar;