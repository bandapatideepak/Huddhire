import React from "react";
import axios from "axios";
import * as Constants from "../Services/Constants";
import { UserDetails } from "../Users/user";
import { Post } from "./Post";
export class Posts extends React.Component {
  constructor() {
    super();
    this.state = {
      userPosts: [],
      users: [],
      post: {},
      visibleView: "post list"
    };
    this.handleClickOpenUserDetails = this.handleClickOpenUserDetails.bind(
      this
    );
    this.handleClickOpenPostDetails = this.handleClickOpenPostDetails.bind(
      this
    );
  }
  componentDidMount() {
    var postRequest = axios.get(Constants.Jsonplaceholder + Constants.PostsURL);
    var usersRquest = axios.get(Constants.Jsonplaceholder + Constants.UserURL);
    axios.all([postRequest, usersRquest]).then(
      axios.spread((postResp, userResp) => {
        let postResult = postResp.data;
        let userList = userResp.data;
        let posts = postResult.map(post => {
          let userInfo = userList.find(x => x.id === post.userId);
          return {
            postTitle: post.title,
            userName: userInfo.username,
            userId: userInfo.id,
            postId: post.id
          };
        });
        this.setState({ userPosts: posts, users: userList });
      })
    );
  }
  handleClickOpenUserDetails(post) {
    this.setState({
      post: post,
      visibleView: "user details"
    });
  }
  handleClickOpenPostDetails(post) {
    this.setState({ post: post, visibleView: "post details" });
  }
  displayPostsView = () => {
    this.setState({ visibleView: "post list" });
  };

  render() {
    if (this.state.visibleView === "post list") {
      return (
        <div className="container">
          <table className="table user_posts">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {this.state.userPosts.map((post, i) => {
                return (
                  <tr key={i}>
                    <td
                      className="user_posts"
                      onClick={() => this.handleClickOpenUserDetails(post)}
                    >
                      {post.userName}
                    </td>
                    <td
                      className="user_posts comm_align_left"
                      onClick={() => this.handleClickOpenPostDetails(post)}
                    >
                      {post.postTitle}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
    if (this.state.visibleView === "user details") {
      return (
        <UserDetails
          post={this.state.post}
          users={this.state.users}
          parentevent={this.displayPostsView}
        />
      );
    }
    if (this.state.visibleView === "post details") {
      return (
        <Post post={this.state.post} parentevent={this.displayPostsView} />
      );
    }
  }
}
