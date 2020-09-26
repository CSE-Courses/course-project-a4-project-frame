class Game extends React.Component {
  render () {
    return (
      <div class="gameTag" id={this.props.game}>
        <h1><a href={this.props.game}>{this.props.game}</a></h1>
      </div>
    );
  }
}


class GamesList extends React.Component {
  renderGame(i) {
    return <Game game={i}/>;
  }
  render() {
    return (
      <div class="Games">
        {this.renderGame('Ultimate')}
        {this.renderGame('Tekken')}
        {this.renderGame('Melee')}
        {this.renderGame('DBZ')}
      </div>
      
    );
  }
}


ReactDOM.render(
    <GamesList />,
    document.getElementById('root')
);