import React from "react";
import "../styles/thumbnail.css";

class ResultsList extends React.Component {
  constructor(props) {
    super(props);
    this.openModal = props.openModal.bind(this);
    this.createXMLFromProps = this.createXMLFromProps.bind();
    this.state = {
      xml: this.createXMLFromProps(props.movies),
    };
  }

  createXMLFromProps(myprops) {
    return myprops.map((movie, index) => {
      return (
        <div className="thumbnail-div">
          <img
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            alt=""
            onClick={() => {
              this.props.openModal(movie);
            }}
          ></img>
        </div>
      );
    });
  }

  static getDerivedStateFromProps(newProps, state) {
    const returnxml = newProps.movies.map((movie, index) => {
      return (
        <div className="thumbnail-div">
          <img
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            alt=""
            onClick={() => {
              newProps.openModal(movie);
            }}
          ></img>
          <header className="movie-title">{movie.original_title}</header>
        </div>
      );
    });
    return {
      xml: returnxml,
    };
  }

  render() {
    return this.state.xml;
  }
}

export default ResultsList;
