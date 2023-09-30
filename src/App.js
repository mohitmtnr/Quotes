import "./App.css";
import { useState } from "react";

function App() {
  const [quotes, setQuotes] = useState(null);

  async function fetchQuotes() {
    const url = "https://quotes15.p.rapidapi.com/quotes/random/";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "db1758d21fmsh803e14d2ddcfc5ep1ad220jsn79d2c14d2e87",
        "X-RapidAPI-Host": "quotes15.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const author = result.originator.name;
      const content = result.content;
      const knowAuthor = result.originator.url;
      const quoteUrl = result.url;
      setQuotes({ content, quoteUrl, author, knowAuthor });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="container">
        <button onClick={fetchQuotes}>Get a random Quote</button>
      </div>

      <div className="quote-container">
        <pre>
          {quotes ? quotes.content : "No Quotes..."}
          <p className="bottom-right">{quotes && `by ~ ${quotes.author}`}</p>
        </pre>
      </div>
      {quotes && (
        <div className="know-about-author">
          <a href={quotes.quoteUrl} target="_blank" rel="noreferrer noopener">
            Visit quote origin
          </a>
          <a href={quotes.knowAuthor} target="_blank" rel="noreferrer noopener">
            Know more about author
          </a>
        </div>
      )}
    </>
  );
}

export default App;
