class ApiURL{
    
    static BaseURL="https://helloroni.com/api/";
    static  VisitorDetails=this.BaseURL+"SendVisitorDetails";
    static  SendContactDetails=this.BaseURL+"SendContactDetails";
    static  SendSiteInfo=this.BaseURL+"SendSiteInfo";
    static  SendCategoryDetails=this.BaseURL+"SendCategoryDetails";
    static  SendCategoryDetail=this.BaseURL+"SendCategoryDetail";
    static  SendSingupDetails=this.BaseURL+"SendSingupDetails";
    static Roni=this.BaseURL+"Roni";
    static Order=this.BaseURL+"Order";
    static Order=this.BaseURL+"Order";
    static ProjectDelete=this.BaseURL+"ProjectDelete";
    static ContactDelete=this.BaseURL+"ContactDelete";
    static  Verifications=this.BaseURL+"Verifications";
    static  Moni=this.BaseURL+"Moni";
    static  OnTheWay=this.BaseURL+"OnTheWay";
    static  OrderDelivered=this.BaseURL+"OrderDelivered";
    static  OrderCancel=this.BaseURL+"OrderCancel";
    static  Contact=this.BaseURL+"Contact";
    static addCategory=this.BaseURL+"addCategory";
    static Category=this.BaseURL+"Category";
    static SubCategory=this.BaseURL+"SubCategory";
    static addSubCategory=this.BaseURL+"addSubCategory";
    static CategoryDelete=this.BaseURL+"CategoryDelete";
    static SubCategoryDelete=this.BaseURL+"SubCategoryDelete";
    static Review=this.BaseURL+"Review";
    static ReviewDelete=this.BaseURL+"ReviewDelete";
    static SliderShow=this.BaseURL+"SliderShow";
    static SliderDelete=this.BaseURL+"SliderDelete";
    static AddSlider=this.BaseURL+"AddSlider";
    static ProductDetail=this.BaseURL+"ProductDetail";
    static ProductDetailDelete=this.BaseURL+"ProductDetailDelete";
    static AddProductDetail=this.BaseURL+"AddProductDetail";
    static SignUps=this.BaseURL+"SignUps";
    static CountSummary=this.BaseURL+"CountSummary";

    static  ProductListByRemark(Remark){
        return this.BaseURL+"ProductListByRemark/"+Remark;
    };

    static  ProductListByCategory(Category){
        return this.BaseURL+"ProductListByCategory/"+Category;
    };

    static  ProductListBySubCategory(Category,SubCategory){
        return this.BaseURL+"ProductListBySubCategory/"+Category+"/"+SubCategory;
    };


    static  SendSliderInfo=this.BaseURL+"SendSliderInfo";


    static  ProductDetails(ProductCode){
        return this.BaseURL+"ProductDetails/"+ProductCode;
    }


    static  NotificationHistory=this.BaseURL+"NotificationHistory";


    static  ProductListBySearch(SearchKey){
        return this.BaseURL+"ProductBySearch/"+SearchKey;
    }

    static SimilarProduct(subcategory){
        return this.BaseURL+"SimilarProduct/"+subcategory;
    }
    static  ReviewList(code){
        return this.BaseURL+"reviewList/"+code;
    }

    static  addToCart=this.BaseURL+"addToCart";

    static  CartCount(mobile){
        return this.BaseURL+"CartCount/"+mobile;
    }
    static  AddFav(mobile,code){
        return this.BaseURL+"addFav/"+code+"/"+mobile;
    }
    static  favList(mobile){
        return this.BaseURL+"favList/"+mobile;
    }
    static  removeFavItem(mobile,code){
        return this.BaseURL+"removeFavItem/"+code+"/"+mobile;
    }


    static  CartList(mobile){
        return this.BaseURL+"CartList/"+mobile;
    }

    static RemoveCartList(id){
        return this.BaseURL+"RemoveCartList/"+id;
    }

    static CartItemMinus(id,quantity,price){
        return this.BaseURL+"CartItemMinus/"+id+"/"+quantity+"/"+price;
    }
    static CartItemMinus(id,quantity,price){
        return this.BaseURL+"CartItemMinus/"+id+"/"+quantity+"/"+price;
    }

    static CartItemPlus(id,quantity,price){
        return this.BaseURL+"CartItemPlus/"+id+"/"+quantity+"/"+price;
    }
    static Moni(id,order_status){
        return this.BaseURL+"Moni/"+id;
    }
    static OnTheWay(id,order_status){
        return this.BaseURL+"OnTheWay/"+id;
    }
    static  CartOrder=this.BaseURL+"CartOrder";


    static  OrderListByUser(mobile){
        return this.BaseURL+"OrderListByUser/"+mobile;
    }

    static  postReview=this.BaseURL+"postReview";
    static  VisitorList=this.BaseURL+"VisitorList";
    
}
export default ApiURL;
