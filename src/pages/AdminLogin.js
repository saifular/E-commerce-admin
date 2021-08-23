import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";
import ApiURL from "../api/ApiURL";
import 'react-toastify/dist/ReactToastify.css';
import {Redirect} from "react-router";
import SessionHelper from '../SessionHelper/SessionHelper';
class AdminLogin extends Component {

    constructor() {
        super();
        this.state={
            user_name:"",
            password:"",
            UserRedirect:false
        }
    }
 
    user_nameOnChange=(event)=>{
        let user_name=event.target.value;
        this.setState({user_name:user_name})
    }
    passwordOnChange=(event)=>{
        let password=event.target.value;
        this.setState({password:password})
    }

    onFormSubmit=(event)=>{
        let user_name=this.state.user_name;
        let password=this.state.password;
         if(user_name.length==0){
            toast.error("Please Write Your User Name",{
                position:"bottom-center"
            });
        }
        else if(password.length==0){
            toast.error("Please Write Your password",{
                position:"bottom-center"
            });
        }
        else{
          
            let URL=ApiURL.Verifications;
            let MyFormData=new FormData();
            MyFormData.append('user_name',user_name);
            MyFormData.append('password',password);

            axios.post(URL,MyFormData).then((response)=>{
                if( response.data===1){
                    SessionHelper.setUserName(user_name)
                    toast.success("Verification Success",{position:'bottom-center'});
                    this.setState({UserRedirect:true})
                  
                }
               else{
                    toast.error("Request Fail ! Try Again",{position:'bottom-center'});
                }

            }).catch((error)=>{
                toast.error("Request Fail ! Try Again",{position:'bottom-center'});
            });
            let user_name1=sessionStorage.getItem("user_name")
        
           
        }


        event.preventDefault();
    }
      
    onUserRedirect(){
        if(this.state.UserRedirect===true){
        
                return(<Redirect to="home"/>)
        }
           

     
    }
   
    render() {
        return (
            <Fragment>
                <Container className="TopSection">
                    <Row className="p-2">
                        <Col className="shadow-sm bg-white mt-2" md={12} lg={12} sm={12} xs={12}>
                            <Row className="text-center ">
                                <Col className="d-flex justify-content-center" md={6} lg={6} sm={12} xs={12}>
                                    <Form id="signupForm" className="onboardForm" onSubmit={this.onFormSubmit}>
                                        <h4 className="section-title">ADMIN LOGIN</h4>
                                        <h6 className="section-sub-title">Please Enter Your User Name,Password</h6>
                                        <input onChange={this.user_nameOnChange} className="form-control m-2" type="text" placeholder="User Name"/>
                                        <input onChange={this.passwordOnChange} className="form-control m-2" type="password" placeholder="Password"/>
                                        <Button id="sendBtn" type="submit" className="btn btn-block m-2 site-btn">ADMIN LOGIN</Button>
                                    </Form>
                                </Col>
                                <Col className="p-0 Desktop m-0" md={6} lg={6} sm={6} xs={6}>
                                    <img className="onboardBanner" src="Images/otppagebanner.png"/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                {this.onUserRedirect()}
                <ToastContainer />
       
        
            </Fragment>
        );
    }
}

export default AdminLogin;
