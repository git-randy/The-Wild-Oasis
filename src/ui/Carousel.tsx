import styled, { css } from "styled-components";
import CarouselItem from "./CarouselItem";
import {
  createContext,
  useContext,
  useState,
} from "react";

const CarouselContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

type WrapperProps = {
  activeIndex: number;
};

const Wrapper = styled.div<WrapperProps>`
  ${(props) =>
    css`
      transform: translate(-${props.activeIndex * 100}%);
    `};
  white-space: nowrap;
  transition: transform 0.3s;
`;

type ContextType = {
  activeIndex: number;
  setNextItem: () => void;
  setPrevItem: () => void;
};

const CarouselContext = createContext<ContextType>({
  activeIndex: 0,
  setNextItem: () => {},
  setPrevItem: () => {},
});

function Carousel({ children }: { children: React.ReactNode[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const setNextItem = () => {
    setActiveIndex(activeIndex + 1)
  }

  const setPrevItem = () => {
    setActiveIndex(activeIndex - 1)
  }

  return (
    <CarouselContainer>
      <CarouselContext.Provider value={{ activeIndex, setNextItem, setPrevItem }}>
        <Wrapper activeIndex={activeIndex}>
          {children.map((child, index) => (
            <CarouselItem key={index} item={child} />
          ))}
        </Wrapper>
      </CarouselContext.Provider>
    </CarouselContainer>
  );
}

function useCarousel() {
  const context = useContext(CarouselContext);

  if (context === undefined) {
    throw new Error("Carousel context was used outside of Carousel");
  }

  return context;
}

export { Carousel, useCarousel };
