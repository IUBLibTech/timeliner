import React, { useState } from 'react';
import VariationsAppBar from './VariationsAppBar';

export const VariationsAppBarDemo = () => {
  const [title, setTitle] = useState('test title');
  return (
    <VariationsAppBar title={title} onTitleChange={setTitle} />
  );
};
