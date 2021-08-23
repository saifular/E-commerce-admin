import React, {Component, Fragment} from 'react';
import {Button,   Col, Container, Form, Row} from "react-bootstrap";
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";
import ApiURL from "../api/ApiURL";
import 'react-toastify/dist/ReactToastify.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import Menu from '../components/Menu';
class ProductDetails extends Component {

    constructor() {
        super();
        this.state={
            dataList:[],
            product_code:"",
            img1:"",
            img2:"",
            img3:"",
            img4:"",
            des:"",
            color:"",
            size:"",
            details:"",
            isLoading:true,
            isError:false,
            deleteBtnText:"Delete",
            rowDataID:"",  
         
        }
        this.dataDelete=this.dataDelete.bind(this);
    }
    componentDidMount() {
        axios.get(ApiURL.ProductDetail).then((response)=>{
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
    product_codeOnChange=(event)=>{
        let product_code=  event.target.value;
        this.setState({product_code:product_code})
      }
      
      img1OnChange=(event)=>{
      let img1=  event.target.files[0];
      this.setState({img1:img1})
    }
    img2OnChange=(event)=>{
        let img2=  event.target.files[0];
        this.setState({img2:img2})
      }
      img3OnChange=(event)=>{
        let img3=  event.target.files[0];
        this.setState({img3:img3})
      }
      img4OnChange=(event)=>{
        let img4=  event.target.files[0];
        this.setState({img4:img4})
      }

      desOnChange=(event)=>{
        let des=  event.target.value;
        this.setState({des:des})
    }
    colorOnChange=(event)=>{
        let color=  event.target.value;
        this.setState({color:color})
      }
  
      sizeOnChange=(event)=>{
          let size=  event.target.value;
          this.setState({size:size})
      }
      detailsOnChange=(event)=>{
        let	details=  event.target.value;
        this.setState({details:details})
    }
    
      
    
    onFormSubmit=(event)=>{

        let product_code=this.state.product_code;
        let img1=this.state.img1;
        let img2=this.state.img2;
        let img3=this.state.img3;
        let img4=this.state.img4;
        let des=this.state.des;
        let color=this.state.color;
        let size=this.state.size;
        let details=this.state.details;
        let sendBtn=document.getElementById('sendBtn');
        let signupForm=document.getElementById('signupForm');

        if(product_code.length==0){
            toast.error("Product_code Required",{
                position:"bottom-center"
            });
        }
        else if(img1.length==0){
            toast.error("Img1 Required",{
                position:"bottom-center"
            });
        }
        else if(img2.length==0){
            toast.error("Img2 Required",{
                position:"bottom-center"
            });
        }
        else if(img3.length==0){
            toast.error("Img3 Required",{
                position:"bottom-center"
            });
        }
        else if(img4.length==0){
            toast.error("Img4 Required",{
                position:"bottom-center"
            });
        }
        else if(des.length==0){
            toast.error("Des Required",{
                position:"bottom-center"
            });
        }
        else if(color.length==0){
            toast.error("Color Required",{
                position:"bottom-center"
            });
        }
        else if(size.length==0){
            toast.error("Size Required",{
                position:"bottom-center"
            });
        }
        else if(details.length==0){
            toast.error("Details Required",{
                position:"bottom-center"
            });
        }
        else{
            sendBtn.innerHTML="Sending...";
            let MyFormData=new FormData();
            MyFormData.append("product_code",product_code)
            MyFormData.append("img1",img1)
            MyFormData.append("img2",img2)
            MyFormData.append("img3",img3)
            MyFormData.append("img4",img4)
            MyFormData.append("des",des)
            MyFormData.append("color",color)
            MyFormData.append("size",size)
            MyFormData.append("details",details)
            axios.post(ApiURL.AddProductDetail,MyFormData).then(function (response) {
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
        axios.post(ApiURL.ProductDetailDelete,{id:this.state.rowDataID}).then((response)=>{
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

   imgCellFormat(cell,row){
    return(
        <img style={{width:"60px",height:"auto"}} src={"https://helloroni.com/storage/app/products/"+cell}/>
    )
    }
    render() {
        const data = this.state.dataList;
        const columns=[
            {dataField: 'id', text: 'ID'},
            {dataField: 'product_code', text: 'Product_code'},
            {dataField: 'img1', text: 'Img1',formatter:this.imgCellFormat},
            {dataField: 'img2', text: 'Img2',formatter:this.imgCellFormat},
            {dataField: 'img3', text: 'Img3',formatter:this.imgCellFormat},
            {dataField: 'img4', text: 'Img4',formatter:this.imgCellFormat},
            {dataField: 'des', text: 'Des'},
            {dataField: 'color', text: 'Color'},
            {dataField: 'size', text: 'Size'},
            {dataField: 'details', text: 'Details'},
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
                                        <h4 className="section-title">Add Product Details</h4>
                                        <h6 className="section-sub-title">Please addDetails </h6>
                                        <input onChange={this.product_codeOnChange} className="form-control m-2" type="text" placeholder="product_code"/>
                                        <input onChange={this.img1OnChange} className="form-control m-2" type="file" placeholder="image1"/>
                                        <input onChange={this.img2OnChange} className="form-control m-2" type="file" placeholder="image2"/>
                                        <input onChange={this.img3OnChange} className="form-control m-2" type="file" placeholder="image3"/>
                                        <input onChange={this.img4OnChange} className="form-control m-2" type="file" placeholder="image4"/>
                                        <input onChange={this.desOnChange} className="form-control m-2" type="text" placeholder="Des"/>
                                        <input onChange={this.colorOnChange} className="form-control m-2" type="text" placeholder="Color"/>
                                        <input onChange={this.sizeOnChange} className="form-control m-2" type="text" placeholder="Size"/>
                                        <input onChange={this.detailsOnChange} className="form-control m-2" type="text" placeholder="Details"/>
                                        <Button id="sendBtn" type="submit" className="btn btn-block m-2 site-btn">Add Product Details</Button>
                                    </Form>
                                </Col>
                                <Col className="p-0 Desktop m-0" md={6} lg={6} sm={6} xs={6}>
                                    <img style={{marginTop:"130px",height:"450px"}} className="onboardBanner" src="Images/p2.jpeg"/>
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

export default ProductDetails;
