export const getName = (str) =>
  str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

export const register = async () => {
  const res = await axios.post("http://localhost:3000/auth/register", {
    name: "John Doe",
    email_address: "",
    password: "",
  });

  console.log(res.data);
};

export function timeAgo(timestamp) {
  const date = timestamp.toDate();
  const now = new Date();

  const seconds = Math.floor((now - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else {
    return seconds < 5 ? "just now" : `${seconds} seconds ago`;
  }
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function validateEmail(email) {
  return emailRegex.test(email);
}

export function capitalizeSentence(sentence) {
  let words = sentence.split(" ");

  let capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  let capitalizedSentence = capitalizedWords.join(" ");

  return capitalizedSentence;
}

export function iOS() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}
export function formatDateToDDMMYYYY(timestamp) {
  // Create a Date object from the date string
  const date = timestamp.toDate();

  // Extract the day, month, and year
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  // Format the date as dd/mm/yyyy
  return `${day}/${month}/${year}`;
}
// const makePayment = async () => {
//   if (email == "" || selectedAddress == "") {
//     toast.error(
//       "Please fill in all fields and make sure an address is selected to continue"
//     );
//   } else {
//     setIsLoading(true);
//     const stripe = await loadStripe(
//       "pk_test_51P81xGRsmFh9wreMAPKsFUb4rxicJJyWp347tq7y0qgksvvXJC2EVepIwk2SkzENu8InXzOUSHyAYFV1j0w3BG0q00Gk8PmyRr"
//     );

//     const body = {
//       products: cartItems.map((item) => {
//         let newObj = {
//           id: item.id,
//           name: item.name,
//           price: item.price,
//           category: item.category,
//           image: item.imageUrls[0].url,
//         };
//         return { ...newObj };
//       }),
//       customerEmail: email,
//       userId: userDetails.uid,
//       addressId: selectedAddress,
//     };

//     try {
//       const response = await axios.post(
//         `https://jamazan-backend.vercel.app/create-checkout-session`,
//         body
//       );

//       const session = await response.data;
//       const result = stripe.redirectToCheckout({
//         sessionId: session.id,
//       });

//       if (result.error) {
//         toast.error("An error occured while making payment");
//         console.log(result.error);
//       }
//     } catch (error) {
//       toast.error("An error occured while initializing checkout");
//       setIsLoading(false)
//     }
//   }
// };
