
import './App.css';

function App() {
  return (
    <div className="main">

      <h1 style={{ fontSize: "40px" }}>Hands off App</h1>
      <video
        className="video"
        autoPlay
      />
      <div className="control">
        <button>Train 1</button>
        <button>Train 2</button>
        <button>Run</button>
      </div>



    </div>
  );
}

export default App;
