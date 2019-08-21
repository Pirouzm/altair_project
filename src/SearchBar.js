import React from 'react';
import './SearchBar.css';


//TODO: Implement Deact Bootstrap Table
export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      location: '',
      fullTime: false
    };

    this.search = this.search.bind(this);
    this.onDescChange = this.onDescChange.bind(this);
    this.onLocChange = this.onLocChange.bind(this);
    this.onFTChange = this.onFTChange.bind(this);
    this.clear = this.clear.bind(this);
  }

  search() {
    const { description='', location='', fullTime=false } = this.state;
    this.props.onSubmit(description, location, fullTime);
  }

  clear() {
    this.props.onClear();
  }

  onDescChange(event) {
    this.setState({ description: event.target.value });
  }

  onLocChange(event) {
    this.setState({ location: event.target.value });
  }

  onFTChange(event) {
    this.setState({ fullTime: event.target.checked });
    this.setState({ className: event.target.checked ? "clicked" : "unclicked"});
  }

  render() {
    return (
      <div className = "SearchBar">
        <input
          className = "textField"
          placeholder = "Enter Job Title"
          onChange = { this.onDescChange }
        />
        <input
          className = "textField"
          placeholder = "Enter City, State, ZIP, or Country"
          onChange = { this.onLocChange }
        />
        <label>
          <input
            className = "checkBox"
            type = "checkbox"
            onChange = { this.onFTChange }
          />
          <div
            className = "fullTime"
            onChange = { this.onFTChange }
          >
            Only show me fulltime gigs
          </div>
        </label>
        <div>
        <button className="submit" onClick={this.search}>Search</button>
        <button className="clear" onClick={this.clear}>Clear</button>
        </div>
      </div>
    );
  }
}
