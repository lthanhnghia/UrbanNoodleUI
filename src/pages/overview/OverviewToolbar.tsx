import { useState } from 'react';

type Props = {
   onSubmitFilter: (dates: { startDate: string; endDate: string }) => void;
  onSubmitToday: () => void;
};


const OverviewToolbar = ({ onSubmitToday, onSubmitFilter }: Props) =>{
    
      const [startDate, setStartDate] = useState('');
      const [endDate, setEndDate] = useState('');
  const handleFilter = () => {
    onSubmitFilter({
      startDate,
      endDate,
    });
  };
    return(
        <div className="d-flex align-items-end flex-wrap w-100">

        <div className="d-flex justify-content-center align-items-end gap-3 flex-wrap flex-grow-1">
          <div>
            <label className="form-label">Từ ngày</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="form-control"
            />
          </div>

          <div>
            <label className="form-label">Đến ngày</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="form-control"
            />
          </div>

          <button
            onClick={handleFilter}
            className="btn btn-success"
          >
            Áp dụng
          </button>
        </div>

        {/* Group right */}
        <div>
          <button
  onClick={() => {
    setStartDate("");
    setEndDate("");
    onSubmitToday();
  }}
  className="btn btn-primary"
>
  Hôm nay
</button>
        </div>

      </div>
    )

}
export default OverviewToolbar;