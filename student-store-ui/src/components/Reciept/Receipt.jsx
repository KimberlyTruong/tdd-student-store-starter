import "./Reciept.css"

export default function Reciept (props){
    var i = 1
    return (
        <div className="reciept">
            <hr></hr>
            {props.recieptMessage.map((line) => (
                <p key={i++}>{line}</p>
            ))
            }
        </div>
    )
}
