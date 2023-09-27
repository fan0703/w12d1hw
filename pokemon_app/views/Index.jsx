const React = require("react");
const myStyle = {
  color: "#ffffff",
  backgroundColor: "#000000",
};
class Index extends React.Component {
  render() {
    const pokemon = this.props.pokemon
    return (
      <div>
        <h1 style={myStyle}>See All The Pokemon!</h1>
        <ul>
          {this.props.pokemon.map((pokemon, i) => {
            return (
              <li key={i}>
                <a href={`/pokemon/${pokemon._id}`}>
                  {pokemon.name.charAt(0).toUpperCase() +
                    pokemon.name.slice(1).toLowerCase()}
                </a>
                <form action={`/pokemon/${pokemon._id}?_method=DELETE`} method="POST">
                  <input type="submit" value="DELETE"/>
                </form>
              </li>
            );
          })}
        </ul>
        <nav>
          <a href="/pokemon/new">Creat a New Pokemon</a>
        </nav>
      </div>
    );
  }
}
module.exports = Index;
