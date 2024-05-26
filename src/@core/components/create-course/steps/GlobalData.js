// ** React Imports
import { Fragment } from "react";
// Package Imports
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

// ** Utils
import { isObjEmpty } from "@utils";

// ** Third Party Components
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap";

// Validation Import
import { createCourseStepOneFormSchema } from "../../../../core/validations/create-course/create-course-step-one-form.validation";

const defaultValues = {
  title: "",
  cost: "",
  capacity: "",
  sessionNumber: "",
  miniDescribe: "",
  startDate: "",
  endDate: "",
};

const GlobalData = ({
  stepper,
  setTitle,
  setCost,
  setCapacity,
  setSessionNumber,
  setMiniDescribe,
  setStartDate,
  setEndDate,
}) => {
  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(createCourseStepOneFormSchema),
  });

  const onSubmit = (e) => {
    if (isObjEmpty(errors)) {
      const { title, cost, capacity, sessionNumber, miniDescribe, date } = e;
      const startDate = date[0].year + "-" + date[0].month + "-" + date[0].day;
      const endDate = date[1]
        ? date[1].year + "-" + date[1].month + "-" + date[1].day
        : undefined;
      setTitle(title);
      setCost(cost);
      setCapacity(capacity);
      setSessionNumber(sessionNumber);
      setMiniDescribe(miniDescribe);
      setStartDate(startDate);
      setEndDate(endDate);
      stepper.next();
    }
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">اطلاعات عمومی دوره</h5>
        <small className="text-muted">
          در این بخش باید اطلاعات دوره را وارد کنید.
        </small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="title">
              عنوان
            </Label>
            <Controller
              id="title"
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  id="title"
                  placeholder="مانند: دوره جامع react"
                  invalid={errors.title && true}
                  {...field}
                />
              )}
            />
            {errors.title && (
              <FormFeedback>{errors.title.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="cost">
              قیمت
            </Label>
            <Controller
              control={control}
              id="cost"
              name="cost"
              render={({ field }) => (
                <Input
                  id="cost"
                  placeholder="قیمت دوره"
                  invalid={errors.title && true}
                  {...field}
                />
              )}
            />
            {errors.cost && <FormFeedback>{errors.cost.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="capacity">
              ظرفیت دوره
            </Label>
            <Controller
              id="capacity"
              name="capacity"
              control={control}
              render={({ field }) => (
                <Input
                  id="capacity"
                  placeholder="ظرفیت دوره"
                  invalid={errors.capacity && true}
                  {...field}
                />
              )}
            />
            {errors.capacity && (
              <FormFeedback>{errors.capacity.message}</FormFeedback>
            )}
          </Col>
          <Col md="6">
            <Label className="form-label" for="sessionNumber">
              تعداد جلسات
            </Label>
            <Controller
              control={control}
              id="sessionNumber"
              name="sessionNumber"
              render={({ field }) => (
                <Input
                  id="sessionNumber"
                  placeholder="تعداد جلسات دوره"
                  invalid={errors.title && true}
                  {...field}
                />
              )}
            />
            {errors.sessionNumber && (
              <FormFeedback>{errors.sessionNumber.message}</FormFeedback>
            )}
          </Col>
        </Row>
        <Row className="mb-1">
          <Col md="6">
            <Label className="form-label" for="miniDescribe">
              توضیح کوتاه
            </Label>
            <Controller
              control={control}
              id="miniDescribe"
              name="miniDescribe"
              render={({ field }) => (
                <Input
                  type="textarea"
                  id="miniDescribe"
                  placeholder="توضیح کوتاه"
                  invalid={errors.title && true}
                  {...field}
                />
              )}
            />
            {errors.miniDescribe && (
              <FormFeedback>{errors.miniDescribe.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mt-2">
            <Label className="form-label d-block" for="date">
              تاریخ دوره
            </Label>
            <div className="coursesDatePickerWrapper">
              <Controller
                control={control}
                id="date"
                name="date"
                render={({ field }) => (
                  <DatePicker
                    name="date"
                    id="date"
                    format="YYYY/MM/DD"
                    calender={persian}
                    locale={persian_fa}
                    calenderPosition="bottom_right"
                    inputClass="form-control coursesDatePickerInput"
                    multiple
                    {...field}
                  />
                )}
              />
            </div>
            {errors.date && <FormFeedback>{errors.date.message}</FormFeedback>}
          </Col>
        </Row>

        <div className="d-flex justify-content-between">
          <Button
            type="button"
            color="primary"
            className="btn-prev"
            onClick={() => stepper.previous()}
          >
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">قبلی</span>
          </Button>
          <Button type="submit" color="primary" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">بعدی</span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default GlobalData;
