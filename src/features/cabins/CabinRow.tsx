import styled from "styled-components";
import { CabinAPIData } from "./blueprints";
import { appendDuplicateNum, formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useState } from "react";
import EditCabinForm from "./EditCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiX } from "react-icons/hi";
import { FaTrashCan } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { HiSquare2Stack } from "react-icons/hi2";
import { useDuplicateCabin } from "./useDuplicateCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { IconContext } from "react-icons";

const ButtonDiv = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  margin-left: 35px;
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 5 / 4;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }: { cabin: CabinAPIData }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const { isPending: isDeleting, deleteCabin } = useDeleteCabin();
  const { isPending: isCopying, duplicateCabin } = useDuplicateCabin();

  const duplicateHandler = () => {
    const newName = appendDuplicateNum(cabin.name);
    const newCabin = {
      name: newName,
      max_capacity: cabin.max_capacity,
      regular_price: cabin.regular_price,
      discount: cabin.discount,
      description: cabin.description,
      image: cabin.image!,
    };
    duplicateCabin(newCabin);
  };

  return (
    <>
      <Table.Row
        editColor={showEditForm ? "var(--color-yellow-300)" : "none"}
      >
        <Img src={cabin.image} />
        <Cabin>{cabin.name}</Cabin>
        <div>Fits up to {cabin.max_capacity}</div>
        <Price>{formatCurrency(cabin.regular_price)}</Price>
        {cabin.discount > 0 ? (
          <Discount>{formatCurrency(cabin.discount)}</Discount>
        ) : (
          <span>&mdash;&mdash;&mdash;</span>
        )}
        <ButtonDiv>
          <Button
            design="edit"
            size="medium"
            disabled={isCopying || isDeleting}
            onClick={() => setShowEditForm(!showEditForm)}
          >
            {showEditForm ? <HiX /> : <GoPencil />}
          </Button>
          <Menus.Menu>
            <Menus.Toggle id={String(cabin.id)} />
            <Menus.List id={String(cabin.id)}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={duplicateHandler}
              >
                Duplicate
              </Menus.Button>
              <Menus.Button
                icon={
                  <IconContext.Provider value={{ color: "red" }}>
                    <FaTrashCan />
                  </IconContext.Provider>
                }
                onClick={() => deleteCabin(cabin.id)}
              >
                Delete
              </Menus.Button>
            </Menus.List>
          </Menus.Menu>
        </ButtonDiv>
      </Table.Row>
      {showEditForm && (
        <EditCabinForm setIsVisible={setShowEditForm} cabinRowData={cabin} />
      )}
    </>
  );
}

export default CabinRow;
