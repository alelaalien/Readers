

import { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'; 
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
function NavBar({children}) {
  const [expanded, setExpanded] = useState(false);

 
      return (
        <Navbar expand="lg" className="bg-black w-full">
          <Container fluid>
            <Navbar.Brand href="#"  style={{color: 'wheat'}} >Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                
                <Nav.Link  to="/"  style={{color: 'wheat'}}>Reviews</Nav.Link>
                <Nav.Link href={route('poems')}  style={{color: 'wheat'}}>Poems</Nav.Link>
                {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown> */}
                <Nav.Link href="#" disabled>
                  Link
                </Nav.Link>
              </Nav>
              <Form className="d-flex" style={{marginRight: '2%'}}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success" >Search</Button>
              </Form>
              {children}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    } 

export default NavBar;
