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
