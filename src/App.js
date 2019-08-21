import React from 'react';
import { SearchBar } from './SearchBar';
import { APIRequests } from './APIRequests';
import './App.css';
import './JobsTable.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const headerSortingClasses = (column, sortOrder, isLastSorting, colIndex) => (
  sortOrder === 'asc' ? 'demo-sorting-asc' : 'demo-sorting-desc'
);

const columns = [
  {
    dataField: 'title',
    text: "title",
    sort: true,
    headerSortingClasses
  },
  {
    dataField: 'company',
    text: 'company',
    sort: true,
    headerSortingClasses
  },
  {
    dataField: 'location',
    text: 'location',
    sort: true,
    headerSortingClasses
  },
  {
    dataField: "created_at",
    text: "gig up since",
    sort: true,
    headerSortingClasses
  },
  {
    dataField: "type",
    text: "FT/PT",
    sort: true,
    headerSortingClasses
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

        <BootstrapTable
          keyField = "title"
          data = { this.state.jobsArr }
          columns = { columns }
          pagination = { paginationFactory() }
          bordered ={ false }
        />

      </div>
    );
  }
}

export default App;
