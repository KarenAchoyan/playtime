import {all} from "redux-saga/effects";
import {categorySaga} from "store/category/saga";
import blogSaga from "store/blog/saga";
import {contactSaga} from "store/about/saga";
import {productSaga} from "./products/saga";
import {postSaga} from "./instagrams/saga";
import {slideSaga} from "./slides/saga";
import {rateSaga} from "./rate/saga";
import {userSaga} from "./user/saga";
import {faqSaga} from "./faq/saga";
import {sloganSaga} from "./slogan/saga";
import {paymentSaga} from "./payment/saga";
import {brandSaga} from "./brand/saga";

function* rootSaga() {
    yield all([
        paymentSaga(),
        categorySaga(),
        blogSaga(),
        contactSaga(),
        productSaga(),
        postSaga(),
        slideSaga(),
        rateSaga(),
        userSaga(),
        faqSaga(),
        sloganSaga(),
        brandSaga()
    ]);
}

export default rootSaga;
