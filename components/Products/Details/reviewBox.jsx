import React, {useState} from 'react';
import styles from "../../../styles/details.module.css";
import {Button, Divider, Input, List, Rate} from "antd";
import {addReview} from "../../../store/reviews/actions";
import {useDispatch} from "react-redux";
const {TextArea} = Input;

const ReviewBox = ({reviews,product}) => {
    const dispatch = useDispatch();

    const [newReview, setNewReview] = useState({name: "", review: "", rating: 0});
    const addReviews = () => {
        if (newReview.name && newReview.review && newReview.rating) {
            newReview.product_id = product.id;
            dispatch(addReview.request(newReview));
            setNewReview({name: "", review: "", rating: 0});
        }
    };

    return (
        <div className={styles.reviewBox}>
            <Divider orientation="left">Customer Reviews</Divider>

            <List
                itemLayout="horizontal"
                dataSource={reviews}
                renderItem={(review) => (
                    <List.Item>
                        <List.Item.Meta
                            title={<strong>{review.name}</strong>}
                            description={
                                <>
                                    <Rate disabled defaultValue={review.stars}/>
                                    <p>{review.review}</p>
                                </>
                            }
                        />
                    </List.Item>
                )}
                locale={{emptyText: "No reviews yet. Be the first to add one!"}}
            />

            <Divider orientation="left">Add Your Review</Divider>
            <div className={styles.addReviewForm}>
                <Input
                    placeholder="Your name"
                    value={newReview.name}
                    onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                    style={{marginBottom: 8}}
                />
                <TextArea
                    rows={4}
                    placeholder="Your review"
                    value={newReview.review}
                    onChange={(e) => setNewReview({...newReview, review: e.target.value})}
                    style={{marginBottom: 8}}
                />
                <Rate
                    onChange={(value) => setNewReview({...newReview, rating: value})}
                    value={newReview.rating || 0}
                    style={{marginBottom: 8}}
                />
                <br/>
                <Button type="primary" onClick={addReviews}>Submit Review</Button>
            </div>
        </div>
    );
};

export default ReviewBox;