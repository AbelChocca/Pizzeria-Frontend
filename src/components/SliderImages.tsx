import { useState} from 'react'
import images from '../globals';
import buttonSliderStyle from '../styles/buttonSlider';

const SliderImages = () => {
  const [index, setIndex] = useState(0);

  const prevIndex = () => {
    setIndex(prev => (prev - 1 + images.length) % images.length)
  }

  const nextIndex = () => {
    setIndex(next => (next + 1) % images.length)
  }
  return (
    <div className='relative'>
        <img 
            src={images[index]}
            alt={`Slider ${index + 1}`}
            className='w-full h-96 object-cover'
        />
        <button onClick={prevIndex} className={`${buttonSliderStyle} translate-x-4`}>
            {'<'}
        </button>
        <button onClick={nextIndex} className={`${buttonSliderStyle} right-0 -translate-x-4`}>
            {'>'}
        </button>

    </div>
  )
}

export default SliderImages
