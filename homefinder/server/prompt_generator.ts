export type Output = {
  houseSize: string;
  roomNumber: number;
  location: string;
  price: number;
  priceCurrency: string;
};

export const sizeToNumber = (size: string) => {
  switch (size.toLowerCase()) {
    case "small":
      return 30;
    case "medium":
      return 70;
    case "large":
      return 100;
    default:
      return -1;
  }
};

// thanks copilot
export const currencyConversion = (price: number, currency: string) => {
  switch (currency) {
    case "USD":
      return price;
    case "EUR":
      return price * 0.85;
    case "GBP":
      return price * 0.75;
    case "JPY":
      return price * 110;
    case "CNY":
      return price * 6.5;
    case "INR":
      return price * 73;
    case "RUB":
      return price * 73;
    case "LEK":
      return price * 100;
    case "BGN":
      return price * 1.7;
    case "RON":
      return price * 4.5;
    default:
      return -1;
  }
};

export async function prepareResponse(message: string): Promise<Output> {
  // Make a GET request using fetch to the API which is at localhost:3000 and return the response data casted to type Output
  console.log(message);
  console.log(
    `${process.env.PROCESSOR_API_ENDPOINT}/${encodeURIComponent(message)}`
  );
  const response = await fetch(
    `${process.env.PROCESSOR_API_ENDPOINT}/${encodeURIComponent(message)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data as Output;
}

export async function getMainKeywords(description: string) {}
