import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";

interface Props {
  selected: Date;
  setSelected: Function;
  loading: boolean;
  onClick: Function;
}

function DateTimeEntry({ selected, setSelected, loading, onClick }: Props) {
  return (
    <div className="card ms-3 mt-3 me-5">
      <div className="card-header fw-bold">Enter date and time</div>
      <div className="ps-3 pb-3 mt-3">
        <DatePicker
          selected={selected}
          onChange={(date: Date) => setSelected(date)}
          showTimeSelect
          timeFormat="p"
          timeIntervals={1}
          dateFormat="Pp"
        />
      </div>
      <div className="ps-3 mb-3">
        {!loading && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onClick()}
            disabled={loading}
          >
            Search
          </button>
        )}
        {loading && (
          <button className="btn btn-primary" type="button" disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </button>
        )}
      </div>
    </div>
  );
}

export default DateTimeEntry;
