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
                                <td key={index}>{cell.toString()}</td>
                            ))}
                        <td>
                            <button>редактировать</button>
                            <button>удалить</button>
                        </td>
                    </tr>
                ))}
                </tbody>
                    </table>
                    </div>
                    )
                }

export default App
