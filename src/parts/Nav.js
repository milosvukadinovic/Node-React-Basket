import React from 'react';
import Navbar from 'react-bootstrap/Navbar'

 const Nav = ({title})=>{
    return(
      <Navbar bg="dark" variant="dark" >
        <Navbar.Brand>{title}</Navbar.Brand>
        
        
      </Navbar>
    )
}

export default Nav;