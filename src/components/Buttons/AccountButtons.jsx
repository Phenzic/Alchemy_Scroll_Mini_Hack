export const AccountButtonOutline = ({
  text = "Edit Profile",
  onClick = () => {},
  className = "",
}) => {
  return (
    <button
      className={`bg-[#305C45] text-white rounded-md p-2  hover:bg-[#305c45c4] active:bg-[#305C45] ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export const AccountButtonFilled = ({
  text = "Edit Profile",
  onClick = () => {},
  className = "",
}) => {
  return (
    <button
      className={`   className="px-6 py-4 border rounded-md text-[#305C45] 
        border-[#305C45] hover:text-[#305c45b9] hover:border-[#305c45b9]
        active:text-[#305c45] active:border-[#305c45]
         ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
