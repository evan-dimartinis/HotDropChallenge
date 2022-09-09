import React from "react";
import "./App.css";
import { searchImgur } from "./custom-functions/search";
import ResultsList from "./custom-components/ResultsList";
import ReactModal from "react-modal";
import ModalView from "./custom-components/ModalView";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "fit-content",
    width: "40vw",
  },
};

ReactModal.setAppElement("#root");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.state = {
      searchText: "",
      searchErr: "",
      results: [],
      modalIsOpen: false,
      modalMovie: null,
    };
  }

  handleOpenModal(movie) {
    this.setState({
      modalIsOpen: true,
      modalMovie: movie,
    });
  }

  handleCloseModal() {
    this.setState({
      modalIsOpen: false,
    });
  }

  getResults = async () => {
    const resdata = await searchImgur(
      this.state.searchText.split(" ").join("+")
    ).then((response) => {
      return response.json();
    });
    const stateupdate = [];
    resdata.results.forEach((movie) => {
      stateupdate.push(movie);
    });
    this.setState({
      results: stateupdate,
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">Movie Search Tool</header>
        <div className="search-bar">
          <input
            placeholder="Search TMDB"
            type={"text"}
            className="search-input"
            onChange={(n) => {
              this.setState({
                ...this.state,
                searchText: n.target.value,
              });
            }}
            onKeyUp={() => {
              this.getResults();
            }}
          />
          <button
            onClick={() => {
              this.getResults();
            }}
          >
            Search
          </button>
        </div>
        <div className="results-div">
          {this.state.results.length > 0 ? (
            <ResultsList
              movies={this.state.results}
              openModal={(movie) => this.handleOpenModal(movie)}
            />
          ) : (
            <header className="App-header">No results</header>
          )}
        </div>
        <ReactModal isOpen={this.state.modalIsOpen} style={customStyles}>
          <ModalView
            closeModal={() => this.handleCloseModal()}
            movie={this.state.modalMovie}
          />
        </ReactModal>
      </div>
    );
  }
}

export default App;
