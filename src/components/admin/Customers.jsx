import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { totalUsers } from "../../utils/firebase";
import {dateConverter} from "../../utils/dataConverter"
import {ClipLoader} from "react-spinners"


const Customers = () => {
  const navigate = useNavigate();
  
  const [users, setUsers] = useState([])
  
  useEffect(()=>{
    const users = async function(){
      const data = await totalUsers()
      const usersData = data.filter((eachUser)=>{
        return eachUser.userRole === "user" 
      }) 
      setUsers(usersData)
    }
  
    users()
  },[])


  return (
    <>
      <div className=" w-full">
        <div className="relative overflow-x-auto border sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Joined on
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                
              </tr>
            </thead>
            <tbody>
              {users.length===0?<ClipLoader/>:users.map((eachUser)=>{
                return(
                  <tr
                      className="bg-white border-b cursor-pointer hover:bg-gray-50 "
                      key={eachUser}
                    >
                      <td className="px-6 py-4">{eachUser.username}</td>
                      <td className="px-6 py-4">{eachUser.email}</td>
                      <td className="px-6 py-4">{eachUser.phoneNumber}</td>
                      <td className="px-6 py-4">{dateConverter(eachUser.createdAt.seconds)}</td>
                      <td className="px-6 py-4 text-green-500">Active</td>
                      
                    </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Customers;
