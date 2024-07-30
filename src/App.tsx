import './App.css'

function App() {

    return (
        <div>
            <h1>Таблица</h1>
            <table>
                <colgroup>
                </colgroup>
                <thead>
                <tr>
                    <th>№ п/п</th>
                    <th>Наименование</th>
                    <th>Цена, руб.</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Карандаш цветной</td>
                    <td>20,00</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Линейка 20 см</td>
                    <td>30,00</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default App
