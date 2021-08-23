import React, {Component, Fragment} from 'react';
import axios from "axios";
import ApiURL from "../api/ApiURL";
import {toast,ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Menu from '../components/Menu';
class User extends Component {

    constructor() {
        super();
        this.state={
            dataList:[],
            id:"",
            ip_address:"",
            visit_time:"",
            visit_date:"",
            deleteBtnText:"Delete"
            
        }
    }
   
    componentDidMount() {
        axios.get(ApiURL.VisitorList).then((response)=>{
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
   
      imgCellFormat(cell,row){
        return(
            <img style={{width:"60px",height:"auto"}} src={"http://127.0.0.1:8000/"+cell}/>
        )
        }
   


     render() {
        const data = this.state.dataList;
        const columns=[
            {dataField: 'id', text: 'ID'},
            {dataField: 'ip_address', text: 'ip_address'},
            {dataField: 'visit_time', text: 'visit_time'},
            {dataField: 'visit_date', text: 'visit_date'},
        ]
      
        return (
            <Fragment >
                   
                  
                  
                   <Menu>
                 
               <BootstrapTable 
                                                keyField='id'
                                                data={ data }
                                                columns={ columns }
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

export default User;
