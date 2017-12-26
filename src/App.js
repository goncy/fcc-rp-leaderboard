import React, { Component } from "react"

import "./App.css"

const TOP_RECENT_URL = "https://fcctop100.herokuapp.com/api/fccusers/top/recent"
const TOP_ALLTIME_URL =
  "https://fcctop100.herokuapp.com/api/fccusers/top/alltime"

const request = url => fetch(url).then(req => req.json())

class Leaderboard extends Component {
  state = {
    recent: [],
    alltime: [],
    active: "recent"
  }

  async componentDidMount() {
    const data = Promise.all([
      request(TOP_RECENT_URL),
      request(TOP_ALLTIME_URL)
    ])

    data.then(([recent, alltime]) => {
      this.setState({ recent, alltime })
    })
  }

  render() {
    const { active } = this.state

    return (
      <div className="Leaderboard">
        <nav>
          <img
            src="https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg"
            alt="freeCodeCamp Logo"
          />
        </nav>
        <div className="body">
          <table>
            <thead>
              <tr>
                <td>Username</td>
                <td
                  className={active === "recent" ? "active" : ""}
                  onClick={() => this.setState({ active: "recent" })}
                >
                  Recent
                </td>
                <td
                  className={active === "alltime" ? "active" : ""}
                  onClick={() => this.setState({ active: "alltime" })}
                >
                  All time
                </td>
              </tr>
            </thead>
            <tbody>
              {this.state[active].map(({ username, recent, alltime }) => (
                <tr key={username}>
                  <td>{username}</td>
                  <td>{recent}</td>
                  <td>{alltime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Leaderboard
