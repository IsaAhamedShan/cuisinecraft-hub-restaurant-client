import { useState } from 'react';
import { Rating, ThinStar } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { SwiperSlide } from 'swiper/react';
// Declare it outside your component so it doesn't get re-created
const myStyles = {
  itemShapes: ThinStar,
  activeFillColor: '#ffb700',
  inactiveFillColor: '#fbf1a9'
}

const ReviewCard = ({item}) => {
    const {name,details,rating} = item
    const [rating2, setRating] = useState(rating)
    return (
        
        <div className='flex flex-col justify-center items-center gap-6 max-w-5xl m-auto [&>*]:py-3'>
            <Rating style={{ maxWidth: 300 }} value={rating2} onChange={setRating} itemStyles={myStyles}/>
            <p className='text-normal'>{details}</p>
            <p className='text-3xl text-[#CD9003]'>{name}</p>
        </div>
    );
};

export default ReviewCard;