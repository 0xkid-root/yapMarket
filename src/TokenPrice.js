import React,{useState,useEffect,useMemo} from 'react';
import axios from 'axios'

const TokenPrice = React.memo(({ token, onPriceUpdate }) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
  console.log("Effect triggered with token.name:", token.name, "and onPriceUpdate:", onPriceUpdate);
  const fetchPrice = async () => {
    try {
      console.log(`Fetching price for ${token.name} from API...`);
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${token.name}&vs_currencies=usd`
      );
      console.log("Fetched price data:", response.data);
      const priceData = response.data[token.name];
      const fetchedPrice = priceData?.usd || 0;
      setPrice(fetchedPrice);
      onPriceUpdate?.(fetchedPrice);  
    } catch (error) {
      console.error("Error fetching price:", error.message);
    }
  };

  fetchPrice();
}, [token.name, onPriceUpdate]);

  const total = useMemo(() => token.balance * price, [token.balance, price]);

  return (
    <tr>
      <td>{token.name}</td>
      <td>{price.toFixed(2)}</td>
      <td>{token.balance}</td>
      <td>{total.toFixed(2)}</td>
    </tr>
  );
});


export default TokenPrice;

//     --url 'https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=bitcoin&names=bitcoin&symbols=btc' \
