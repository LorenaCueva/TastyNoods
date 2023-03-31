import { useState } from 'react';

function Search({ search, setSearch }){

  return (
   <div>
     <form onSubmit={e => e.preventDefault()}>
      <div className="field is-grouped is-grouped-centered">
        <div className="control has-icons-left">
          <input
            className="input"
            type="text"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
    </form>
    <hr className="is-divider"/>
   </div>
  );
};

export default Search;
