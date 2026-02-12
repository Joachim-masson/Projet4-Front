import home from "../assets/home.webp";
import DisplayChoice from "../components/DisplayChoice";
import "./Home.css"

function Home () {
  return (
  <main className="HomeMain">
    <img src={home} className="HomeHero" />
    <DisplayChoice />
  </main>
  )
}

export default Home