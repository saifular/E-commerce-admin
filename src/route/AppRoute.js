import React, {Component, Fragment} from 'react';
import {Route, Switch} from "react-router";
import HomePage from "../pages/HomePage";
import AddProduct from "../pages/AddProduct";
import Contact from "../pages/Contact";
import Order from "../pages/Order";
import Category from "../pages/Category";
import SubCategory from "../pages/SubCategory";
import ClientReview from "../pages/ClientReview";
import Slider from "../pages/Slider";
import ProductDetails from "../pages/ProductDetails";
import User from "../pages/User";
import AdminLogin from "../pages/AdminLogin";
import Visitor from "../pages/Visitor";
class AppRoute extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route exact path="/" component={AdminLogin}/>
                    <Route exact path="/addproduct" component={AddProduct}/>
                    <Route exact path="/contact" component={Contact}/>
                    <Route exact path="/order" component={Order}/>
                    <Route exact path="/category" component={Category}/>
                    <Route exact path="/subcategory" component={SubCategory}/>
                    <Route exact path="/review" component={ClientReview}/>
                    <Route exact path="/slider" component={Slider}/>
                    <Route exact path="/productdetails" component={ProductDetails}/>
                    <Route exact path="/user" component={User}/>
                    <Route exact path="/home" component={HomePage}/>
                    <Route exact path="/visitor" component={Visitor}/>
                </Switch>

            </Fragment>
        );
    }
}

export default AppRoute;
