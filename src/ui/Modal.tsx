import styled from "styled-components";
import { RiCloseLargeFill } from "react-icons/ri";
import React, { createContext, ReactElement, useContext } from "react";

type StyledModalProps = {
  topPosition?: string;
}

const StyledModal = styled.div<StyledModalProps>`
  position: fixed;
  top: ${(props) => (props.topPosition ? props.topPosition : "50%")};
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

type Props = {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactElement<unknown>[];
  topPosition?: string
};

type ModalContextType = {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

function Modal({ setIsModalVisible, children, topPosition }: Props) {
  return (
    <Overlay onClick={() => setIsModalVisible(false)}>
      <Button onClick={() => setIsModalVisible(false)}>
        <RiCloseLargeFill />
      </Button>
      <StyledModal onClick={(e) => e.stopPropagation()} topPosition={topPosition}>
        <ModalContext.Provider value={{ setIsModalVisible }}>
          {children}
        </ModalContext.Provider>
      </StyledModal>
    </Overlay>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a Modal");
  }
  return context;
}

export default Modal;
