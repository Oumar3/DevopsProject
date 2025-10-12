import { useState, useEffect } from 'react'
function App() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL_LOCAL}/test`)
        if (!response.ok) throw new Error('Network response was not ok')
        const data = await response.json()
        // Simuler des articles depuis la réponse de test
        setArticles([{
          id: 1,
          title: 'Test de communication',
          content: data.message,
          author: 'Backend API'
        }])
      } catch (error) {
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
        <ul>
          {articles.length > 0 ? (
            articles.map(article => (
              <li key={article.id}>{article.title}</li>
            ))
          ) : (
            <li>No articles found.</li>
          )}
        </ul>
      </div>
    </>
  )
}

export default App
