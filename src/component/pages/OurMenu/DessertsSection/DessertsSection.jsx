import CategoryIntro from '../../../common/CategoryIntro'
import dessertsSectionBg from '../../../../assets/others/desertsSectionBg.jpeg'
import { LuDessert } from "react-icons/lu";
import useMenu from '../../../Hooks/useMenu';
import MenuItem from '../../../common/MenuItem';


const DessertsSection = () => {
  
    const [data, loading] = useMenu('dessert');
    const categoryIntroInfo = {
        backgroundColor:'bg-white',
        opacity:"opacity-70",
        heading:'Desserts',
        description:"Dive into a world of sweetness with our divine dessert selection. Indulge in artisanal treats that redefine decadence, elevating every moment of indulgence",
        textColor:'bg-white',
        backgroundImg:dessertsSectionBg,
        icon:<LuDessert />
    }
    return (
        <div className=''>
            <CategoryIntro categoryIntroInfo={categoryIntroInfo}></CategoryIntro>
            <div className="flex justify-center items-center">
          {loading ? (
            <span className="loading loading-bars loading-lg"></span>
          ) : null}
        </div >
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

export default DessertsSection;