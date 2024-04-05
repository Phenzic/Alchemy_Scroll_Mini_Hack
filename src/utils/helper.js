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


