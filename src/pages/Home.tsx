import home2 from "../assets/home2.webp";
import DisplayChoice from "../components/DisplayChoice";
import "./Home.css"

function Home () {
  return (
  <main className="HomeMain">
    <img src={home2} className="HomeHero" alt="la famille simpson sur leur canapé dans le ciel"/>
    <DisplayChoice />
  </main>
  )
}

export default Home