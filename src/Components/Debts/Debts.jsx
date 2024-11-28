import * as React from 'react';
import { useState } from 'react';

import SearchBar from '../Products/SearchBar/SearchBar';
import DebtItem from './DebtItem/DebtItem';
import axios from 'axios';

export default function DebtCard() {
  const [searchVal, setSearchVal] = useState()
  return (
    <div className='debts' style={{margin: "0 10px"}}>
      <div className="search">
        <SearchBar title={"Add Debt"}/>
      </div>
      <div className="items" style={{display: "flex", flexDirection: "column", gap: "10px"}}>
        <DebtItem />
        <DebtItem />
      </div>
    </div>
  );
}