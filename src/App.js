import React from 'react';
import { SearchBar } from './SearchBar';
import { APIRequests } from './APIRequests';
import JobsTable from './JobsTable';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobsArr: [],
    };

    this.onClear = this.onClear.bind(this);
    this.onSubmit = this.search.bind(this);
  }

  search(description, location, fullTime) {
    APIRequests.search(description, location, fullTime, (positions) =>
    { this.setState({ jobsArr: positions }) });
  }

  onClear() {
    this.setState({ jobsArr: [] })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>
            So you lost your job, eh?
          </h1>
          <p>
            Don't worry, we've got your back.
          </p>
          <p>
            Search for jobs relevant to your skillset.
          </p>
          <span role = "img" aria-label = "emojis" className = "emojis">
            🔥💻🔥
          </span>
        </div>
        <SearchBar
        onSubmit= { this.onSubmit}
        onClear = { this.onClear }
        />

        <JobsTable
        positions = { this.state.jobsArr }
        columns = { columns }
        />
      </div>
    );
  }
}

const columns = [
  {
    name: "Title",
    prop: "title"
  },
  {
    name: "Company",
    prop: "company"
  },
  {
    name: "Location",
    prop: "location"
  },
  {
    name: "Gig Up Since",
    prop: "created_at"
  },
  {
    name: "FT/PT",
    prop: "type"
  }
];

export default App;
