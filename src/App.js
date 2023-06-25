import {useDispatch, useSelector} from 'react-redux';
import {fetchQuotes} from './redux/reducers/quoteReducer'
import { useEffect, useState } from 'react';
import './App.css';
import Loading from './img/loading-loading-forever.gif';
import TwitterIcon from "./img/twittericon.svg";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const colors = ["#7dcea0", "#5499c7", "#eb984e", "#af7ac5", "#cd6155", "#aeb6bf"];
  const [background, setBackground] = useState(colors[0]);

  useEffect(() => {
    dispatch(fetchQuotes());
  }, [dispatch]);

  return (
    <main style={{backgroundColor: background}}>
      <div id="quote-box">
        <div className="loading-container">
        {state.quote.isLoading ? <img id="loading" src={Loading} alt="Loading" /> : null}
        </div>
        <p id="text" style={{color: background}}>{
        state.quote.isLoading ?
        null
        :
        state.quote.data !== null ?
        '"' + state.quote.data[0].content + '"'
        : null
        }</p>
        <p id="author" style={{color: background}}> {
        state.quote.isLoading ?
        null
        :
        state.quote.data !== null ?
        "-" + state.quote.data[0].author
        : null}</p>
        <div className="buttons">
            <button id="new-quote" style={{backgroundColor: background}} onClick={
              e => {
                dispatch(fetchQuotes());
                setBackground(colors[Math.floor(Math.random()*colors.length)])
              }}>
                New Quote
            </button>
            <a href={state.quote.data === null ? null : "https://twitter.com/intent/tweet?text="+state.quote.data[0].content}><button id="tweet-quote">
              <img src={TwitterIcon} alt="" />
              Tweet quote
            </button></a>
        </div>
      </div>
    </main>
  );
}

export default App;