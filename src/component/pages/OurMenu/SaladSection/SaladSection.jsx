import saladSectionBg from '../../../../assets/others/saladSectionBg.jpg'
import useMenu from '../../../Hooks/useMenu';
import CategoryIntro from '../../../common/CategoryIntro';
import { LuSalad } from "react-icons/lu";
import MenuItem from '../../../common/MenuItem';


const SaladSection = () => {
    const [data, loading] = useMenu('salad');
    const categoryIntroInfo = {
        backgroundColor:'bg-white',
        opacity:"opacity-70",
        heading:'Salad',
        description:"Elevate your palate with our vibrant salad selection, a harmonious blend of crisp greens, fresh vegetables, and delectable dressings. From garden-fresh classics to exotic concoctions, our salads promise a refreshing and wholesome culinary adventure, delivering a burst of flavors that redefine healthy indulgence at CuisineCraft Hub",
        textColor:'bg-white',
        backgroundImg:saladSectionBg,
        icon:<LuSalad />
    }
    return (
        <div>
             <CategoryIntro categoryIntroInfo={categoryIntroInfo}></CategoryIntro>
             <div className="flex justify-center items-center">
          {/* {loading ? (
            <span className="loading loading-bars loading-lg"></span>
          ) : null} */}
        </div>
        <div>
          <h3 className='text-center font-bold mb-4'>Scroll to view full menu</h3>
        </div>
        <div className="grid grid-cols-1 py-5 md:py-10 md:grid-cols-2 justify-center items-center gap-10 max-w-7xl m-auto h-[300px] overflow-y-scroll pr-6">
        {Array.isArray(data) ? (
          data.map(item => (
            <MenuItem key={item._id} itemsList={item}></MenuItem>
          ))
        ) : null}
      </div>
        </div>
    );
};
export default SaladSection;