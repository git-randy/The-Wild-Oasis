import styled from "styled-components";

const Item = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

function CarouselItem({ item }: { item: React.ReactNode }) {
  return (
    <Item>
      <div></div>
      {item}
    </Item>
  );
}

export default CarouselItem;
