import { useState, useEffect } from 'react'

function App() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true)
      try {
        // 🎯 Condition simple basée sur l'environnement
        const apiUrl = import.meta.env.DEV 
          ? 'http://localhost:5000/api/articles'  // Développement local
          : '/api/articles';                      // Production (via nginx)
        
        console.log('🌐 Appel API vers:', apiUrl, '(Mode:', import.meta.env.MODE, ')')
        
        const response = await fetch(apiUrl)
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        const data = await response.json()
        setArticles(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('❌ Erreur API:', error)
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  return (
    <>
      <div>
        <h1>Welcome Devops Ing Donal!</h1>
        {loading && <p>Loading articles...</p>}
        {error && <p>Error loading articles: {error.message}</p>}
        <div>
          {articles.length > 0 ? (
            articles.map(article => (
              <div key={article._id} style={{border: '1px solid #ccc', margin: '10px', padding: '15px'}}>
                <h3>{article.title}</h3>
                <p>{article.content}</p>
                <small>Par: {article.author} - {new Date(article.createdAt).toLocaleDateString()}</small>
              </div>
            ))
          ) : (
            <p>No articles found.</p>
          )}
        </div>
      </div>
    </>
  )
}

export default App
