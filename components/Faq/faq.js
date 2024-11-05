import React, {useState} from 'react';
import styles from "../../styles/faq.module.css"
import {DownOutlined} from "@ant-design/icons";
import Item from "./item";
import {useRouter} from "next/router";

const Faq = () => {
    const [items, setItems] = useState([
        {
            id: 1,
            question_hy: "Ինչպե՞ս կարող եմ վճարել",
            question_en: "How can I pay?",
            question_ru: "Как я могу оплатить?",
            answer_hy:"Վճարումներն իրականցվում են առցանց քարտով։",
            answer_en:"Payments are made with online cards.",
            answer_ru:"Оплата производится с помощью онлайн карт.",
        },
        {
            id: 2,
            question_hy: "Ե՞րբ կստանամ պատվերս",
            question_en: "When will I receive my order?",
            question_ru: "Когда я получу свой заказ?",
            answer_hy:"Պատվերները կարող են գրանցվել յուրաքանչյուր օր՝ ցանկացած ժամի, սակայն առաքումն իրականացվում է հաջորդ օրը 10:00-ից 20։00 ընկած ժամանակահատվածում Երևանի տարածքում: \n" +
                "Մարզերում 3-ից 5, Ռուսաստանում 5-ից 7, իսկ ԱՄՆ ում 10 աշխատանքային օրերի ընթացքում:",
            answer_en:"Orders can be registered every day at any time, but delivery is carried out the next day from 10:00 to 20:00 within the Yerevan area. Delivery in regions takes 3 to 5 days, 5 to 7 days in Russia, and within 10 working days in the USA.",
            answer_ru:"Заказы могут быть зарегистрированы ежедневно в любое время, но доставка осуществляется на следующий день с 10:00 до 20:00 в пределах Еревана. Доставка в регионы занимает от 3 до 5 дней, в Россию от 5 до 7 дней, а в США в течение 10 рабочих дней.",
        },
        {
            id: 3,
            question_hy: "Ո՞ր արժույթներով կարող եմ վճարել",
            question_en: "In what currencies can I pay?",
            question_ru: "В каких валютах я могу оплатить?",
            answer_hy:"Կայքում օգտագործվող հիմնական արժույթը ՀՀ դրամն է։ Այլ արժույթներով քարտային  գնումներ կատարելու դեպքում, այդ արժույթները կվերածվեն դրամի՝ ըստ այդ պահին գործող փոխարժեքի:",
            answer_en:"The main currency used on the website is Armenian Dram. If making purchases with cards in other currencies, those amounts will be converted to Dram according to the exchange rate at the time of the transaction.",
            answer_ru:"Основной валютой, используемой на сайте, является армянский драм. При покупке картами в других валютах, суммы будут конвертированы в драмы по курсу на момент транзакции.",
        },
        {
            id: 4,
            question_hy: "Որո՞նք են առաքման տարբերակները",
            question_en: "What are the delivery options?",
            question_ru: "Какие есть варианты доставки?",
            answer_hy:"Պատվերի առաքումն իրականացվում է այն պատրաստ լինելուց հետո՝ 24 ժամվա ընթացքում։ Երևան քաղաքի տարածքում առաքումը գործում է շաբաթվա բոլոր 7 օրերին։ Առաքումը դեպի մարզեր, Ռուսաստան և ԱՄՆ նույնպես հասանելի է։",
            answer_en:"Orders are delivered within 24 hours of being prepared. Delivery in Yerevan city is done on all 7 days of the week. Delivery to regions, Russia, and the USA is also available.",
            answer_ru:"Заказы доставляются в течение 24 часов после подготовки. Доставка в городе Ереване осуществляется каждый день. Доставка в регионы, Россию и США также доступна.",
        },
        {
            id: 5,
            question_hy: "Կարո՞ղ եմ փոխանակում կամ վերադարձ կատարել",
            question_en: "Can I exchange or return?",
            question_ru: "Могу ли я обменять или вернуть?",
            answer_hy:"POEL խանութ-սրահներից գնված ապրանքատեսակներն` բացառությամբ ոկյա զարդերի, ենթակա են վերադարձի դրանք գնելուց 14 օրվա ընթացքում: Վերադարձ կատարելու համար ապրանքատեսակը պետք է լինի չօգտագործված, ունենա վաճառքային տեսք եւ լինի նախնական փաթեթավորմամբ։ Վերդարձի գլխավոր նախապայմանը ՀԴՄ կտրոնի առկայությունն է։ Եթե ապրանքատեսակը գնվել է խանութ-սրահից, ապա այն պետք է վերադարձվի հենց այն խանութ-սրահում, որտեղից գնվել է։",
            answer_en:"Items purchased from POEL stores can be returned within 14 days, excluding certain items like personal care products, if they are unused, have their original packaging, and meet the return conditions. The main condition for return is the presence of an AMD check. If the item was purchased from a physical store, it must be returned to that store.",
            answer_ru:"Товары, купленные в магазинах POEL, могут быть возвращены в течение 14 дней, за исключением некоторых товаров, таких как товары для личной гигиены, если они не использовались, имеют свою оригинальную упаковку и соответствуют условиям возврата. Основным условием для возврата является наличие чека в драмах. Если товар был куплен в физическом магазине, его нужно вернуть в тот магазин.",
        },
        {
            id: 6,
            question_hy: "Ինչպե՞ս կարող եմ վերադարձնել օնլայն պատվերը",
            question_en: "How can I return an online order?",
            question_ru: "Как я могу вернуть онлайн заказ?",
            answer_hy:"Օնլայն պատվերի վերադարձ և փոխանակում չի իրականացվում:",
            answer_en:"Returns and exchanges for online orders are not currently available.",
            answer_ru:"Возвраты и обмены для онлайн заказов в настоящее время недоступны.",
        },
        {
            id: 7,
            question_hy: "Կարո՞ղ եմ օնլայն պատվերը չեղարկել",
            question_en: "Can I cancel an online order?",
            question_ru: "Могу ли я отменить онлайн заказ?",
            answer_hy:"Պատվերը կարող է չեղարկվել մինչև առաքումը: Եթե պատվերը արդեն ճանապարհին է, այն չի կարող չեղարկվել:",
            answer_en:"An order can be canceled before delivery. Once the order is on its way, it cannot be canceled.",
            answer_ru:"Заказ можно отменить до доставки. После того, как заказ отправлен, его нельзя отменить.",
        },
    ])
    const router = useRouter();
    const [itemId, setItemId] = useState(null);



    return (
        <div>
            <div className={styles.faq}>
                <div className={styles.title}>
                    <h1>FAQ</h1>
                </div>
                <div className={styles.faqDivs}>
                    {items.map((item)=>(
                        <Item  item={item} key={item.id}/>
                        
                    ))}

                </div>
            </div>
        </div>
    );
};

export default Faq;
