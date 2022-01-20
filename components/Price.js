export default function Price({ prices }) {
  const showRange = prices && prices.min != prices.max;

  let price;
  if (showRange) {
    price = (
      <h3 className="text-xxs lg:text-xs px-1 pt-1">{`\$${prices.min.toFixed(
        2
      )} - \$${prices.max.toFixed(2)}`}</h3>
    );
  } else {
    price = (
      <h3 className="text-xs px-1 pt-1">
        {prices ? `\$${prices.max.toFixed(2)}` : "NA"}
      </h3>
    );
  }

  return <div className="mt-1 font-bold self-center text-center">{price}</div>;
}
