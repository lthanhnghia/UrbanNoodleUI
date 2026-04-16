import { useState } from 'react';
import { Search } from 'lucide-react';

type Props = {
  onSubmit: (data: any) => void
}

const DiningTableToolbar = ({ onSubmit }: Props) => {
 const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleFilter = () => {
    onSubmit({
      searchTerm,
      statusFilter,
    });
  };


  return (
    <div className="flex items-center justify-between mb-6">

      <div className="mx-auto">
        <div className="input-group " style={{ maxWidth: 400 }}>

          <input
            type="text"
            className="form-control shadow-none"
            placeholder="Tìm nhân viên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleFilter();
              }
            }}
          />

          <button
            className="btn btn-primary flex items-center justify-center"
            onClick={handleFilter}
          >
            <Search />
          </button>

        </div>
      </div>

      <div className="flex items-center gap-5">

        {/* Filter */}
        <select
          value={statusFilter}
          onChange={(e) => {
            const value = e.target.value;
            setStatusFilter(value);

            onSubmit({
              searchTerm,
              statusFilter: value,
            });
          }}
          className="px-3 py-2 border rounded-lg  space-x-4"
        >
          <option value="null">tất cả</option>
          <option value="0">còn trống</option>
          <option value="1">đang sử dụng</option>
        </select>

        {/* Add Button */}
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          +Thêm
        </button>

      </div>

    </div>
  )
}
export default DiningTableToolbar;