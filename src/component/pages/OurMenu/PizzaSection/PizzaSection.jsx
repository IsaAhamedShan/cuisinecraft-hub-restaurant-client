import pizzaSectionBg from '../../../../assets/others/pizzaSectionBg.jpeg'
import CategoryIntro from '../../../common/CategoryIntro';
import { CiPizza } from "react-icons/ci";
import MenuItem from '../../../common/MenuItem';
import useMenu from '../../../Hooks/useMenu';

const PizzaSection = () => {
    const [data, loading] = useMenu('pizza');
    const categoryIntroInfo = {
        backgroundColor:'bg-white',
        opacity:"opacity-70",
        heading:'Pizza',
        description:"Savor a symphony of flavors with our artisanal pizzas, crafted with premium ingredients and baked to perfection. From classic Margherita to bold specialty creations, each slice is a culinary masterpiece, promising a delightful journey in every bite. Experience pizza perfection at CuisineCraft Hub",
        textColor:'bg-white',
        backgroundImg:pizzaSectionBg,
        icon :<CiPizza />
    }
    return (
        <div>
            <CategoryIntro categoryIntroInfo={categoryIntroInfo}></CategoryIntro>
            <div className="flex justify-center items-center">
          {loading ? (
            <span className="loading loading-bars loading-lg"></span>
          ) : null}
        </div>
        <div>
          <h3 className='text-center font-bold mb-4'>Scroll to view full menu</h3>
        </div>
        <div className="grid grid-cols-1 py-5 md:py-10 md:grid-cols-2 justify-center items-center gap-10 max-w-7xl m-auto h-[300px] overflow-y-scroll pr-6">
        {data.map(item => (
          <MenuItem key={item._id} itemsList={item}></MenuItem>
        ))}
      </div>
        </div>
    );
};

export default PizzaSection;