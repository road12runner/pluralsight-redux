import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';

const Header = () => {
  return(
    <nav>
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      {" | "}
      <Link to="/courses" activeClassName="active">Courses1</Link>
      {" | "}
      <Link to="/about" activeClassName="active">About1</Link>

    </nav>
  );
};

export default Header;
