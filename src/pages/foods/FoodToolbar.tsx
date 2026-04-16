import { useState } from 'react';
import { Search } from 'lucide-react';



type Props = {
  onSubmit: (data: any) => void
}

const FoodToolbar = ({ onSubmit }: Props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleFilter = () => {
        onSubmit({
            searchTerm,
        });
    };

    return (
        <div className="flex items-center justify-between mb-6">

            <div className="mx-auto">
                <div className="input-group " style={{ maxWidth: 400 }}>

                    <input
                        type="text"
                        className="form-control shadow-none"
                        placeholder="Tìm món ăn theo tên"
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
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    +Thêm
                </button>

            </div>

        </div>
    )
}
export default FoodToolbar;