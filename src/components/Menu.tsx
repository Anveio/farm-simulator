import * as React from "react";
import { MoneyCounter } from "./MoneyCounter";

export default class Menu extends React.Component<any, any> {
  render() {
    return (
      <div className="menu-column">
        <h2 id="menu-title"> Menu </h2>
        <MoneyCounter money={this.props.money} />
        <p> {this.props.currentlySelectedTile || "No Tile Selected"} </p>
      </div>
    )
  }
}