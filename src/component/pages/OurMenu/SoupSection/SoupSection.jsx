import CategoryIntro from '../../../common/CategoryIntro'
import soupSectionBg from '../../../../assets/others/soupSectionBg.jpg'
import { TbSoup } from "react-icons/tb";
import MenuItem from '../../../common/MenuItem';
import useMenu from '../../../Hooks/useMenu';


const SoupSection = () => {
    const [data, loading] = useMenu('soup');
    const categoryIntroInfo = {
        backgroundColor:'bg-white',
        opacity:"opacity-70",
        heading:'Soup',
        description:"Immerse yourself in warmth with our soul-soothing soup collection. From hearty classics to exotic creations, each spoonful is a journey through rich flavors and comforting aromas. Discover a symphony of ingredients expertly crafted into delicious bowls, inviting you to savor every sip at CuisineCraft Hub",
        textColor:'bg-white',
        backgroundImg:soupSectionBg,
        icon:<TbSoup />
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

export default SoupSection;