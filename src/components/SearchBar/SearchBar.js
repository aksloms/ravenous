import React from "react";
import './SearchBar.css';

class SearchBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match'
        };
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.search = this.search.bind(this);
        this.sortByOptions = {
            "Best Match":"best_match",
            "Highest Rated":"rating",
            "Most Reviewed": "review_count"
        };
    }

    //Returns the current CSS class for a sorting option
    getSortByClass(sortByOption){
        if (this.state.sortBy === sortByOption) {
            return 'active';
        } else {
            return ''
        }
    }

    handleSortByChange(sortByOption) {
        this.setState({sortBy: sortByOption});
        this.search();
    }

    handleTermChange(event){
        this.setState({term: event.target.value});
    }

    handleLocationChange(event){
        this.setState({location: event.target.value});
    }

    handleSearch(event){
        this.search();
        event.preventDefault();
    }


    handleKeyDown(event){
        if ((event.key === 'Enter') & (this.state.location != '')){
            this.search();
        }
    }

    renderSortByOptions() {
        return Object.keys(this.sortByOptions).map(sortByOption => {
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return (<li key={sortByOptionValue} className={this.getSortByClass(sortByOptionValue)} onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>
                            {sortByOption}
                    </li>)
        });
    }

    search(){
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
    }

    render(){
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>
                    {this.renderSortByOptions()}
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input placeholder="Search Businesses" onChange={this.handleTermChange} onKeyDown={this.handleKeyDown} />
                    <input placeholder="Where?" onChange={this.handleLocationChange} onKeyDown={this.handleKeyDown}/>
                </div>
                <div className="SearchBar-submit">
                    <a onClick={this.handleSearch}>Let's Go</a>
                </div>
            </div>
        )
    }
}

export default SearchBar;