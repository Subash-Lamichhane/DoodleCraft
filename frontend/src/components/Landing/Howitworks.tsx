import { PenTool, Wand2, ShoppingBag } from 'lucide-react'

const steps = [
  {
    icon: <PenTool className="w-12 h-12 text-purple-500" />,
    title: 'Sketch Your Design',
    description: 'Draw your clothing design using our simple sketching tool or upload your own sketch.'
  },
  {
    icon: <Wand2 className="w-12 h-12 text-purple-500" />,
    title: 'AI Magic',
    description: 'Our ControlNet-powered AI transforms your sketch into a realistic clothing image.'
  },
  {
    icon: <ShoppingBag className="w-12 h-12 text-purple-500" />,
    title: 'Refine and Use',
    description: 'Adjust the results, download your image, or share it with your audience.'
  }
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-start space-y-8 md:space-y-0 md:space-x-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center max-w-sm">
              <div className="mb-4 bg-gray-800 p-4 rounded-full">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

