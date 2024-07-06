import '../css/style.css'

function Portfolio(props:any){
    return(
        <header className="portfolio_container">
                <img className='portfolio_photo' src ={props.photo}></img>

                <div className="info">
                    <div className="title">{props.title}</div>
                    <div className="des">{props.des}</div>
                </div> 
        </header>

    );
}

export default Portfolio;