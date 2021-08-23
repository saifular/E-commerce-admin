import React, {Component, Fragment} from 'react';
import {Button,   Col, Container, Form, Row} from "react-bootstrap";
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";
import ApiURL from "../api/ApiURL";
import 'react-toastify/dist/ReactToastify.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import Menu from '../components/Menu';
import {Redirect} from "react-router";
import SessionHelper from '../SessionHelper/SessionHelper';
class AddProduct extends Component {

    constructor() {
        super();
        this.state={
            dataList:[],
            title:"",
            price:"",
            special_price:"",
            image:"",
            category:"",
            subcategory:"",
            remark:"",
            brand:"",
            shop:"",
            shop_name:"",
            star:"",
            product_code:"",
            stock:"",
            isLoading:true,
            isError:false,
            deleteBtnText:"Delete",
            rowDataID:"",
       
        }
        this.dataDelete=this.dataDelete.bind(this);
    }
   
    addNewModalOpen(){
        this.setState({AdNewModal:true});
    }
    addNewModalClose(){
        this.setState({AdNewModal:false});
    }
    componentDidMount() {
        if(SessionHelper.getUserName()==null){
            {this.PageRedirect()}
            alert(SessionHelper.getUserName())

        }else{
        axios.get(ApiURL.Roni).then((response)=>{
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
    }
    titleOnChange=(event)=>{
        let title=  event.target.value;
        this.setState({title:title})
      }
  
      priceOnChange=(event)=>{
          let price=  event.target.value;
          this.setState({price:price})
      }
      special_priceOnChange=(event)=>{
          let special_price=  event.target.value;
          this.setState({special_price:special_price})
      }
      imageOnChange=(event)=>{
        let image=  event.target.files[0];
        this.setState({image:image})
      }
  
      categoryOnChange=(event)=>{
          let  category=  event.target.value;
          this.setState({ category: category})
      }
      subcategoryOnChange=(event)=>{
          let subcategory=  event.target.value;
          this.setState({subcategory:subcategory})
      }
      remarkOnChange=(event)=>{
        let remark=  event.target.value;
        this.setState({remark:remark})
      }
  
      brandOnChange=(event)=>{
          let brand=  event.target.value;
          this.setState({brand:brand})
      }
      shopOnChange=(event)=>{
          let shop=  event.target.value;
          this.setState({shop:shop})
      }
      shop_nameOnChange=(event)=>{
        let shop_name=  event.target.value;
        this.setState({shop_name:shop_name})
      }
  
      starOnChange=(event)=>{
          let  star=  event.target.value;
          this.setState({ star: star})
      }
      product_codeOnChange=(event)=>{
          let product_code=  event.target.value;
          this.setState({product_code:product_code})
      }
      stockOnChange=(event)=>{
        let stock=  event.target.value;
        this.setState({stock:stock})
      }
  
      PageRedirect=()=>{
            return(
                <Redirect to="/adminlogin"/>
            )
        
    }
  
      onFormSubmit=(event)=>{
  
        let title=this.state.title;
        let price=this.state.price;
        let special_price=this.state.special_price;
        let image=this.state.image;
        let category=this.state.category;
        let subcategory=this.state.subcategory;
        let remark=this.state.remark;
        let brand=this.state. brand;
        let shop=this.state.shop;
        let shop_name=this.state.shop_name;
        let star=this.state.star;
        let product_code=this.state.product_code;
        let stock=this.state.stock;
        let sendBtn=document.getElementById('sendBtn');
        let signupForm=document.getElementById('signupForm');
  
          if(title.length==0){
              toast.error("Title Required",{
                  position:"bottom-center"
              });
          }
          else if(price.length==0){
              toast.error("Price Required",{
                  position:"bottom-center"
              });
          }
          else if(special_price.length==0){
            toast.error("special_price Required",{
                position:"bottom-center"
            });
        }
        else if(image.length==0){
            toast.error("Image file Required",{
                position:"bottom-center"
            });
        }
        else if(category.length==0){
            toast.error("Category Required",{
                position:"bottom-center"
            });
        }
        else if(subcategory.length==0){
            toast.error("Subcategory Required",{
                position:"bottom-center"
            });
        }
        else if(remark.length==0){
            toast.error("Remark Required",{
                position:"bottom-center"
            });
        }
        else if(brand.length==0){
            toast.error("Brand Required",{
                position:"bottom-center"
            });
        }
        else if(shop.length==0){
            toast.error("Shop Required",{
                position:"bottom-center"
            });
        }
        else if(shop_name.length==0){
            toast.error("Shop_name Required",{
                position:"bottom-center"
            });
        }
        else if(star.length==0){
            toast.error("Star Required",{
                position:"bottom-center"
            });
        }
        else if(product_code.length==0){
            toast.error("Product_code Required",{
                position:"bottom-center"
            });
        }
        else if(stock.length==0){
            toast.error("Stock Required",{
                position:"bottom-center"
            });
        }
          else{
            sendBtn.innerHTML="Sending...";
            let MyFormData=new FormData();
            MyFormData.append("title",title)
            MyFormData.append("price",price)
            MyFormData.append("special_price",special_price)
            MyFormData.append("image",image)
            MyFormData.append("category",category)
            MyFormData.append("subcategory",subcategory)
            MyFormData.append("remark",remark)
            MyFormData.append("brand",brand)
            MyFormData.append("shop",shop)
            MyFormData.append("shop_name",shop_name)
            MyFormData.append("star",star)
            MyFormData.append("product_code",product_code)
            MyFormData.append("stock",stock)
  
              axios.post(ApiURL.SendSingupDetails,MyFormData).then(function (response) {
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
            axios.post(ApiURL.ProjectDelete,{id:this.state.rowDataID}).then((response)=>{
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
            {dataField: 'title', text: 'Title'},
            {dataField: 'price', text: 'Price'},
            {dataField: 'special_price', text: 'Special_price'},
            {dataField: 'image', text: 'Image',formatter:this.imgCellFormat},
            {dataField: 'category', text: 'Category'},
            {dataField: 'subcategory', text: 'Subcategory'},
            {dataField: 'remark', text: 'Remark'},
            {dataField: 'brand', text: 'Brand'},
            {dataField: 'shop', text: 'Shop'},
            {dataField: 'shop_name', text: 'Shop_name'},
            {dataField: 'star', text: 'Star'},
            {dataField: 'product_code', text: 'Product_code'},
            {dataField: 'stock', text: 'Stock'},
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
                                        <h4 className="section-title">Add Product</h4>
                                        <h6 className="section-sub-title">Please Enter Your product</h6>
                                        <input onChange={this.titleOnChange} className="form-control m-2" type="text" placeholder="title"/>
                                        <input  onChange={this.priceOnChange} className="form-control m-2" type="number" placeholder="price"/>
                                        <input onChange={this.special_priceOnChange}  className="form-control m-2" type="number" placeholder="s price"/>
                                        <input onChange={this.imageOnChange} className="form-control m-2" type="file" placeholder="img"/>
                                        <input onChange={this.categoryOnChange}className="form-control m-2" type="text" placeholder="category"/>
                                        <input  onChange={this.subcategoryOnChange}className="form-control m-2" type="text" placeholder=" S category"/>
                                        <input  onChange={this.remarkOnChange}className="form-control m-2" type="text" placeholder="remark"/>
                                        <input onChange={this.brandOnChange} className="form-control m-2" type="text" placeholder="brand"/>
                                        <input onChange={this.shopOnChange}className="form-control m-2" type="text" placeholder="shop"/>
                                        <input  onChange={this.shop_nameOnChange}className="form-control m-2" type="text" placeholder="shop N"/>
                                        <input onChange={this.starOnChange}className="form-control m-2" type="number" placeholder="star"/>
                                        <input  onChange={this.product_codeOnChange}className="form-control m-2" type="text" placeholder="product_code"/>
                                        <input  onChange={this.stockOnChange}className="form-control m-2" type="text" placeholder="stock"/>
                                        <Button id="sendBtn" type="submit" className="btn btn-block m-2 site-btn">Add Product</Button>
                                    </Form>
                                </Col> 
                                <Col className="p-0 Desktop m-0" md={6} lg={6} sm={6} xs={6}>
                                    <img style={{marginTop:"130px", height:"630px"}}  className="onboardBanner" src="Images/p1.jpeg"/>
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

export default AddProduct;
