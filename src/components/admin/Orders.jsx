const Orders = () => {
  return (
    <>
      <div className=" w-full">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Items
                </th>
                <th scope="col" className="px-6 py-3">
                  Price ( $ )
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount ($ )
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                
              </tr>
              
            </thead>
            <tbody>
              {Array(10)
                .fill()
                .map((_, key) => {
                  return (
                    <tr
                      className="bg-white border-b  hover:bg-gray-50 "
                      key={key}
                    >
                      <td className="px-6 py-4">Luxury female handbag</td>
                      <td className="px-6 py-4">3,000</td>
                      <td className="px-6 py-4">x1</td>
                      <td className="px-6 py-4">7,000</td>
                      <td className="px-6 py-4">Fashion</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Orders;
