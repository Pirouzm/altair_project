import React from 'react';
import './JobsTable.css';



//TODO: Make sorting in ascending and descending order order and sorting by date work.
export default class JobsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: {
        index: null,
        order: 'descendingOrder'
      }
    }

    this.onSort = this.onSort.bind(this);
    this.sort = this.sortColumn.bind(this);
  }

  onSort(event) {
    // columns, 0 through 4
    // alert(Object.values(event.target)[0].key);
    const newIndex = Object.values(event.target)[0].key; //doesnt handly sorting by date properly.
    const { index, order } = this.state.sort;
    if (newIndex === index) {
      switch (order) {
        case 'descendingOrder':
          this.setState({
            sort: {
              index,
              order: 'ascendingOrder'
            }
          });
          break;
        case 'ascendingOrder':
          this.setState({
            sort: {
              index: null,
              order: 'descendingOrder'
            }
          });
          break;
        default:
          this.setState({ sort:
          {
            index: newIndex,
            order: 'descendingOrder'
          }
        });
      }
    }
  }

//Sorting doesn't work at the moment.
  sortColumn(positions, columns) {
    const { index, order } = this.state.sort;
    if (index) {
      const sortByProp = columns[index].prop;
      const sortFunc = (f, g) => {
        if (f[sortByProp] === g[sortByProp]) {
          return 0;
        }
        return f[sortByProp].toUpperCase() > g[sortByProp].toUpperCase() ? 1 : -1;
      }
      let sortedPositions = [...positions].sort(sortFunc);
      if (order === 'ascendingOrder') {
        sortedPositions.reverse()
      }
      return sortedPositions;
    } else {
        return positions;
    }
  }

  render() {
    const columns = this.props.columns;
    const positions = this.sortColumn(this.props.positions, columns);
    return (
      <div className = "JobsTable">
        <table id = "table">
          <thead>
            <tr>
            {
              columns.map(( column, index ) => {
                return (
                  <th
                    key = { index }
                    onClick = { this.onSort } //3 ways to sort?  WIP
                  >
                  { column.name }
                  </th>
                );
              })
            }
            </tr>
          </thead>
          <tbody>
          {
            positions.map(( position, index ) => {
              return (
                <tr key = { index } >
                {
                  columns.map(({ prop }) => {
                    return (
                      <td>
                        { position[prop] }
                      </td>
                    );
                  })
                }
                </tr>
              );
            })
          }
          </tbody>
        </table>
      </div>
    );
  }
};
