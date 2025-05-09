import Button from "../../ui/Button";
import { useCheckOut } from "./useCheckOut";

function CheckoutButton({ bookingId }: { bookingId: number }) {
  const { isPending, checkOut } = useCheckOut();

  return (
    <Button
      design="primary"
      size="small"
      onClick={() => checkOut(bookingId)}
      disabled={isPending}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
