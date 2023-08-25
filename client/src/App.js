import logo1 from './assests/logos/logo1.png'
import VideoUploader from './components/dragAndDrop/VideoUploader';
import DragAndDrop from './components/dragAndDrop/VideoUploader';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo1} className="App-logo" alt="logo" />
        <VideoUploader />
      </header>

    </div>
  );
}

export default App;
