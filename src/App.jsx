import { useState, useEffect } from 'react'
import { CityProvider } from './context/CityContext'
import Header from './components/layout/Header'
import StatusBar from './components/layout/StatusBar'
import Footer from './components/layout/Footer'
import CityPage from './pages/CityPage'
import BuildPage from './pages/BuildPage'
import ResourcesPage from './pages/ResourcesPage'
import './styles/app.css'

const PAGES = [
  { id: 'city',      label: '🏙️ My City'      },
  { id: 'build',     label: '🏗️ Construction'  },
  { id: 'resources', label: '📦 Resources'    },
]

function getPageFromHash() {
  const hash = window.location.hash.replace('#', '')
  return PAGES.find(p => p.id === hash)?.id ?? 'city'
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(getPageFromHash)

  useEffect(() => {
    function onHashChange() {
      setCurrentPage(getPageFromHash())
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  function navigate(pageId) {
    window.location.hash = pageId
    setCurrentPage(pageId)
  }

  return (
    <CityProvider>
      <div className="app">
        <Header pages={PAGES} currentPage={currentPage} onNavigate={navigate} />
        <StatusBar />
        <main className="main">
          {currentPage === 'city'      && <CityPage      onNavigate={navigate} />}
          {currentPage === 'build'     && <BuildPage     />}
          {currentPage === 'resources' && <ResourcesPage />}
        </main>
        <Footer />
      </div>
    </CityProvider>
  )
}
