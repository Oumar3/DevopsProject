import { useState, useEffect } from 'react'
function App() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true)
      try {
        const response = await fetch('http://localhost:5000/api/articles')
        if (!response.ok) throw new Error('Network response was not ok')
        const data = await response.json()
        setArticles(data)
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
        <h1>Hello Vite + React!</h1>
        {loading && <p>Loading articles...</p>}
        {error && <p>Error loading articles: {error.message}</p>}
        <ul>
          {articles.map(article => (
            <li key={article.id}>{article.title}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
