import './App.css'
import {useState} from "react";

type TableRowType = {
    id: number
    cells: boolean[]
}

const initialRows: TableRowType[] = [
    {id: 0, cells: [false, true]},
    {id: 1, cells: [true, false]}
]

function App() {
    const [rows, setRows] = useState<TableRowType[]>(initialRows)
    const [isEditing, setIsEditing] = useState<{ [key: number]: boolean }>({})
    const [columns, setColumns] = useState<number[]>([1, 2]);

    const toggleEditing = (rowIndex: number) => {
        setIsEditing((prev) => ({...prev, [rowIndex]: !prev[rowIndex]}))
    }

    const handleCellValue = (rowIndex: number, colIndex: number) => {
        if (!isEditing[rowIndex]) return;
        const newRows = rows.map((row, index) =>
            index === rowIndex
                ? {
                    ...row,
                    cells: row.cells.map((cell, cIndex) => (cIndex === colIndex ? !cell : cell)),
                }
                : row
        )
        setRows(newRows)
    }

    const addRow = () => {
        const newRows: TableRowType = {
            id: rows.length,
            cells: columns.map(() => Math.random() < 0, 5)
        }
        setRows((prevRows) => [...prevRows, newRows])
    };

    const deleteRow = (rowIndex: number) => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== rowIndex))
        setIsEditing((prev) => {
                const newEditing = {...prev}
                delete newEditing[rowIndex]
                return newEditing
            }
        )
    };
    return (
        <div>
            <h1>Таблица</h1>
            <button onClick={addRow}>Добавить ряд</button>
            <table>
                <thead>
                <tr>
                    <th>#</th>
                    {columns.map((col) => (
                        <th key={col}>Обработка {col}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {rows.map((row: TableRowType) => (
                    <tr key={row.id}>
                        <td>Заказ{row.id + 1}</td>
                        {row.cells.map((cell, index) => (
                            <td
                                key={index}
                                onClick={() => handleCellValue(row.id, index)}
                                style={{
                                    backgroundColor: cell ? 'green' : 'red',
                                    cursor: isEditing[row.id] ? 'pointer' : 'default',
                                }}
                            >
                                {cell.toString()}
                            </td>
                        ))}
                        <td>
                            <button onClick={() => toggleEditing(row.id)}>
                                {isEditing[row.id] ? 'Сохранить' : 'Редактировать'}
                            </button>
                            <button onClick={() => deleteRow(row.id)}>Удалить</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default App
