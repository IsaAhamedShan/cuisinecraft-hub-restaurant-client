import { useState } from 'react';
import { Rating, ThinStar } from '@smastrom/react-rating'
import quote from '../../assets/quote-left.svg'
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
        
        <div className='flex flex-col justify-center items-center gap-6 max-w-5xl m-auto px-2 lg:px-0 [&>*]:py-3'>
            <Rating style={{ maxWidth: 300 }} value={rating2} onChange={setRating} itemStyles={myStyles}/>
            <img className='w-14 md:w-24' src={quote} alt="" />
            <p className='text-normal text-center font-raleway'>{details}</p>
            <p className='text-3xl text-[#CD9003] text-center font-roboto'>{name}</p>
        </div>
    );
};

export default ReviewCard;