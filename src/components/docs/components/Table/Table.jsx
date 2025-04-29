import React from 'react';
import './Table.scss';

const Table = ({ children }) => <table className={$b}>{children}</table>;
Table.Header = ({ children }) => (
  <thead className='table__header'>{children}</thead>
);
Table.Row = ({ children }) => <tr className='table__row'>{children}</tr>;
Table.Cell = ({ children, ...props }) => (
  <td className='table__cell' {...props}>
    {children}
  </td>
);

export default Table;
