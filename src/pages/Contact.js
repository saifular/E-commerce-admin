import React, {Component, Fragment} from 'react';
import axios from "axios";
import ApiURL from "../api/ApiURL";
import {toast,ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Menu from '../components/Menu';
class Contact extends Component {

    constructor() {
        super();
        this.state={
            dataList:[],
            id:"",
            name:"",
            mobile:"",
            message:"",
            contact_date:"",
            deleteBtnText:"Delete",
            rowDataID:"",
            
        }
        this.dataDelete=this.dataDelete.bind(this);
    }
   
    componentDidMount() {
        axios.get(ApiURL.Contact).then((response)=>{
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
        axios.post(ApiURL.ContactDelete,{id:this.state.rowDataID}).then((response)=>{
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
            {dataField: 'name', text: 'Name'},
            {dataField: 'mobile', text: 'Mobile'},
            {dataField: 'message', text: 'Message'},
            {dataField: 'contact_date', text: 'Contact_date'},
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

export default Contact;
