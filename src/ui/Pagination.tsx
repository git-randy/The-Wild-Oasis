import { useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

type PaginationButtonProps = {
  active?: string;
};

const PaginationButton = styled.button<PaginationButtonProps>`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

type PaginationProps = {
  totalResults: number;
  pageSize: number;
};

const QUERY_NAME = "page";

function Pagination({ totalResults, pageSize }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get(QUERY_NAME)) {
      setSearchParams((params) => {
        params.set(QUERY_NAME, "1");
        return params;
      });
    }
  }, [searchParams]);

  const maxPages = Math.ceil(totalResults / pageSize);

  if (maxPages <= 1) {
    return null;
  }

  const currentPage = Number(searchParams.get(QUERY_NAME)!);

  const nextPage = () => {
    searchParams.set(QUERY_NAME, String(currentPage + 1));
    setSearchParams(searchParams);
  };

  const previousPage = () => {
    searchParams.set(QUERY_NAME, String(currentPage - 1));
    setSearchParams(searchParams);
  };

  function Results() {
    const beginning = (currentPage - 1) * pageSize + 1;
    const end = currentPage === maxPages ? totalResults : currentPage * pageSize;

    return (
      <p>
        Showing <span>{beginning}</span> to <span>{end}</span> of{" "}
        <span>{totalResults}</span> results
      </p>
    );
  }

  return (
    <StyledPagination>
      <Results />
      <Buttons>
        <PaginationButton onClick={previousPage} disabled={currentPage === 1}>
          <HiChevronLeft /> <span> Previous </span>
        </PaginationButton>
        <PaginationButton
          onClick={nextPage}
          disabled={currentPage === maxPages}
        >
          Next
          <span>
            <HiChevronRight />
          </span>
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
