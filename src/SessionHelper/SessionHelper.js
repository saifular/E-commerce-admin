class SessionHelper {


    static setUserName(user_name){
        localStorage.setItem("user_name",user_name)
    }
    static getUserName(){
        return  localStorage.getItem("user_name")
    }
    static removeUserMobile(){
        return  localStorage.removeItem("UserMobile")
    }

    
}

export default SessionHelper;

