import { AccountHeader } from "../../components/account/AccountHeader";

const products = [
  {
    id: 1,
    name: "Machined Brass Puzzle",
    href: "#",
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
    href: "#",
    price: "$95.00",
    color: "Brass",
    size: '3" x 3" x 3"',
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/order-history-page-07-product-01.jpg",
    imageAlt:
      "Brass puzzle in the shape of a jack with overlapping rounded posts.",
  },
  // More products...
];

export default function LikedItems() {
  return (
    <div className="bg-white w-full">
      <div className="  px-4 py-5 sm:px-6 ">
        <AccountHeader
          heading="Liked Items"
          text="Here is a list of your liked items"
        />

        <div className="mt-12 space-y-16 sm:mt-16">
          <div className="-mb-6 mt-6 flow-root divide-y divide-gray-200 border-t border-gray-200">
            {products.map((product) => (
              <div key={product.id} className="py-6 sm:flex">
                <div className="flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-20 w-20 flex-none rounded-md object-cover object-center sm:h-48 sm:w-48"
                  />
                  <div className="min-w-0 flex-1 pt-1.5 sm:pt-0">
                    <h3 className="text-sm font-medium text-gray-900">
                      <a href={product.href}>{product.name}</a>
                    </h3>
                    <p className="truncate text-sm text-gray-500">
                      <span>{product.color}</span>{" "}
                      <span className="mx-1 text-gray-400" aria-hidden="true">
                        &middot;
                      </span>{" "}
                      <span>{product.size}</span>
                    </p>
                    <p className="mt-1 font-medium text-gray-900">
                      {product.price}
                    </p>
                  </div>
                </div>
                <div className="mt-6 space-y-4 sm:ml-6 sm:mt-0 sm:w-40 sm:flex-none">
                  <button
                    type="button"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-[#305c45] px-2.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#305c45ce] focus:outline-none focus:ring-2 focus:ring-[#305c45b5] focus:ring-offset-2 sm:w-full sm:flex-grow-0"
                  >
                    Buy
                  </button>
                  <button
                    type="button"
                    className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#305c45] focus:ring-offset-2 sm:w-full sm:flex-grow-0"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
