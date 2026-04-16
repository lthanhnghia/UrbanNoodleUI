import { useState } from 'react';
import { Search } from 'lucide-react';
type Props = {
  onSubmit: (data: any) => void;
  onOpenCreate: () => void;
};

const EmployeeToolbar = ({ onSubmit,onOpenCreate }: Props) => {

  const [searchTerm, setSearchTerm] = useState('');

  const handleFilter = () => {
    onSubmit({
      searchTerm
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

      <div className="flex items-center gap-4">


        {/* Add Button */}
        <button type="button" className="btn btn-primary" 
        onClick={onOpenCreate}
        >
          +Thêm
        </button>

      </div>

    </div>
  )
}
export default EmployeeToolbar;