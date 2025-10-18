import { useState, useEffect } from 'react'

function App() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/articles`)
        if (!response.ok) throw new Error('Network response was not ok')
        const data = await response.json()
        // Le backend retourne directement le tableau d'articles
        setArticles(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Erreur API:', error)
        console.log('URL appelée:', `${import.meta.env.VITE_API_URL}/articles`)
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
        <h1>Welcome Devops Ing Oumar!</h1>
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
