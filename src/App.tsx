import './App.css'
import {useEffect, useState} from "react";

type TableRowType = {
    id: number
    cells: boolean[]
}

const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateInitialColumns = () => {
    const columnsCount = getRandomInt(98, 99);
    return Array.from({ length: columnsCount }, (_, i) => i + 1);
};

const generateInitialRows = (columns: number[]) => {
    const rowsCount = getRandomInt(98, 99);
    return Array.from({ length: rowsCount }, (_, i) => ({
        id: i,
        cells: columns.map(() => Math.random() < 0.5)
    }));
};

const initialRows: TableRowType[] = [
    {id: 0, cells: [false, true]},
    {id: 1, cells: [true, false]}
]

const initialColumns = [1, 2]

function App() {
    const [rows, setRows] = useState<TableRowType[]>(initialRows)
    const [isEditing, setIsEditing] = useState<{ [key: number]: boolean }>({})
    const [columns, setColumns] = useState<number[]>(initialColumns);
    const [maxId, setMaxId] = useState<number>(initialRows.length)

    useEffect(() => {
        const initialColumns = generateInitialColumns();
        const initialRows = generateInitialRows(initialColumns);
        setColumns(initialColumns);
        setRows(initialRows);
        setMaxId(initialRows.length);
    }, []);

    const toggleEditing = (rowIndex: number) => {
        setIsEditing((prev) => ({...prev, [rowIndex]: !prev[rowIndex]}))
    }

    const handleCellValue = (rowIndex: number, colIndex: number) => {
        if (!isEditing[rowIndex]) return;
        const newRows = rows.map((row) =>
            row.id === rowIndex
                ? {
                    ...row,
                    cells: row.cells.map((cell, cIndex) => (cIndex === colIndex ? !cell : cell)),
                }
                : row
        )
        setRows(newRows)
    }

    const addRow = () => {
        const newRow: TableRowType = {
            id: maxId,
            cells: columns.map(() => Math.random() < 0.5)
        }
        setRows((prevRows) => [...prevRows, newRow])
        setMaxId((prevMaxId) => prevMaxId + 1)
    };

    const deleteRow = (rowIndex: number) => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== rowIndex));
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
            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>#</th>
                        {columns.map((col) => (
                            <th className={'vertically'}  key={col}>Обработка{col}</th>
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
        </div>
    )
}

export default App
