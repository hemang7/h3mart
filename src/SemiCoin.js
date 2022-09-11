import React from "react";
import { useEffect, useState } from "react";
import "./SemiCoin.css";

function SemiCoin() {
  const [coin, setCoin] = useState([]);
  const [visible, setVisible] = useState(50);

  useEffect(() => {
    fetch("https://api.coincap.io/v2/assets")
      .then((resp) => resp.json())
      .then((res) => {
        console.log(res.data);
        setCoin(res.data);
      });
  });

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 50);
  };

  return (
    <div>
      <table class="table table-hover" style={{width:"75%", margin:"auto", border: "0.01px solid white", borderRadius:"50%"}}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Price</th>
            <th scope="col">Market Cap</th>
            <th scope="col">VWAP (24hr)</th>
            <th scope="col">Supply</th>
            <th scope="col">Volume (24hr)</th>
            <th scope="col">Change(24hr)</th>
          </tr>
        </thead>
        <tbody>
          {coin.slice(0, visible).map((x) => (
            <tr>
              <td>{x.rank}</td>

              <td>
                <img
                  src={`https://assets.coincap.io/assets/icons/${x.symbol.toLowerCase()}%402x.png`}
                  alt="crypto"
                  className="symbol"
                />
                {x.name} <br />
                <p style={{ marginLeft: "7%" }}>{x.symbol}</p>
              </td>

              <td>${parseFloat(x.priceUsd).toFixed(2)}</td>
              <td>
                {Math.abs(x.marketCapUsd) >= 1.0e9
                  ? (Math.abs(x.marketCapUsd) / 1.0e9).toFixed(2) + "b"
                  : Math.abs(x.marketCapUsd) >= 1.0e6
                  ? (Math.abs(x.marketCapUsd) / 1.0e6).toFixed(2) + "m"
                  : Math.abs(x.marketCapUsd) >= 1.0e3
                  ? (Math.abs(x.marketCapUsd) / 1.0e3).toFixed(2) + "k"
                  : Math.abs(x.marketCapUsd)}
              </td>

              <td>{parseFloat(x.vwap24Hr).toFixed(2)}</td>
              <td>
                {Math.abs(x.supply) >= 1.0e9
                  ? (Math.abs(x.supply) / 1.0e9).toFixed(2) + "b"
                  : Math.abs(x.supply) >= 1.0e6
                  ? (Math.abs(x.supply) / 1.0e6).toFixed(2) + "m"
                  : Math.abs(x.supply) >= 1.0e3
                  ? (Math.abs(x.supply) / 1.0e3).toFixed(2) + "k"
                  : Math.abs(x.supply)}
              </td>
              <td>
                {Math.abs(x.volumeUsd24Hr) >= 1.0e9
                  ? (Math.abs(x.volumeUsd24Hr) / 1.0e9).toFixed(2) + "b"
                  : Math.abs(x.volumeUsd24Hr) >= 1.0e6
                  ? (Math.abs(x.volumeUsd24Hr) / 1.0e6).toFixed(2) + "m"
                  : Math.abs(x.volumeUsd24Hr) >= 1.0e3
                  ? (Math.abs(x.volumeUsd24Hr) / 1.0e3).toFixed(2) + "k"
                  : Math.abs(x.volumeUsd24Hr)}
              </td>
              {x.changePercent24Hr < 0 ? (
                <td className="coin-percent red">
                  {parseFloat(x.changePercent24Hr).toFixed(2)}%
                </td>
              ) : (
                <td className="coin-percent green">
                  {parseFloat(x.changePercent24Hr).toFixed(2)}%
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" class="btn btn-primary" onClick={showMoreItems}>
        Load More
      </button>
    </div>
  );
}

export default SemiCoin;
