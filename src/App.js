import './App.css';
import ClosestToZero from './components/closestToZero/ClosestToZero';
import SummerSales from './components/summerSales/SummerSales';
import FilterArray from './components/filterArray/FilterArray';

function App() {
  return (
    <div className="App">
      <ClosestToZero />
      <SummerSales />
      <FilterArray />
    </div>
  );
}

export default App;
