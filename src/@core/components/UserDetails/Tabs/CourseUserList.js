// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";

// ** Reactstrap Imports
import { Card, CardHeader, Col, Input, Label, Row } from "reactstrap";

// ** Core Imports
import { getCourseListAPI } from "../../../../core/services/api/user/get-course-user-list.api";

// ** Third Party Components
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";

// ** Columns
import { COURSE_RESERVED_PAGE_COLUMNS } from "../../course-columns/course-reserved-page-columns";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";

const CourseUserList = () => {
  // ** States
  const [courseUser, setCourseUser] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState("");

  // ** Hooks
  const { id } = useParams();

  // ** Function to handle filter
  const handleFilter = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  // ** Function to handle Pagination
  const handlePagination = (event) => {
    setCurrentPage(event.selected + 1);
  };

  // ** Function to handle per page
  const handlePerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value));
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Math.ceil(courseUser?.length / rowsPerPage);

    return (
      <ReactPaginate
        nextLabel=""
        breakLabel="..."
        previousLabel=""
        pageRangeDisplayed={2}
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        marginPagesDisplayed={2}
        activeClassName="active"
        pageClassName="page-item"
        breakClassName="page-item"
        nextLinkClassName="page-link"
        pageLinkClassName="page-link"
        breakLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextClassName="page-item next-item"
        previousClassName="page-item prev-item"
        pageCount={count || 1}
        onPageChange={(page) => handlePagination(page)}
        containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
      />
    );
  };

  useEffect(() => {
    const fetchCourseUserList = async () => {
      try {
        const getCourseUserList = await getCourseListAPI(
          id,
          currentPage,
          rowsPerPage
        );

        setCourseUser(getCourseUserList);
      } catch (error) {
        toast.error("مشکلی در دریافت دوره های کاربر به وجود آمد !");
      }
    };

    fetchCourseUserList();
  }, []);

  useEffect(() => {
    const fetchCourseUserList = async () => {
      try {
        const getCourseUserList = await getCourseListAPI(
          id,
          currentPage,
          rowsPerPage
        );

        setCourseUser(getCourseUserList);
      } catch (error) {
        toast.error("مشکلی در دریافت دوره های کاربر به وجود آمد !");
      }
    };

    fetchCourseUserList();
  }, [currentPage, rowsPerPage, searchValue]);

  return (
    <Card>
      <CardHeader tag="h4">دوره های کاربر</CardHeader>
      <div className="react-dataTable user-view-account-projects">
        {courseUser?.length === 0 ? (
          <span className="no-user-course-reserve-found-text">
            دوره ای برای این کاربر پیدا نشد !
          </span>
        ) : (
          <>
            <Row className="justify-content-end align-items-center mx-0 course-reserve-filters">
              <Col md="6" sm="12">
                <div className="d-flex align-items-center">
                  <Label for="sort-select">تعداد نمایش در صفحه</Label>
                  <Input
                    className="dataTable-select course-reserve-rows-per-page-input"
                    type="select"
                    id="sort-select"
                    value={rowsPerPage}
                    onChange={(e) => handlePerPage(e)}
                  >
                    <option value={5}>5</option>
                    <option value={7}>7</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={75}>75</option>
                    <option value={100}>100</option>
                  </Input>
                </div>
              </Col>
              <Col
                md="6"
                sm="12"
                className="d-flex align-items-center justify-content-end course-reserve-filters-search"
              >
                <Label className="me-1" for="search-input">
                  جستجو
                </Label>
                <Input
                  className="dataTable-filter mb-50"
                  type="text"
                  bsSize="sm"
                  id="search-input"
                  value={searchValue}
                  onChange={handleFilter}
                />
              </Col>
            </Row>
            <DataTable
              noHeader
              pagination
              data={courseUser}
              columns={COURSE_RESERVED_PAGE_COLUMNS(true)}
              className="react-dataTable"
              sortIcon={<ChevronDown size={10} />}
              paginationComponent={CustomPagination}
              paginationDefaultPage={currentPage + 1}
            />
          </>
        )}
      </div>
    </Card>
  );
};

export default CourseUserList;
