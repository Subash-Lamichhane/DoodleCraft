import { Zap, Palette, Clock, Cloud } from 'lucide-react'

const features = [
  {
    icon: <Zap className="w-12 h-12 text-purple-500" />,
    title: 'Instant Transformation',
    description: 'Convert your sketches into realistic images in seconds.'
  },
  {
    icon: <Palette className="w-12 h-12 text-purple-500" />,
    title: 'Customizable Styles',
    description: 'Choose from various styles and textures for your designs.'
  },
  {
    icon: <Clock className="w-12 h-12 text-purple-500" />,
    title: 'Time-Saving',
    description: 'Streamline your design process and iterate faster.'
  },
  {
    icon: <Cloud className="w-12 h-12 text-purple-500" />,
    title: 'Cloud-Based',
    description: 'Access your designs from anywhere, anytime.'
  }
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

