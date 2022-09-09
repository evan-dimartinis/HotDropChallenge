import React from "react";
import "../styles/ModalView.css";

class ModalView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: props.movie,
    };
  }

  render() {
    return (
      <div className="modal-view">
        <div className="top-row">
          <div className="image-container">
            <img
              src={
                this.state.movie.poster_path === null
                  ? "../imagenotfound.png"
                  : `https://image.tmdb.org/t/p/w342${this.state.movie.poster_path}`
              }
              alt=""
            />
          </div>
          <div className="details-container">
            <header>{this.state.movie.title}</header>
            <button
              className="close-modal-btn"
              onClick={() => {
                this.props.closeModal();
              }}
            >
              Close
            </button>
            <p>Year Released: {this.state.movie.release_date.substr(0, 4)}</p>
            <p>{this.state.movie.vote_average}/10</p>
          </div>
        </div>
        <div className="description">
          <p>{this.state.movie.overview}</p>
        </div>
      </div>
    );
  }
}

export default ModalView;
