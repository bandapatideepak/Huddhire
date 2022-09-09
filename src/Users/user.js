import React from "react";
import axios from "axios";
import Autocomplete from "react-autocomplete";
import * as Constants from "../Services/Constants";

export function matchuserName(state, value) {
  return state.username.toLowerCase().indexOf(value.toLowerCase()) !== -1;
}
export class UserDetails extends React.Component {
  Back = "<-- Back";
  constructor(props) {
    super(props);
    this.backToPageList = this.backToPageList.bind(this);
    this.getuserDetails = this.getuserDetails.bind(this);
    this.state = {
      username: "",
      userDetailList: []
    };
  }
  componentDidMount() {
    axios
      .get(
        Constants.Jsonplaceholder + Constants.UserURL + this.props.post.userId
      )
      .then(response => {
        this.setState({ userDetailList: [response.data] }); 
      });
  }
  backToPageList = () => {
    this.props.parentevent();
  };
  getuserDetails = () => {
    let filteredUsers = this.props.users.filter(user => {
      if (user.username.match(this.state.value)) return true;
      else return false;
    });
    this.setState({ userDetailList: filteredUsers });
  };
  render() {
    return (
      <div>
        <div className="btn btn-link" onClick={this.backToPageList}>
          {this.Back}
        </div>
        <div>Search usernames</div>
        <div>
          <button placeholder="search" onClick={() => this.getuserDetails()}>
            Search
          </button>
        </div>
        <div>
          <Autocomplete
            value={this.state.value}
            inputProps={{ id: "states-autocomplete" }}
            wrapperStyle={{ position: "relative", display: "inline-block" }}
            items={this.props.users}
            getItemValue={item => item.username}
            shouldItemRender={matchuserName}
            onChange={(event, value) => this.setState({ value })}
            onSelect={value => this.setState({ value })}
            renderMenu={children => <div className="menu">{children}</div>}
            renderItem={(item, isHighlighted) => (
              <div
                className={`item ${isHighlighted ? "item-highlighted" : ""}`}
                key={item.abbr}
              >
                {item.username}
              </div>
            )}
          />
        </div>
        <div>user Details</div>
        <div>
          {this.state.userDetailList.map(userDetails => {
            return (
              <div className="comments">
                <div>
                  <b>user name: </b>
                  <label>{userDetails.username}</label>
                </div>
                <div>
                  <b>full name: </b>
                  <label>{userDetails.name}</label>
                </div>
                <div>
                  <b>email: </b>
                  <label>{userDetails.email}</label>
                </div>
                <div>
                  <b>website: </b>
                  <label>{userDetails.website}</label>
                </div>
                <div>
                  <b>company Name: </b>
                  <label>{userDetails.company.name}</label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
