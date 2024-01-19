import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../../../assets/home/01.jpg';
import img2 from '../../../../assets/home/02.jpg';
import img3 from '../../../../assets/home/03.png';
import img4 from '../../../../assets/home/04.jpg';
import img5 from '../../../../assets/home/05.png';
import img6 from '../../../../assets/home/06.png';
const Banner = () => {
    return (
        <div className="">
            <Carousel autoPlay='true' interval='4000'>
            <div>
                <img className="md:max-w-5xl lg:max-w-7xl" src={img1} />
                {/* <p className="legend">Legend 1</p> */}
            </div>
            <div>
                <img className="md:max-w-5xl lg:max-w-7xl" src={img2} />
                {/* <p className="legend">Legend 2</p> */}
            </div>
            <div>
                <img className="md:max-w-5xl lg:max-w-7xl" src={img3} />
                {/* <p className="legend">Legend 3</p> */}
            </div>
            <div>
                <img className="md:max-w-5xl lg:max-w-7xl" src={img4} />
                {/* <p className="legend">Legend 3</p> */}
            </div>
            <div>
                <img className="md:max-w-5xl lg:max-w-7xl" src={img5} />
                {/* <p className="legend">Legend 3</p> */}
            </div>
            <div>
                <img className="md:max-w-5xl lg:max-w-7xl" src={img6} />
                {/* <p className="legend">Legend 3</p> */}
            </div>
                </Carousel>
        </div>
    );
};

export default Banner;