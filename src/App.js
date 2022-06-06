import './App.css';

import Header from './components/Header';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className="appWrapper">
      <Header />
      <Navbar />
      <div className="mainContent">
        Content
        <div>Image</div>
        <div>Ava description</div>
        <div>
          <h1>My Posts</h1>
          <div>
            New Post
            <div>Post1</div>
            <div>Post2</div>
            <div>Post3</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
