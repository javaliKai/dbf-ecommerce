import banner1 from '../assets/banner-1.jpg';
import banner2 from '../assets/banner-2.jpg';
import banner3 from '../assets/banner-3.jpg';
import { Carousel as Slider } from 'flowbite-react';

const Carousel = () => {
  return (
    <div className='h-[75vh]'>
      <Slider slideInterval={5000}>
        <img src={banner1} alt='...' width='100%' />
        <img src={banner2} alt='...' />
        <img src={banner3} alt='...' />
      </Slider>
    </div>
  );
};

export default Carousel;
