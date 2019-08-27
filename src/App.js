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

const customTotal = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total">
    Showing { from } to { to } of { size } Results
  </span>
);

const columns = [
  {
    dataField: 'title',
    text: "title",
    sort: true,
    classes: 'JobsTable',
    headerSortingClasses,
  },
  {
    dataField: 'company',
    text: 'company',
    sort: true,
    classes: 'JobsTable',
    headerSortingClasses
  },
  {
    dataField: 'location',
    text: 'location',
    sort: true,
    classes: 'JobsTable',
    headerSortingClasses
  },
  {
    dataField: "created_at",
    text: "gig up since",
    sort: true,
    classes: 'JobsTable',
    headerSortingClasses
  },
  {
    dataField: "type",
    text: "FT/PT",
    sort: true,
    classes: 'JobsTable',
    headerSortingClasses
  }
];

const options = {
  hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
  prePageText: 'Back',
  prePageTitle: 'Pre page',
  nextPageText: 'Next',
  nextPageTitle: 'mext page',
  showTotal: true
};

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

        <BootstrapTable
          className = "JobsTable"
          keyField = "title"
          data = { this.state.jobsArr }
          columns = { columns }
          pagination = { paginationFactory(options) }
          bordered ={ false }
        />
      </div>
    );
  }
}

export default App;
