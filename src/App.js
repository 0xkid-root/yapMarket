import { useState, useMemo } from "react";
import "./App.css";
import TokenPrice from "./TokenPrice";

function App() {
  const [tokens, setTokens] = useState([]);
  const [tokenName, setTokenName] = useState("");
  const [tokenBalance, setTokenBalance] = useState("");
  const [tokenPrices, setTokenPrices] = useState({});

  const AddTokenHandle = () => {
    if (!tokenName || !tokenBalance) {
      alert("Please enter both token name and balance");
      return;
    }
    setTokens([
      ...tokens,
      { name: tokenName, balance: parseFloat(tokenBalance) },
    ]);
    setTokenName("");
    setTokenBalance("");
  };
const PortfolioTotalValue = useMemo(() => {
  return tokens.reduce((total, token) => {
    const price = tokenPrices[token.name] || 0;
    return total + (token.balance * price);
  }, 0);
}, [tokens, tokenPrices]);


  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Crypto Portfolio Tracker</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Token Name"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Token Balance"
          value={tokenBalance}
          onChange={(e) => setTokenBalance(e.target.value)}
        />
        <button onClick={AddTokenHandle}>Add Token</button>
      </div>
      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", textAlign: "left" }}
      >
        <thead>
          <tr>
            <th>Token Name</th>
            <th>Price (USD)</th>
            <th>Balance</th>
            <th>Total Value (USD)</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => (
            <TokenPrice
              key={index}
              token={token}
              onPriceUpdate={(price) =>
                setTokenPrices((prev) => ({ ...prev, [token.name]: price }))
              }
            />
          ))}
        </tbody>
      </table>
      <h2>Total Portfolio Value: ${PortfolioTotalValue.toFixed(2)}</h2>
      <p>Note: Prices are fetched from CoinGecko API.</p>
    </div>
  );
}

export default App;
