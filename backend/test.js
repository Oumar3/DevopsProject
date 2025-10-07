import Article from './models/Article.js';

const article = new Article({
  title: 'Premier test',
  content: 'Ceci est un test',
  author: 'Oumar'
});

await article.save();