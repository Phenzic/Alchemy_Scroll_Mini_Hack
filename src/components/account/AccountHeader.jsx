export const AccountHeader = ({
  heading = "Hello, Marvellous Richard",
  text = "07087562892 l mamihub@gmail.com",
  className = "",
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <h1 className="text-sm md:text-3xl font-semibold">{heading}</h1>
      <p className="text-sm md:text-base opacity-60 mt-2">{text}</p>
    </div>
  );
};
