import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
  const { logout, isPending } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <ButtonIcon disabled={isPending} onClick={handleLogout}>
      {!isPending ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
