// IMPORTING NECESSARY FILES
  // IMPORTING DATABASE
import Details from "../../database/NFTDetails";
  // IMPORTING MODULES
import { useKeenSlider } from "keen-slider/react"
import React from "react";
  // IMPORTING CSS FILES
import "keen-slider/keen-slider.min.css"
import "./WhaleActivity.css"
  // IMPORTING COMPONENTS
import WhaleActivityCard from './WhaleActivityCard'
import CarouselArrow from "../CarouselArrow"

// A FUNCTION THAT RETURNS A WHALEACTIVITYCONTAINER
export default function WhaleActivityContainer(){
  // A USESTATE TO KEEP TRACK OF CURRENT SLIDE INDEX
  const [currentSlide, setCurrentSlide] = React.useState(0)
  // A USESTATE TO CHECK IF COMPONENT HAS LOADED OR NOT
  const [loaded, setLoaded] = React.useState(false)

  // A SLIDERREF FOR USE KEEN SLIDER
  const [sliderRef, instanceRef] = useKeenSlider({ 
    initial: 0,

    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },

    created() {
      setLoaded(true)
    },

    slides: {
      perView: 3,
      spacing: 10,
    }
  })

  // AN ARRAY OF CAROUSEL CARDS
  function whaleActivityCardArrayGenerator(){
    return Details.map((detail, index) => (
      <div 
        className="keen-slider__slide"
        key = {index}
      >
        <WhaleActivityCard 
          cardImage = {detail.cardImage}
          index = {detail.index}
          cardTitle = {detail.cardTitle}
          price = {detail.price}
          released = {detail.released}
        />
      </div>
    ))
  }

  return (
    <div>
      <div className='flex flex-col justify-center items-center keen-slider' ref={sliderRef}>
        <h1 className='title-sm  mr-auto px-4 mb-5 text-xl font-extrabold tracking-wider' >Whale activity</h1>
        
        <div className="flex w-full lg:w-4/5">
            {whaleActivityCardArrayGenerator()}
        </div>

        {
          loaded && instanceRef.current && 
            <div>
              <CarouselArrow
                left
                
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                
                disabled={currentSlide === 0}
              />

              <CarouselArrow
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
                
                disabled={
                  currentSlide ===
                  instanceRef.current.track.details.slides.length - 1
                }
              />
            </div>
        }

        {
          loaded && instanceRef.current &&
            <div className="py-[10px] justify-center">
              {[
                ...Array(instanceRef.current.track.details.slides.length).keys(),
              ].slice(0, 8).map((idx) => {
                return (
                  <button
                    key={idx}
                    
                    onClick={() => {
                      instanceRef.current?.moveToIdx(idx)
                    }}
                    
                    className={"dot" + (currentSlide === idx ? " active" : "")}
                  ></button>
                )
              })}
            </div>
        }
      </div>
    </div>
  )
}