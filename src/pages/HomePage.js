import React, {Component, Fragment} from 'react';
import Menu from "../components/Menu";
import {Card, Col, Container, Row} from "react-bootstrap";
import Axios from "axios";
import ApiURL from "../api/ApiURL";
import SessionHelper from '../SessionHelper/SessionHelper';
import {Redirect} from "react-router";
class HomePage extends Component {

    constructor() {
        super();
        this.state={
            dataList:[],
            isLoading:true,
            isError:false,
            RedirectToLogin:false,
        }
    }
     

    componentDidMount() {
        if(SessionHelper.getUserName()!==null){
        Axios.get(ApiURL.CountSummary).then((response)=>{
            if(response.status==200){
                this.setState({dataList:response.data,isLoading:false,isError:false})
                    
            }
            else{
                this.setState({isLoading:false,isError:true})
            }
        }).catch((error)=>{
            this.setState({isLoading:false,isError:true})
        })
    }
    else{
        this.setState({PageRedirectStatus:true})
    }
   
    }
   
    PageRedirectToLogin=()=>{
        if(this.state.RedirectToLogin===true){
            return <Redirect to="/"/>
        }
    }


    render() {



        if(this.state.isLoading==true){
            return (
                <Menu title="Contact">
                    <Container>
                    
                    </Container>
                </Menu>
            )
        }
        else if(this.state.isError==true){
            return (
                <Menu title="Contact">
                    <Container>
                  
                    </Container>
                </Menu>
            )
        }else{

            const data = this.state.dataList;
            return (
                <Fragment>
                    <Menu title="Home">
                        <Container fluid={true}>
                            <Row>
                                <Col className="p-2" md={3} log={3} sm={6}>
                                    <Card className="card">
                                        <Card.Body>
                                            <h5 className="title-text">{data['addproduct']}</h5>
                                            <h5 className="des-text">Total Product</h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col className="p-2" md={3} log={3} sm={6}>
                                    <Card className="card">
                                        <Card.Body>
                                            <h5 className="title-text">{data['contact']}</h5>
                                            <h5 className="des-text">Total Contact</h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col className="p-2" md={3} log={3} sm={6}>
                                    <Card className="card">
                                        <Card.Body>
                                            <h5 className="title-text">{data['order']}</h5>
                                            <h5 className="des-text">Total Order</h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col className="p-2" md={3} log={3} sm={6}>
                                    <Card className="card">
                                        <Card.Body>
                                            <h5 className="title-text">{data['category']}</h5>
                                            <h5 className="des-text">Total Category</h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col className="p-2" md={3} log={3} sm={6}>
                                    <Card className="card">
                                        <Card.Body>
                                            <h5 className="title-text">{data['subcategory']}</h5>
                                            <h5 className="des-text">Total SubCategory</h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col className="p-2" md={3} log={3} sm={6}>
                                    <Card className="card">
                                        <Card.Body>
                                            <h5 className="title-text">{data['review']}</h5>
                                            <h5 className="des-text">Total ClientReview</h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col className="p-2" md={3} log={3} sm={6}>
                                    <Card className="card">
                                        <Card.Body>
                                            <h5 className="title-text">{data['slider']}</h5>
                                            <h5 className="des-text">Total Slider</h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col className="p-2" md={3} log={3} sm={6}>
                                    <Card className="card">
                                        <Card.Body>
                                            <h5 className="title-text">{data['productdetails']}</h5>
                                            <h5 className="des-text">Total ProductDetails</h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col className="p-2" md={3} log={3} sm={6}>
                                    <Card className="card">
                                        <Card.Body>
                                            <h5 className="title-text">{data['user']}</h5>
                                            <h5 className="des-text">Total User</h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>

                    </Menu>
                    {this.PageRedirectToLogin()}
                </Fragment>
            );
        }


    }
}

export default HomePage;
