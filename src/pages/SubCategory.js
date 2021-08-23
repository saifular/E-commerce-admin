import React, {Component, Fragment} from 'react';
import {Button,   Col, Container, Form, Row} from "react-bootstrap";
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";
import ApiURL from "../api/ApiURL";
import 'react-toastify/dist/ReactToastify.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import Menu from '../components/Menu';
class Category extends Component {

    constructor() {
        super();
        this.state={
            dataList:[],
            cat1_name:"",
            cat2_name
            :"",
            isLoading:true,
            isError:false,
            deleteBtnText:"Delete",
            rowDataID:"",  
         
        }
        this.dataDelete=this.dataDelete.bind(this);
    }
    componentDidMount() {
        axios.get(ApiURL.SubCategory).then((response)=>{
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

    cat1_nameOnChange=(event)=>{
      let cat1_name=  event.target.value;
      this.setState({cat1_name:cat1_name})
    }

    cat2_nameOnChange=(event)=>{
        let cat2_name=  event.target.value;
        this.setState({cat2_name:cat2_name})
    }
    
    onFormSubmit=(event)=>{

        let cat1_name=this.state.cat1_name;
        let cat2_name=this.state.cat2_name;
        let sendBtn=document.getElementById('sendBtn');
        let signupForm=document.getElementById('signupForm');

        if(cat1_name.length==0){
            toast.error("Cat1_name Required",{
                position:"bottom-center"
            });
        }
        else if(cat2_name.length==0){
            toast.error("Cat2_name Required",{
                position:"bottom-center"
            });
        }
        else{
            sendBtn.innerHTML="Sending...";
            let MyFormData=new FormData();
            MyFormData.append("cat1_name",cat1_name)
            MyFormData.append("cat2_name",cat2_name)
            axios.post(ApiURL.addSubCategory,MyFormData).then(function (response) {
                if(response.status==200 && response.data==1){
                    toast.success("Request Success",{
                        position:"bottom-center"
                    });
                    sendBtn.innerHTML="send";
                    signupForm.reset();
                }
                else{
                    toast.error("Request Fail ! Try Again",{
                        position:"bottom-center"
                    });
                    sendBtn.innerHTML="send"
                }
            }).catch(function (error) {
                toast.error("Request Fail ! Try Again",{
                    position:"bottom-center"
                });
                sendBtn.innerHTML="send"
            })
        }


        event.preventDefault();
    }
    dataDelete(){
        axios.post(ApiURL.SubCategoryDelete,{id:this.state.rowDataID}).then((response)=>{
            if(response.data==1 && response.status==200){
                toast.success('Delete Success', {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: 0,
                });
                this.setState({deleteBtnText:"Delete"})
                this.componentDidMount();
            }
            else{
                toast.error('Delete Fail', {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: 0,
                });
                this.setState({deleteBtnText:"Delete"})
            }


        }).catch((error)=>{
            toast.error('Delete Fail', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: 0,
            });
            this.setState({deleteBtnText:"Delete"})
        })
    

}

   
    render() {
        const data = this.state.dataList;
        const columns=[
            {dataField: 'id', text: 'ID'},
            {dataField: 'cat1_name', text: 'Cat1_Name'},
            {dataField: 'cat2_name', text: 'Cat2_Name'},
        ]
        const selectRow={
            mode:'radio',
            onSelect:(row,isSelect,rowIndex)=>{
                this.setState({rowDataID:row['id']})
                
            }
        }
        return (
            <Fragment>
                <Container className="TopSection">
                    <Row className="p-2">
                        <Col className="shadow-sm bg-white mt-2" md={12} lg={12} sm={12} xs={12}>
                            <Row className="text-center ">
                                <Col className="d-flex justify-content-center" md={6} lg={6} sm={12} xs={12}>
                                    <Form id="signupForm" className="onboardForm" onSubmit={this.onFormSubmit}>
                                        <h4 className="section-title">Add SubCategory</h4>
                                        <h6 className="section-sub-title">Please addSubCategory </h6>
                                        <input onChange={this.cat1_nameOnChange} className="form-control m-2" type="text" placeholder="Cat1_name"/>
                                        <input onChange={this.cat2_nameOnChange} className="form-control m-2" type="text" placeholder="Cat2_name"/>
                                        <Button id="sendBtn" type="submit" className="btn btn-block m-2 site-btn">Add SubCategory</Button>
                                    </Form>
                                </Col>
                                <Col className="p-0 Desktop m-0" md={6} lg={6} sm={6} xs={6}>
                                    <img style={{marginTop:"100px", height:"400px"}} className="onboardBanner" src="Images/p4.jpeg"/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <Menu >
                    <button style={{marginLeft:"20px"}} onClick={this.dataDelete} className="normal-btn  my-2 btn">{this.state.deleteBtnText}</button>
                    <BootstrapTable
                                                keyField='id'
                                                data={ data }
                                                columns={ columns }
                                                selectRow={selectRow}
                                                pagination={ paginationFactory()}
                                                >
                
                             
                             
                                               </BootstrapTable>
                          
                            </Menu>
                <ToastContainer
                                position="bottom-center"
                                autoClose={3000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss={false}
                                draggable
                                pauseOnHover={false}
                            />
       
        
            </Fragment>
        );
    }
}

export default Category;
