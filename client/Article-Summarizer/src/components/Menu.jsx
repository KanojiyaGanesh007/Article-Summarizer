import { useNavigate } from 'react-router-dom';
import "./Menu.css"

const Menu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optionally, clear authentication data (e.g., token or user info)
    // localStorage.removeItem('authToken');  // For example
    // Or clear Redux state if using Redux
    // dispatch(logoutAction());

    // Redirect to the login page after logout
    navigate('/login');
  };

  return (
    <div className="page-container pt-20">
      <div className="top">
        <img src="../src/assets/logo.svg" alt="sumz_logo" className="logo" />
        <button
          type="button"
          title="Log out"
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <h1 className="section-title">Welcome to Article Summarizer!</h1>
      <p className="section-description">
        Choose from our powerful summarization tools to make your reading experience more efficient and productive.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="card cursor-pointer" onClick={() => navigate('/home')}>
          <h2 className="card-title">🌐 Article Summarizer</h2>
          <p className="card-description">
            Extract and summarize articles from any URL. Perfect for quickly understanding long articles and research papers.
          </p>
          <div className="text-blue-600 font-medium">Try it now →</div>
        </div>

        <div className="card cursor-pointer" onClick={() => navigate('/summarizer')}>
          <h2 className="card-title">📝 Text Summarizer</h2>
          <p className="card-description">
            Paste any text and get a concise summary. Great for condensing documents, notes, or any written content.
          </p>
          <div className="text-blue-600 font-medium">Try it now →</div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
