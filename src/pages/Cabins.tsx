import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import { useState } from "react";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Modal from "../ui/Modal";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Cabins</Heading>
        <Button design="primary" size="medium" onClick={() => setShowAddForm(true)}>
          Create new cabin
        </Button>
        <CabinTableOperations/>
      </Row>
      <Row>
        <CabinTable />
      </Row>
      {showAddForm &&
        <Modal setIsModalVisible={setShowAddForm}>
          <CreateCabinForm/>
        </Modal>
      }
    </>
  );
}

export default Cabins;
