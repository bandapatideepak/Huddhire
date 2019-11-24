import React from "react";
import axios from "axios";
import * as Constants from "./../Services/Constants";
export class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: [] };
  }
  Back = "<-- Back";
  componentDidMount() {
    axios
      .get(
        `${Constants.Jsonplaceholder + Constants.Comments}?postId=${
          this.props.post.postId
        }`
      )
      .then(result => {
        this.setState({ comments: result.data });
      });
  }
  backToPageList = () => {
    this.props.parentevent();
  };
  render() {
    return (
      <div>
        <div>
          <div className="btn btn-link" onClick={this.backToPageList}>
            {this.Back}
          </div>
        </div>
        <div className="post_header">
          <h4>post details</h4>
          <div>
            <b>Post Title: </b> <label>{this.props.post.postTitle}</label>
          </div>
          <div>
            <b> User Name: </b>
            <label>{this.props.post.userName}</label>
          </div>
        </div>
        <div>
          <h4>Comments</h4>
        </div>
        {this.state.comments.map((comment, i) => {
          return (
            <div className="comments" key={i}>
              <div>
                <b>Subject Comment: </b>
                <label>{comment.name}</label>
              </div>
              <div>
                <b>Subject Body: </b>
                <label>{comment.body}</label>
              </div>
              <div>
                <b>Subject email: </b>
                <label>{comment.email}</label>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
