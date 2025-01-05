import Background from "../../components/Background"
import CTA from "../../components/CTA"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import Features from "../../components/Landing/Features"
import Hero from "../../components/Landing/Hero"
import HowItWorks from "../../components/Landing/Howitworks"
import TeamMembers from "../../components/Landing/TeamMembers"

function Landing() {
  return (
    <Background>
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <Header />
            <main>
                <Hero/>
                <Features/>
                <HowItWorks/>
                <TeamMembers/>
                <CTA/>
            </main>
            <Footer/>
        </div>
    </Background>
  )
}

export default Landing