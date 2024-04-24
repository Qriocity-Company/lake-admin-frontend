import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import useFetch from '../hooks/useFetch'

function ImageCarousel() {

    const { data, loading, error } = useFetch("https://lake-paradise-admin.onrender.com/hotel/get-hotel");


    const imageData = data?.hotel?.hotelImages;
    // console.log(imageData)
    const settings = {
        
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 2000,
        cssEase: "linear",
        prevArrow:<ArrowLeftCircle className=""/>,
        nextArrow:<ArrowRightCircle className=""/>
      };
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    let sliderRef1 = useRef(null);
    let sliderRef2 = useRef(null);


  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, [imageData]);

//   const imageData = [
//     {
//         title:"Main Back Patio",
//         img:"http://res.cloudinary.com/dh6zjine0/image/upload/v1713787225/upload/bomrlgyoodwdrgleapye.png"
//     },
//     {
//         title:"Front Patio",
//         img:"http://res.cloudinary.com/dh6zjine0/image/upload/v1713787224/upload/ywjv37ikqij7era7ujyo.png"
//     },
//     {
//         title:"Master Bedroom",
//         img:"http://res.cloudinary.com/dh6zjine0/image/upload/v1713787224/upload/setxnjtkw5lhq745inwf.png"
//     },
//     {
//         title:"Outdoor Dining",
//         img:"http://res.cloudinary.com/dh6zjine0/image/upload/v1713787224/upload/dptvhsr4xjxqqx1nue4t.png"
//     }
//   ]

    if(loading){
        return(
            <div>Loading . . .</div>
        )
    }
    if(error){
        return(
            <div>Error : {error}</div>
        )
    }
  return (
    <div className="slider-container flex flex-col justify-center items-center z-10 w-[95vw] md:w-[80vw] lg:w-[70vw] px-4 md:p-8 mb-10">
        
        <Slider  {...settings} asNavFor={nav2} ref={slider => (sliderRef1 = slider)}  className="h-full w-full flex justify-center items-center">
        {
            imageData.map((item,index)=>{
                
                return(
                <div key={index} className="h-full w-full z-50 p-1">
                    <img src={item.img} alt="" className="w-full h-[60vh] md:-[50vh] lg:h-[60vh] object-cover"/>
                    <div className=" bg-[#2637D3] text-white text-lg font-semibold py-2 px-6 w-full">
                    {item.title}
                    </div>
                </div>
                )
            })
        }
        </Slider>
        <Slider
            asNavFor={nav1}
            ref={slider => (sliderRef2 = slider)}
            slidesToShow={4}
            swipeToSlide={true}
            focusOnSelect={true}
            className="w-full z-20 flex justify-center items-center"
            nextArrow={<></>}
            prevArrow={<></>}
        >
        {
            imageData.map((item,index)=>{
                
                return(
                <div key={index} className="h-full w-full z-50 p-1">
                    <img src={item.img} alt="" className="w-full h-[30vh] md:-[20vh] lg:h-[30vh] object-cover"/>
                </div>
                )
            })
        }
        </Slider>
    </div>
  
  );
}

export default ImageCarousel;