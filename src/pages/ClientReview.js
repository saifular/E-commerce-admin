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
            product_code:"",
            product_name:"",
            mobile:"",
            reviewer_name:"",
            reviewer_rating:"",
            reviewer_rating:"",
            isLoading:true,
            isError:false,
            deleteBtnText:"Delete",
            rowDataID:"",  
         
        }
        this.dataDelete=this.dataDelete.bind(this);
    }
    componentDidMount() {
        axios.get(ApiURL.Review).then((response)=>{
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


    dataDelete(){
        axios.post(ApiURL.ReviewDelete,{id:this.state.rowDataID}).then((response)=>{
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
            {dataField: 'product_code', text: 'Product_code'},
            {dataField: 'product_name', text: 'Product_name'},
            {dataField: 'mobile', text: 'Mobile'},
            {dataField: 'reviewer_name', text: 'Reviewer_name'},
            {dataField: 'reviewer_rating', text: 'Reviewer_rating'},
            {dataField: 'reviewer_comments', text: 'Reviewer_comments'},
        ]
        const selectRow={
            mode:'radio',
            onSelect:(row,isSelect,rowIndex)=>{
                this.setState({rowDataID:row['id']})
                
            }
        }
        return (
            <Fragment>
              
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
