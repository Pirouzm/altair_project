import React from 'react';
import { SearchBar } from './SearchBar';
import { APIRequests } from './APIRequests';
import JobsTable from './JobsTable';
import './App.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';


const columns = [
  {
    prop: 'title',
    name: "title",
    sort: true
  },
  {
    prop: 'company',
    name: 'company',
    sort: true
  },
  {
    prop: 'location',
    name: 'location',
    sort: true
  },
  {
    prop: "created_at",
    name: "gig up since",
    sort: true
  },
  {
    prop: "type",
    name: "FT/PT",
    sort: true
  }
];

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

          <h2>
          Pagination in progress, please excuse the clunky ui in the meantime.
          </h2>

        </div>
        <SearchBar
        onSubmit= { this.onSubmit}
        onClear = { this.onClear }
        />

        <JobsTable
        positions = { this.state.jobsArr }
        columns = { columns }
        />

        <BootstrapTable keyField='id' data={ this.state.jobsArr } columns={ columns }pagination={ paginationFactory() }/>

      </div>
    );
  }
}

export default App;
