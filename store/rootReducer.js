import { combineReducers } from "redux";
import categoryReducer from "store/category/reducer";
import blogReducer from "store/blog/reducer";
import contactReducer from "store/about/reducer";
import productReducer from "./products/reducer";
import postReducer from "./instagrams/reducer";
import slideReducer from "./slides/reducer";
import rateReducer from "./rate/reducer";
import userReducer from "./user/reducer";
import faqReducer from "./faq/reducer";
import sloganReducer from "./slogan/reducer";
import paymentReducer from "./payment/reducer";
import brandReducer from "./brand/reducer";


const rootReducer = combineReducers({
    category: categoryReducer,
    blog:blogReducer,
    contact:contactReducer,
    product:productReducer,
    post:postReducer,
    slide:slideReducer,
    rate:rateReducer,
    user:userReducer,
    faq:faqReducer,
    slogan:sloganReducer,
    payment:paymentReducer,
    brand:brandReducer
});

export default rootReducer;
