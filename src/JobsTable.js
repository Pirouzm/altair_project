import React from 'react';
import './JobsTable.css';

//TODO: Make sorting in ascending and descending order order and sorting by date work.
//Maybe use React Bootstrap table 2 to do so.
export default class JobsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: {
        index: null,
        order: 'descendingOrder'
      }
    }
  }

  render() {
    const columns = this.props.columns;
    const positions = this.props.positions;

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
                        {
                          position[prop]
                        }
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
