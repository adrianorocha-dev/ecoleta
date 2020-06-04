import React from 'react';

type Props = {
  title: string;
};

const Header: React.FC<Props> = ({ title }) => {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
