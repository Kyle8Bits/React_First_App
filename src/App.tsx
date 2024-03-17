// import Header from "./Header";
// import Footer from "./Footer";
// import Food from "./Food";
import Card from "./Card";
import Student from "./Student";

function App() {
  return(
    <>
    <Student name = "Mai Dang Khoa" age ={30} isStudent = {true}/>
    <Student name = "Dinh Pham Tuong Vy" age ={22} isStudent = {true}/>
    <Student name = "Jonh Cena" age ={42} isStudent = {false}/>
    <Student name = "Dwayne Johnson" age ={49} isStudent = {false}/>
    <Student name = "Mr Beast"></Student>
    </>
  );
}

export default App;