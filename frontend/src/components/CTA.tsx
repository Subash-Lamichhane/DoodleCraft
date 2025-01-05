import { Link } from "react-router-dom"
export default function CTA() {
    return (
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Bring Your Designs to Life?</h2>
          <p className="text-xl mb-8">Join DoodleCraft today and start transforming your sketches into stunning, realistic clothing images.</p>
          <Link to="/sketch" className="inline-block bg-white text-purple-900 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
            Get Started for Free
          </Link>
        </div>
      </section>
    )
  }
  
  