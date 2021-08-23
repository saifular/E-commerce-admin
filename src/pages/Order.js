import React, {Component, Fragment} from 'react';
import {toast} from "react-toastify";
import axios from "axios";
import {ToastContainer} from "react-toastify";
import ApiURL from "../api/ApiURL";
import 'react-toastify/dist/ReactToastify.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Menu from '../components/Menu';
class Order extends Component {

    constructor() {
        super();
        this.state={
            dataList:[],
            id:"",
            product_name:"",
            product_code:"",
            shop_name:"",
            shop_code:"",
            product_info:"",
            product_quantity:"",
            unit_price:"",
            total_price:"",
            mobile:"",
            name:"",
            payment_method:"",
            delivery_address:"",
            city:"",
            order_date:"",
            order_status:"",
            isLoading:true,
            isError:false,
            rowDataID:"",
           
            
        }
    }
   
    componentDidMount() {
        axios.get(ApiURL.Order).then((response)=>{
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
   
         
     Moni=()=>{
        axios.post(ApiURL.Moni,{id:this.state.rowDataID}).then((res)=>{
            if(res.data===1){
                toast.success("Status Accept",{position:'bottom-center'})
              this.componentDidMount();
            }
            else{
                toast.error("Request Fail ! Try Again",{position:'bottom-center'})
            }
        }).catch((err)=>{
            toast.error("Request Fail ! Try Again",{position:'bottom-center'})
        })
     }
     OnTheWay=()=>{
        axios.post(ApiURL.OnTheWay,{id:this.state.rowDataID}).then((res)=>{
            if(res.data===1){
                toast.success("Status OnTheWay",{position:'bottom-center'})
              this.componentDidMount();
            }
            else{
                toast.error("Request Fail ! Try Again",{position:'bottom-center'})
            }
        }).catch((err)=>{
            toast.error("Request Fail ! Try Again",{position:'bottom-center'})
        })
     }
     OrderDelivered=()=>{
        axios.post(ApiURL.OrderDelivered,{id:this.state.rowDataID}).then((res)=>{
            if(res.data===1){
                toast.success("Status OrderDelivered",{position:'bottom-center'})
              this.componentDidMount();
            }
            else{
                toast.error("Request Fail ! Try Again",{position:'bottom-center'})
            }
        }).catch((err)=>{
            toast.error("Request Fail ! Try Again",{position:'bottom-center'})
        })
     }
     OrderCancel=()=>{
        axios.post(ApiURL.OrderCancel,{id:this.state.rowDataID}).then((res)=>{
            if(res.data===1){
                toast.success("Status OrderCancel",{position:'bottom-center'})
              this.componentDidMount();
            }
            else{
                toast.error("Request Fail ! Try Again",{position:'bottom-center'})
            }
        }).catch((err)=>{
            toast.error("Request Fail ! Try Again",{position:'bottom-center'})
        })
     }
     

     render() {
        const data = this.state.dataList;
        const columns=[
            {dataField: 'id', text: 'ID'},
            {dataField: 'product_name', text: 'Product_name'},
            {dataField: 'product_code', text: 'Product_code'},
            {dataField: 'shop_name', text: 'Shop_name'},
            {dataField: 'shop_code', text: 'Shop_code',formatter:this.imgCellFormat},
            {dataField: 'product_info', text: 'Product_info'},
            {dataField: 'product_quantity', text: 'Quantity'},
            {dataField: 'unit_price', text: 'Unit_price'},
            {dataField: 'total_price', text: 'Total_price'},
            {dataField: 'mobile', text: 'Mobile'},
            {dataField: 'name', text: 'Name'},
            {dataField: 'payment_method', text: 'Payment_method'},
            {dataField: 'delivery_address', text: 'Delivery_address'},
            {dataField: 'city', text: 'City'},
            {dataField: 'order_date', text: 'Order_date'},
            {dataField: 'order_status', text: 'order_status'},
        ]
        const selectRow={
            mode:'radio',
            onSelect:(row,isSelect,rowIndex)=>{
                this.setState({rowDataID:row['id']})
                
            }
        }
        return (
            <Fragment >
                   
                  
                  
                   <Menu>
                   <button style={{marginLeft:"20px"}} onClick={this.OrderCancel} className="normal-btn  my-2 btn">Order Cancel</button>
                   <button style={{marginLeft:"20px"}} onClick={this.Moni} className="normal-btn  my-2 btn">Order Accept</button>
                   <button style={{marginLeft:"20px"}} onClick={this.OnTheWay} className="normal-btn  my-2 btn">Order On The WAy</button>
                   <button style={{marginLeft:"20px"}} onClick={this.OrderDelivered} className="normal-btn  my-2 btn">Order Delivered</button>
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

export default Order;
