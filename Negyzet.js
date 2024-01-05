import "./Negyzet .css";

function Negyzet(props) {
  const katt = () => {
    if (props.gamestate==="Jatekos jön") {
        props.katt(props.index);
    };
 
  };
  const osztaly = () => {
    if (props.winners.includes(props.index)) {
      return 'Negyzet nyertes';
    } else {
      return 'Negyzet';
    }
  

  }

  return <div className={osztaly()} onClick={katt}>{props.value}</div>;
}

export default Negyzet;
