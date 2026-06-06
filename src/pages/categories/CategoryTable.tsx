import { useRef } from "react";
type Props = {
    category: any[];
    onLoadMore: (lastId: number) => void;
    onEdit: (data: any) => void;
    onDelete: (data: any) => void
    onOpenUpdateModal: () => void;
};

const CategoryTable = ({ category, onLoadMore, onEdit, onDelete, onOpenUpdateModal }: Props) => {
    const tableRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        const el = tableRef.current;
        if (!el) return;

        const { scrollTop, scrollHeight, clientHeight } = el;

        // khi scroll gần chạm đáy (còn 50px)
        if (scrollTop + clientHeight >= scrollHeight - 50) {
            if (category.length > 0) {
                const lastId = category[category.length - 1].id;
                onLoadMore(lastId);
            }
        }
    };

    return (
        <div className="card">
            <div className="card-body"
                ref={tableRef}
                onScroll={handleScroll}
                style={{
                    maxHeight: "180px",   // 👈 bắt buộc phải có
                    overflowY: "auto"     // 👈 bật scroll
                }}
            >
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Tên loại</th>
                            <th scope="col">Mô tả</th>

                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>

                        {category.map((ct) => (
                            <tr key={ct.id}>
                                <td>{ct.name}</td>
                                <td className="whitespace-normal break-words max-w-xs">
                                    {ct.description}
                                </td>
                                <td >
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            className="btn btn-primary"

                                            onClick={() => {
                                                onEdit(ct);
                                                onOpenUpdateModal();
                                            }}
                                        >
                                            Sửa
                                        </button>
                                        <button type="button" className="btn btn-danger"

                                            onClick={() => onDelete(ct)}
                                        >
                                            xóa
                                        </button>
                                    </div>
                                </td>
                            </tr>

                        ))}

                    </tbody>
                </table>

            </div>
        </div>
    )
}
export default CategoryTable;