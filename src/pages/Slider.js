import React, {Component, Fragment} from 'react';
import {Button,   Col, Container, Form, Row} from "react-bootstrap";
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";
import ApiURL from "../api/ApiURL";
import 'react-toastify/dist/ReactToastify.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import Menu from '../components/Menu';
class Slider extends Component {

    constructor() {
        super();
        this.state={
            dataList:[],
            text_color:"",
            bg_color:"",
            image:"",
            title:"",
            sub_title:"",
            product_code:"",
            isLoading:true,
            isError:false,
            deleteBtnText:"Delete",
            rowDataID:"",  
         
        }
        this.dataDelete=this.dataDelete.bind(this);
    }
    componentDidMount() {
        axios.get(ApiURL.SliderShow).then((response)=>{
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
    text_colorOnChange=(event)=>{
        let text_color=  event.target.value;
        this.setState({text_color:text_color})
      }
  
      bg_colorOnChange=(event)=>{
          let bg_color=  event.target.value;
          this.setState({bg_color:bg_color})
      }
      
      imageOnChange=(event)=>{
      let image=  event.target.files[0];
      this.setState({image:image})
    }

    titleOnChange=(event)=>{
        let title=  event.target.value;
        this.setState({title:title})
    }
    sub_titleOnChange=(event)=>{
        let sub_title=  event.target.value;
        this.setState({sub_title:sub_title})
      }
  
      product_codeOnChange=(event)=>{
          let product_code=  event.target.value;
          this.setState({product_code:product_code})
      }
      
    
    onFormSubmit=(event)=>{

        let text_color=this.state.text_color;
        let bg_color=this.state.bg_color;
        let image=this.state.image;
        let title=this.state.title;
        let sub_title=this.state.sub_title;
        let product_code=this.state.product_code;
        let sendBtn=document.getElementById('sendBtn');
        let signupForm=document.getElementById('signupForm');

        if(text_color.length==0){
            toast.error("Text_color Required",{
                position:"bottom-center"
            });
        }
        else if(bg_color.length==0){
            toast.error("Bg_color Required",{
                position:"bottom-center"
            });
        }
        else if(image.length==0){
            toast.error("Image Required",{
                position:"bottom-center"
            });
        }
        else if(title.length==0){
            toast.error("Title Required",{
                position:"bottom-center"
            });
        }
        else if(sub_title.length==0){
            toast.error("Sub_title Required",{
                position:"bottom-center"
            });
        }
        else if(product_code.length==0){
            toast.error("Product_code Required",{
                position:"bottom-center"
            });
        }
        else{
            sendBtn.innerHTML="Sending...";
            let MyFormData=new FormData();
            MyFormData.append("text_color",text_color)
            MyFormData.append("bg_color",bg_color)
            MyFormData.append("image",image)
            MyFormData.append("title",title)
            MyFormData.append("sub_title",sub_title)
            MyFormData.append("product_code",product_code)
            axios.post(ApiURL.AddSlider,MyFormData).then(function (response) {
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
        axios.post(ApiURL.SliderDelete,{id:this.state.rowDataID}).then((response)=>{
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
        <img style={{width:"60px",height:"auto"}} src={"http://127.0.0.1:8000/"+cell}/>
    )
    }
    render() {
        const data = this.state.dataList;
        const columns=[
            {dataField: 'id', text: 'ID'},
            {dataField: 'text_color', text: 'Text_color'},
            {dataField: 'bg_color', text: 'Bg_color'},
            {dataField: 'image', text: 'Image',formatter:this.imgCellFormat},
            {dataField: 'title', text: 'Title'},
            {dataField: 'sub_title', text: 'Sub_Title'},
            {dataField: 'product_code', text: 'Product_Code'},
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
                                        <h4 className="section-title">Add Slider</h4>
                                        <h6 className="section-sub-title">Please addSlider </h6>
                                        <input onChange={this.text_colorOnChange} className="form-control m-2" type="text" placeholder="Text color"/>
                                        <input onChange={this.bg_colorOnChange} className="form-control m-2" type="text" placeholder="Bg Color"/>
                                        <input onChange={this.imageOnChange} className="form-control m-2" type="file" placeholder="image"/>
                                        <input onChange={this.titleOnChange} className="form-control m-2" type="text" placeholder="Title"/>
                                        <input onChange={this.sub_titleOnChange} className="form-control m-2" type="text" placeholder="Sub Title"/>
                                        <input onChange={this.product_codeOnChange} className="form-control m-2" type="text" placeholder="Product Code"/>
                                        <Button id="sendBtn" type="submit" className="btn btn-block m-2 site-btn">Add Slider</Button>
                                    </Form>
                                </Col>
                                <Col className="p-0 Desktop m-0" md={6} lg={6} sm={6} xs={6}>
                                    <img style={{marginTop:"130px",height:"310px"}} className="onboardBanner" src="Images/p5.jpeg"/>
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

export default Slider;
