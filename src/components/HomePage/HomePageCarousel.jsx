// IMPORTING NECESSARY FILES
  // IMPORTING CSS FILES
import "keen-slider/keen-slider.min.css"
  // IMPORTING DATABASE
import Details from "../../database/NFTDetails";
  // IMPORTING MODULES
import { useKeenSlider } from "keen-slider/react"
import React from "react";

// A FUNCTION THAT RETURNS THE CAROUSEL
export default function Carousel() {
  // A STATE TO KEEP TRACK OF THE DETAILS
  const [details, setDetails] = React.useState(null)

  // GETTING THE USEREF FROM USEKEENSLIDER
  const [sliderRef] = useKeenSlider({ 
    loop: true,
    
    detailsChanged(s) {
      setDetails(s.track.details)
    }
  }, 
  
  [
    (slider) => {
      let timeout
      let mouseOver = false
      
      function clearNextTimeout() {
        clearTimeout(timeout)
      }
      
      function nextTimeout() {
        clearTimeout(timeout)
        
        if (mouseOver) return
        
        timeout = setTimeout(() => {
          slider.next()
        }, 2000)
      }
      
      slider.on("created", () => {
        slider.container.addEventListener("mouseover", () => {
          mouseOver = true
          clearNextTimeout()
        })
        
        slider.container.addEventListener("mouseout", () => {
          mouseOver = false
          nextTimeout()
        })
        
        nextTimeout()
      })
      
      slider.on("dragStarted", clearNextTimeout)
      slider.on("animationEnded", nextTimeout)
      slider.on("updated", nextTimeout)
    },
  ])

  // A FUNCTION TO ALTER SIZE ON NEXT SLIDE LOAD
  function scaleStyle(idx) {
    if (!details) return {}
    const slide = details.slides[idx]
    const scale_size = 0.7
    const scale = 1 - (scale_size - scale_size * slide.portion)
    return {
      transform: `scale(${scale})`,
      WebkitTransform: `scale(${scale})`,
    }
  }

  // AN ARRAY OF CARD COMPONENTS
  const carouselCards = Details.map((image, index) => (
    <div
      key={index}
      className="keen-slider__slide"
    >
      <div
        className="w-full p-[20px] h-[50vh] flex flex-col-reverse justify-around items-center gap-[40px] my-[50px] mx-0 sm:my-[100px] sm:mx-0 lg:flex-row lg:justify-around lg:items-center lg:w-[90%] lg:my-[50px] lg:mx-auto"
        style={scaleStyle(index)}
      >
        <div className="flex flex-col justify-center items-start gap-[10px]">
          <h3 className="text-[#ffdb24] mb-5 text-sm font-bold tracking-wider underline">
            TRENDING
          </h3>

          <div
            className="mb-5 relative
                  tracking-wide
                  font-bold
                  w-auto
                  text-3xl
                  text-left
                  left-2
                  md:text-5xl
                  text-[Inter]

                  "
          >
            {image.cardTitle}
          </div>

          <div className=" font-[Inter] text-text-gray text-[20px] not-italic font-[400] leading-normal max-h-[6ch] overflow-y-scroll lg:max-h-[10ch] lg:overflow-y-hidden">
            {image.cardInfo}
          </div>

          <button className="h-[50px] w-[267px] p-[10px] rounded-[10px] bg-[#FFDB24] text-[#000] font-[Inter] text-[20px] not-italic font-[400] leading-normal cursor-pointer transition-all duration-500 ease-in-out hover:bg-description--buttons--link++hover hover:scale-[0.9] sm:w-full lg:w-[80%] mx-auto sm:mx-0">
            Learn More
          </button>
        </div>

        <img
          className="w-[85%] h-[90%] rounded-[10px] sm:w-full sm:h-[130%] lg:w-fit lg:h-full"
          src={image.cardImage}
          alt={`Image ${index}`}
        />
      </div>
    </div>
  ));

  return (
    <div className="flex justify-center w-full">
      <div className="keen-slider md:min-h-[80vh] md:mb-[20%] lg:mb-0 lg:h-[100%]" ref={sliderRef}>
        {carouselCards}
      </div>
    </div>
  );
}
