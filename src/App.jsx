import './App.css'
import Navbar from './components/Navbar';
import Manager from './components/Manager';
import Footer from './components/Footer';

function App() {

  const aboutDivId = "about";

  return (
    <>

      <Navbar aboutDivId={aboutDivId} />
      <div className="min-h-[calc(100vh-9.5rem)]">
        <Manager />
      </div>
      <Footer />
    </>
  )
}

export default App
