import { useRouter, useSearchParams } from "next/navigation";
import ReactPaginate from "react-paginate";

import { DEFAULT_NEWS_LIMIT, DEFAULT_NEWS_PAGE } from "@/constants";

import "./styles.css";

interface IProps {
  totalPages: number;
}

const Pagination = ({ totalPages }: IProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? String(DEFAULT_NEWS_PAGE);
  const limit = searchParams.get("limit") ?? String(DEFAULT_NEWS_LIMIT);

  const handlePageChange = ({ selected }: { selected: number }) => {
    const params = new URLSearchParams(location.search);

    params.set("page", String(selected + 1));
    params.set("limit", limit);

    router.replace(`?${params.toString()}`);
  };

  return (
    <ReactPaginate
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      forcePage={Number(page) - 1}
      onPageChange={handlePageChange}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      pageCount={totalPages}
      renderOnZeroPageCount={null}
      containerClassName="pagination"
      pageClassName="page-item"
      activeClassName="active"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakClassName="page-item"
      breakLinkClassName="page-link"
    />
  );
};

export default Pagination;
