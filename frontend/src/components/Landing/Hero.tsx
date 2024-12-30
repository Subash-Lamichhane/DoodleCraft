import { ArrowRight, Sparkles } from 'lucide-react'
import HeroSketch1 from '/landing-sketch1.jpg'
import HeroSketch2 from '/landing-sketch2.jpg'
import HeroRealistic1 from '/landing-realistic1.jpg'
import HeroRealistic2 from '/landing-realistic2.jpg'
export default function Hero() {
  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              Transform Sketches into Fashion Reality
            </h1>
            <p className="text-xl mb-8 text-gray-300">
              DoodleCraft uses AI-powered ControlNet to turn your fashion sketches into stunning, lifelike garment images. Unleash your creativity with just a few clicks!
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#" className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a href="#how-it-works" className="inline-flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                How It Works
                <Sparkles className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-20 rounded-3xl transform rotate-3"></div>
            <div className="relative z-10 grid grid-cols-2 gap-4 pl-8">
              <img
                src={HeroSketch1}
                alt="Fashion Sketch"
                width={250}
                height={300}
                className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 opacity-60 -rotate-3"
              />
              <img
                src={HeroRealistic1}
                alt="Realistic Garment"
                width={250}
                height={300}
                className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 opacity-80 rotate-3 "
              />
              <img
                src={HeroSketch2}
                alt="Fashion Sketch"
                width={250}
                height={300}
                className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 opacity-60 -rotate-3"
              />
              <img
                src={HeroRealistic2}
                alt="Realistic Garment"
                width={250}
                height={300}
                className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 opacity-80 rotate-3"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

