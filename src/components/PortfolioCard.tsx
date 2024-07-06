import '../css/style.css'
import Portfolio from './Portfolio'
import oop from '../assets/oop_java.png'
import embdd from '../assets/arduino.png'
import sushi from '../assets/sushi.png'
import sed from '../assets/sed.png'
import cad from '../assets/cad.png'
import digital from '../assets/digital.png'

function PortfolioCards(){
    return(

        <div className= 'portfolio_section'>
            <h3>MY PORTFOLIOS</h3>
                <ul className='portfolio_list'>
                    <Portfolio className='OOP' photo ={oop} title = "Ginie's Video Store" des ="Object Oriented Programming: The application using to manage the video renting bussiness. With functionals buttona dn user-interface."/>
                    <Portfolio className='Arduino' photo ={embdd} title = "SOS Morse Code Flasher" des ="Introduction in Embedded System: Morse code using LED, operating by Arduino UNO V3 mother board."/>
                    <Portfolio className='Sushi' photo ={sushi} title = "Kimochi Sushi House" des ="Introduction to Fundamental for IT: UI/UX for a restaurant reviewing mobile app"/>
                    <Portfolio className='C++' photo ={sed} title = "Bank Time Application" des ="Software Engineering Design: Basic OOP console application, illustrate the booking app"/>
                    <Portfolio className='CAD' photo ={cad} title = "Battery Driven Vehicle" des ="Creative Engineering CAD: Mini battery car that can carry the water. Design and illustrate using SolidWork."/>
                    <Portfolio className='DF' photo ={digital} title = "Color Changing Detector" des ="Digital Fundamental: The application using to detect the color pixel, and change it to another color."/>

                </ul>
        </div>

    );
}

export default PortfolioCards;