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

    return (
        <div>
            <h1>Таблица</h1>
            <table>
                <colgroup>
                </colgroup>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Обработка1</th>
                    <th>Обработка2</th>
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
                                    backgroundColor:  cell ? 'green' : 'red',
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
                            <button>Удалить</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default App
