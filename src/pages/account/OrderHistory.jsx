import { Link } from "react-router-dom";
import { AccountHeader } from "../../components/account/AccountHeader";
import { useCart } from "../../context/CartContext";
import { useEffect } from "react";
import { useQuery } from "../../utils/useQuery";
import toast from "react-hot-toast";
import { useUser } from "../../context/UserContext";

const orders = [
  {
    number: "4376",
    status: "Delivered on January 22, 2021",
    id: "3",
    products: [
      {
        id: 1,
        name: "Machined Brass Puzzle",
        price: "$95.00",
        color: "Brass",
        size: '3" x 3" x 3"',
        imageSrc:
          "https://tailwindui.com/img/ecommerce-images/order-history-page-07-product-01.jpg",
        imageAlt:
          "Brass puzzle in the shape of a jack with overlapping rounded posts.",
      },
      {
        id: 2,
        name: "Machined Brass Puzzle",
        price: "$95.00",
        color: "Brass",
        size: '3" x 3" x 3"',
        imageSrc:
          "https://tailwindui.com/img/ecommerce-images/order-history-page-07-product-01.jpg",
        imageAlt:
          "Brass puzzle in the shape of a jack with overlapping rounded posts.",
      },
    ],
  },
];

export default function OrderHistory() {
  const { clearCart } = useCart();
  const { orders, loadingOrders } = useUser();
  let query = useQuery();

  // console.log(orders);

  // useEffect(() => {
  //   if (query.get("status") == "true") {
  //     toast.success("Order added Successfully");
  //     clearCart();
  //   }
  // }, [query]);

  return (
    <div className="bg-white w-full min-h-[50vh]">
      <div className="  px-4 py-5 sm:px-6 ">
        <AccountHeader
          heading=" Your Orders"
          text="Check the status of recent orders, manage returns, and discover
        similar products."
        />

        <div className="mt-12 space-y-16 sm:mt-16">
          {loadingOrders ? (
            <div className="flex items-center justify-center flex-col gap-3">
              <div
                className="inline-block h-[30px] w-[30px] animate-spin rounded-full border-[3px] border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-[#305C45]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
              <span className="text-sm">Loading orders...</span>
            </div>
          ) : orders.length < 1 ? (
            <p>No orders found</p>
          ) : (
            orders.map((order) => (
              <section key={order.id} aria-labelledby={`${order.id}-heading`}>
                <div className="space-y-1 md:flex md:items-baseline md:space-x-4 md:space-y-0">
                  <h2
                    id={`${order.id}-heading`}
                    className="text-lg font-medium text-gray-900 md:flex-shrink-0"
                  >
                    Order #{order.id}
                  </h2>
                  <div className="space-y-5 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 md:min-w-0 md:flex-1">
                    <p className="text-sm font-medium text-gray-500">
                      {order.status}
                    </p>
                    <div className="flex text-sm font-medium">
                      <Link
                        to={`${order.id}`}
                        className="text-[#305C45]  hover:text-[#305c45ce] "
                      >
                        View Order
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="-mb-6 mt-6 flow-root divide-y divide-gray-200 border-t border-gray-200">
                  {order.products.map((product) => (
                    <div key={product.id} className="py-6 sm:flex">
                      <div className="flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8">
                        <img
                          src={product.image}
                          className="h-20 w-20 flex-none rounded-md object-cover object-center sm:h-48 sm:w-48"
                        />
                        <div className="min-w-0 flex-1 pt-1.5 sm:pt-0">
                          <h3 className="text-sm font-medium text-gray-900">
                            <a href={product.href}>{product.name}</a>
                          </h3>
                          <p className="truncate text-sm text-gray-500">
                            <span className="capitalize">
                              {product.category}
                            </span>{" "}
                            <span
                              className="mx-1 text-gray-400"
                              aria-hidden="true"
                            >
                              x
                            </span>{" "}
                            <span>{product.quantity}</span>
                          </p>
                          <p className="mt-1 font-medium text-gray-900">
                            ${product.price * product.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="mt-6 space-y-4 sm:ml-6 sm:mt-0 sm:w-40 sm:flex-none">
                        <button
                          type="button"
                          className="flex w-full items-center justify-center rounded-md border border-transparent bg-[#305c45] px-2.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#305c45ce] focus:outline-none focus:ring-2 focus:ring-[#305c45b5] focus:ring-offset-2 sm:w-full sm:flex-grow-0"
                        >
                          Buy again
                        </button>
                        <button
                          type="button"
                          className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#305c45] focus:ring-offset-2 sm:w-full sm:flex-grow-0"
                        >
                          Shop similar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
