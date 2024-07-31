import './App.css'
import {useEffect, useState} from "react";

type TableRowType = {
    id: number
    cells: boolean[]
}


const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateInitialColumns = async () => {
    return new Promise<number[]>(resolve => {
        setTimeout(() => {
            const columnsCount = getRandomInt(2, 100)
            const columns = Array.from({length: columnsCount}, (_, i) => i + 1)
            resolve(columns)
        }, 1500)
    })
};

const generateInitialRows = async (columns: number[]) => {
    return new Promise<TableRowType[]>(resolve => {
        setTimeout(() => {
            const rowsCount = getRandomInt(2, 100);
            const rows = Array.from({length: rowsCount}, (_, i) => ({
                id: i,
                cells: columns.map(() => Math.random() < 0.5)
            }))
            resolve(rows)
        }, 1500)
    })
};

const initialRows: TableRowType[] = []

const initialColumns: number[] | (() => number[]) = []

function App() {
    const [rows, setRows] = useState<TableRowType[]>(initialRows)
    const [isEditing, setIsEditing] = useState<{ [key: number]: boolean }>({})
    const [columns, setColumns] = useState<number[]>(initialColumns);
    const [maxId, setMaxId] = useState<number>(initialRows.length)
    const [showModal, setShowModal] = useState<boolean>(false);
    const [rowToDelete, setRowToDelete] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const initialColumns = await generateInitialColumns();
            const initialRows = await generateInitialRows(initialColumns);
            setColumns(initialColumns);
            setRows(initialRows);
            setMaxId(initialRows.length);
        }
        fetchData()
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

    const confirmDeleteRow = (rowIndex: number) => {
        setRowToDelete(rowIndex);
        setShowModal(true);
    };

    const deleteRow = () => {
        if (rowToDelete !== null) {
            setRows((prevRows) => prevRows.filter((row) => row.id !== rowToDelete));
            setIsEditing((prev) => {
                const newEditing = {...prev}
                delete newEditing[rowToDelete]
                return newEditing
            });
            setShowModal(false);
            setRowToDelete(null);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setRowToDelete(null);
    };

    return (
        <div>
            <h1>Таблица</h1>
            <button onClick={addRow}>Добавить ряд</button>
            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th className='sticky-col'>#</th>
                        {columns.map((col) => (
                            <th className='sticky-header vertically' key={col}>Обработка {col}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map((row: TableRowType) => (
                        <tr key={row.id}>
                            <td className='sticky-col'>Заказ {row.id + 1}</td>
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
                                <button onClick={() => confirmDeleteRow(row.id)}>Удалить</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Вы уверены, что хотите удалить эту строку?</p>
                        <button onClick={deleteRow}>Удалить</button>
                        <button onClick={closeModal}>Отмена</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
