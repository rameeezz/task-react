import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";

export default function ProductCard({ itemDetails }) {
  const { addToCart } = useCart();
  return (
    <>
      <div className="flex flex-col w-full max-w-60 items-center border border-border-color rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer bg-inherit">
        <div
          className={`h-48 w-full flex justify-center items-center  p-4 border-b bg-[#242321] rounded-t-2xl`}
        >
          <img
            src={itemDetails.image}
            alt={itemDetails.title}
            className="max-h-full max-w-full object-contain rounded-t-2xl"
            loading="lazy"
            width={160}
            height={160}
          />
        </div>
        <div className="flex flex-col gap-2 p-3">
          <h3 className={`text-sm font-bold text-text-color`}>
            {itemDetails?.category}
          </h3>
          <p className="text-sm font-medium h-10 line-clamp-2">
            {itemDetails?.title}
          </p>
          <div className="flex flex-row justify-between items-center  gap-3">
            <p className="text-sm text-brand font-semibold">
              ${itemDetails?.price}
            </p>

            <button
              className="flex justify-center items-center gap-1 text-white bg-brand p-2 w-20 rounded-2xl cursor-pointer hover:opacity-90 transition-all text-sm font-semibold"
              onClick={() => {
                (addToCart(itemDetails), toast.success("Item added to cart!"));
              }}
            >
              + Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
