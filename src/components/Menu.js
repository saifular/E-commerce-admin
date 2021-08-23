import React, {Component, Fragment} from 'react';
import {Navbar,NavLink} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faHome,faEnvelope,faFolder,faComment,faPowerOff, faShoppingBasket, faShoppingBag, faSlidersH, faShoppingCart, faUser, faMale} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

class Menu extends Component {

    constructor(props) {
        super();
        this.state={
            sideNav:false,
            sideNavClass:"sidenavClose",
            NavText:"d-none",
            mainDivOverlay:"main-overlay-close"
        }

        this.showHideSideNav=this.showHideSideNav.bind(this);
    }


    showHideSideNav(){
        if(this.state.sideNav===false){
            this.setState({sideNav:true,NavText:"",sideNavClass:"sidenavOpen",mainDivOverlay:"main-overlay-open"})
        }
        else {
            this.setState({sideNav:false,NavText:"d-none",sideNavClass:"sidenavClose",mainDivOverlay:"main-overlay-close"})
        }
    }
  


    render() {
        return (
            <Fragment>
                <title>{this.props.title}</title>
                <Navbar  expand="lg" className="fixed-top shadow-sm bg-white mb-5 py-3" variant="light" bg="white">
                    <Navbar.Brand onClick={this.showHideSideNav}  href="#"><FontAwesomeIcon icon={faBars} /></Navbar.Brand>
                    <b>ADMIN DASHBOARD</b>
                </Navbar>

                <div className={this.state.sideNavClass}>
                    <NavLink> <Link className="NavItem" to="home"> <FontAwesomeIcon icon={faHome} /> <span className={this.state.NavText}>Home</span> </Link></NavLink>
                    <NavLink><Link className="NavItem" to="/visitor"> <FontAwesomeIcon icon={faMale} /> <span className={this.state.NavText}>Show Visitor</span></Link></NavLink>
                    <NavLink><Link className="NavItem" to="/addproduct"> <FontAwesomeIcon icon={faShoppingBag} /> <span className={this.state.NavText}>Add Product</span></Link></NavLink>
                    <NavLink><Link className="NavItem" to="/contact"> <FontAwesomeIcon icon={faEnvelope} /> <span className={this.state.NavText}>Contact</span></Link></NavLink>
                    <NavLink><Link className="NavItem" to="/order"> <FontAwesomeIcon icon={faShoppingCart} /> <span className={this.state.NavText}>Received Order</span></Link></NavLink>
                    <NavLink><Link className="NavItem" to="/category"> <FontAwesomeIcon icon={faFolder} /> <span className={this.state.NavText}> Add Category</span></Link></NavLink>
                    <NavLink><Link className="NavItem" to="/subcategory"> <FontAwesomeIcon icon={faFolder} /> <span className={this.state.NavText}> Add SubCategory</span></Link></NavLink>
                    <NavLink><Link className="NavItem" to="/review"> <FontAwesomeIcon icon={faComment} /> <span className={this.state.NavText}>Review</span></Link></NavLink>
                    <NavLink><Link className="NavItem" to="/slider"> <FontAwesomeIcon icon={faSlidersH} /> <span className={this.state.NavText}>Add Slider</span></Link></NavLink>
                    <NavLink><Link className="NavItem" to="/productdetails"> <FontAwesomeIcon icon={faShoppingBasket} /> <span className={this.state.NavText}>Add Product Details</span></Link></NavLink>
                    <NavLink><Link className="NavItem" to="/user"> <FontAwesomeIcon icon={faUser} /> <span className={this.state.NavText}>Show User</span></Link></NavLink>
                    <a className=" ml-3 NavItem" href="/"> <FontAwesomeIcon icon={faPowerOff} /> <span className={this.state.NavText}>Sign Out</span></a>
                </div>
                <div onClick={this.showHideSideNav} className={this.state.mainDivOverlay}>

                </div>

                <div className="mainDiv">
                    {this.props.children}
                </div>


            </Fragment>
        );
    }
}

export default Menu;
