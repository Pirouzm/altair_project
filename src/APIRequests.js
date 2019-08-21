
//TODO: A whole lot.
//filtering for full time/part time jobs doesn't work quite yet
//A lot of this is work in progress.

//javascript date object
function formatDate(dateStr) {
  let date = new Date(dateStr);
  let month = date.getMonth();
  let day = date.getDay();
  let year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

//format query parameters.
function formatParams(description, location, fullTime) {
  let formatStr = '';
  if (description && location) {
    formatStr += `description=${description}&location=${location}`;
  }
  if (fullTime) {
      formatStr += `&full_time=on`;
  }
  formatStr.replace(' ', '+');
  return formatStr;
}

export const APIRequests = {
  search(description = '', location = '', fullTime = false, stateSetCallback) {
    const params = formatParams(description, location, fullTime);
    fetch(`https://jobs.github.com/positions.json?${params}`, {
      method: 'GET'
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('FAILED (in APIRequests)');
      }
    }, networkError => {
      console.log(networkError.message);
    })
    .then(positions => positions.map(({
      id,
      title,
      location,
      company,
      type,
      created_at
    }) => ({
      id,
      title,
      location,
      company,
      type,
      created_at: formatDate(created_at)
    })))
    .then(data => stateSetCallback(data))
    .catch(err => alert(err))
    return;
  }
};
