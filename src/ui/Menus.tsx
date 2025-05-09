import React, { createContext, ReactElement, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

type StyledListProps = {
  position: { x: number; y: number };
};

const StyledList = styled.ul<StyledListProps>`
  position: fixed;

  background-color: var(--color-grey-100);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  border-bottom: 2px solid var(--color-brand-700);
  border-top: 2px solid var(--color-brand-700);
  border-right: 1px dotted var(--color-brand-700);
  border-left: 1px dotted var(--color-brand-700);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

type StyledButtonProps = {
  bgColor?: string;
};

const StyledButton = styled.button<StyledButtonProps>`
  width: 100%;
  text-align: left;
  background: ${(props) => (props.bgColor ? props.bgColor : "none")};
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-brand-200);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

type MenusContextType = {
  openId: string;
  close: () => void;
  open: React.Dispatch<React.SetStateAction<string>>;
  position: { x: number; y: number };
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
};

const MenusContext = createContext<MenusContextType>({
  openId: "",
  close: () => {},
  open: () => {},
  position: {x: 0, y: 0},
  setPosition: () => {}
});

function Menus({ children }: { children: React.ReactNode }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id, icon=undefined }: { id: string, icon?:ReactElement | undefined }) {
  const context = useContext(MenusContext);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    const rect = (e.target as HTMLElement)
      .closest("button")
      ?.getBoundingClientRect();
    context?.setPosition({
      x: window.innerWidth - rect!.width - rect!.x,
      y: rect!.y + rect!.height + 8,
    });

    if (context) {
      context.openId === "" || context.openId !== id
        ? context.open(id)
        : context.close();
    }
  };

  const displayedIcon = icon ? icon : <HiEllipsisVertical/>

  return (
    <StyledToggle onClick={(e) => handleClick(e)}>
      {displayedIcon}
    </StyledToggle>
  );
}

function List({ id, children }: { id: string; children: React.ReactNode }) {
  const context = useContext(MenusContext);

  const ref = useOutsideClick(context!.close, false);

  if (context) {
    if (context.openId !== id) {
      return null;
    }
  }

  // Render children elements into a different part of the DOM
  // This is a context menu that will overlay all other elements
  return createPortal(
    <StyledList position={context!.position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

type ButtonProps = {
  icon?: React.ReactNode | undefined;
  onClick?: () => void;
  children: React.ReactNode;
  bgColor?: string;
  disabled?: boolean;
};

function Button({ icon = undefined, onClick, bgColor, disabled, children }: ButtonProps) {
  const context = useContext(MenusContext);

  const handleClick = () => {
    onClick?.();
    if (context) {
      context.close();
    }
  };

  return (
    <li>
      <StyledButton onClick={handleClick} bgColor={bgColor} disabled={disabled}>
        {icon && icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
