import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BsArrowCounterclockwise } from "react-icons/bs";
import Zvuk from "./zvuk.js";

function dodajStilove(el, stilovi) {
	for (let key in stilovi) {
		el.style[key] = stilovi[key];
	}
}

function inicirajPolje(x, y, vr) { // inicira polje [x][y] sa vrijednostima vr
	var rez = [];
	for (let i = 0; i < x; i++) {
		var red = [];
		for (let j = 0; j < y; j++) {
			red.push(vr);
		}
		rez.push(red);
	}
	return rez;
}

function GameOverDispla({bodovi, startButton, show}) {
	const  r = React.useRef();
	const  r1 = React.useRef();
	console.log("renderao si gameover display");
    
    React.useEffect(() => {
        if (show) {
		    dodajStilove(r1.current, {display:"flex"});
	    } else {
		    dodajStilove(r1.current, {display:"none"});
	    }
	
    }, [show]);
    
    React.useEffect(() => {
			r.current.addEventListener("mouseenter", funn1);
		    r.current.addEventListener("mouseleave", funn2);
		    console.log("Postavljam eventove");
			
			return (() => {
				console.log("Uklanjam eventove");
				r.current.removeEventListener("mouseenter", funn1);
		        r.current.removeEventListener("mouseleave", funn2);
		    });
	}, []);
		
    function funn1() {
		dodajStilove(r.current, {borderColor:"green", backgroundColor:"#555555"});
	};
	
	function funn2() {
		dodajStilove(r.current, {borderColor:"black", backgroundColor:"#222222"});
	};
	
	return (
	    <div ref={r1} id="gameover">
	        <p id="gameover-naslov">Game Over!</p>
	        <p id="gameover-score">Your Score: <span id="gameover-bodovi">{bodovi}</span></p>
	        <div ref={r} id="gameover-gumb" onClick={startButton}>
	            <div id="gameover-gumb1">
	                <BsArrowCounterclockwise size="30px"/>
	            </div>
	        </div>
	    </div>
	)
}

var GameOverDisplay = React.memo(GameOverDispla);

function BrDispla({naslov, broj}) {
	return (
	    <div id="brdisplay">
	        <p id="brdisplay-naslov">{naslov} {broj}</p>
	    </div>
	)
}

var BrDisplay = React.memo(BrDispla);

function Gum({klik}) {
	return (
	    <div onClick={klik} id="gumb">
	        <p id="gumb-p">Start Game</p>
	    </div>
	)
}

var Gumb = React.memo(Gum);

function NextDispla({sljedeci, br}) {
// ova funkcija crta sljedece objekte koji ce pasti. sljedeci je polje sa imenima objekata. ako ima vise od
// cetiri objekta, ova funkcija prikazuje samo prva cetiri. Ako ne zelis prikazati ni jedan objekt, postavi
// property sljedeci na prazno polje, []
	const [next, setNext] = React.useState(sljedeci);
	var [polje, setPolje] = React.useState([]);
	
	React.useEffect(() => {
		var sl = sljedeci;
		if (sl.length > 4) sl = sl.slice(0,3);
		//setNext(sl);
		
		if (br == 0) {
			var pp = [];
		} else {
		    var pp = sl.map((el, i) => {return <NextObjekt key={i} objekt={el}/>});
		}
		setPolje(pp);
		
	}, [sljedeci]);
			
	return (
	    <div id="nextdisplay">
	        <p id="nextdisplay-naslov">Next</p>
	        {polje}
	    </div>
	)
}

var NextDisplay = React.memo(NextDispla);


function NextObjek({objekt}) {

	const [r1, r2, r3, r4, r5, r6, r7, r8] = [React.useRef(), React.useRef(), React.useRef(), React.useRef(), React.useRef(), React.useRef(), React.useRef(), React.useRef()];
	function nacrtaj(polja, boja) {
		for (let el of polja) {
			switch (el) {
				case (1):
		            r1.current.style.backgroundColor = boja;
		            r1.current.style.borderWidth = "1px";
		            break;	
		        case (2):
		            r2.current.style.backgroundColor = boja;
		            r2.current.style.borderWidth = "1px";
		            break;
		        case (3):
		            r3.current.style.backgroundColor = boja;
		            r3.current.style.borderWidth = "1px";
		            break;
		        case (4):
		            r4.current.style.backgroundColor = boja;
		            r4.current.style.borderWidth = "1px";
		            break;
		        case (5):
		            r5.current.style.backgroundColor = boja;
		            r5.current.style.borderWidth = "1px";
		            break;
		        case (6):
		            r6.current.style.backgroundColor = boja;
		            r6.current.style.borderWidth = "1px";
		            break;
		        case (7):
		            r7.current.style.backgroundColor = boja;
		            r7.current.style.borderWidth = "1px";
		            break;
		        case (8):
		            r8.current.style.backgroundColor = boja;
		            r8.current.style.borderWidth = "1px";
		            break;
			}
		}
	}
	
	React.useEffect(() => {
		nacrtaj([1,2,3,4,5,6,7,8], "black");
		switch (objekt) {
			case "I-shape":
			    nacrtaj([1,2,3,4], "#d97d04");
			    break;
			case "kvadrat":
			    nacrtaj([2,3,6,7], "#db1107");
			    break;
			case "munja":
			    nacrtaj([5,6,2,3], "#09e2e6");
			    break;
			case "obrnuta_munja":
			    nacrtaj([1,2,6,7], "#29d91c");
			    break;
			case "L-shape":
			    nacrtaj([1,2,3,5], "#0422ba");
			    break;
			case "obrL-shape":
			    nacrtaj([1,2,3,7], "#cc0eb9");
			    break;
			case "T-shape":
			    nacrtaj([1,2,3,6], "#d4d124");
			    break;
			default:
			    alert("Greskica");
			
		}
	}, [objekt]);
	
	return (
	    <div id="display1">
	        <div ref={r1} className="polje1"></div>
	        <div ref={r2} className="polje1"></div>
	        <div ref={r3} className="polje1"></div>
	        <div ref={r4} className="polje1"></div>
	        <div ref={r5} className="polje1"></div>
	        <div ref={r6} className="polje1"></div>
	        <div ref={r7} className="polje1"></div>
	        <div ref={r8} className="polje1"></div>
	    </div>
	)
}

var NextObjekt = React.memo(NextObjek);

class Aplikacija extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			stanja: inicirajPolje(20, 12, 0),  // stanje displaya
			objekt: {tip: null, koordX: null, koordY: null, orijentacija: null},
			projekcija: {tip: null, koordX: null, koordY: null, orijentacija: null},  //  projekcija objekta na dnu displaya
			projekcijaSw: true,  // za true crta projekciju, za false ne crta
			nextObjects: [],    // sljedeci objekti koji ce se pojaviti
			brSljedecihObjekata: 4,  // koliko prikazuje sljedecih objekata u Next displayu, mozes imati od 0 do 4
			level: 1,
			brLinija: 0,
			score: 0,
			showGameOver: false     // za true prikazuje game over window, za false ga skriva
		}
		
		
		this.vrijeme = 500;  // time step automatskog pomaka objekta prema dolje za jedno polje
		
		//ovdje slijede autoRepeat/autoDelay postavke, zatim prekidaci za eventhandlere i slicno.
		this.horizontalniPomak = "n";  // aktualno stanje za n je nema pomaka, l je lijevi, d je desni pomak
		this.autoRepeat = 50; // autorepeat u msec za lijevi/desni pomak u msec
		this.autoDelay = 220;  // autodelay autorepeata za lijevi/desni pomak u msec
		
		this.vertikalniPomak = "n";  // aktualno stanje za n je nema pomaka, za d - da, ima pomaka
		this.autoRepeatV = 40; // autorepeat u msec za vertikalni pomak u msec
		this.autoDelayV = 270;  // autodelay autorepeata za vertikalni pomak u msec
		
		this.rotirajSw = true;  // prekidac koji onemogucuje autorotaciju
		
		this.ref1 = null;
		this.ref2 = null;
		this.engineRef = null;
		
		this.promijeniPolje = this.promijeniPolje.bind(this);
		this.inicirajObjekt = this.inicirajObjekt.bind(this);
		this.engine = this.engine.bind(this);
		this.nacrtajObjekt = this.nacrtajObjekt.bind(this);
		this.spustiObjekt = this.spustiObjekt.bind(this);
		this.brzoSpustiObjekt = this.brzoSpustiObjekt.bind(this);
		this.provjeriDoljeObjekt = this.provjeriDoljeObjekt.bind(this);
		this.pritisakGumba = this.pritisakGumba.bind(this);
		this.pritisakGumbaUp = this.pritisakGumbaUp.bind(this);
		this.provjeriStranuObjekt = this.provjeriStranuObjekt.bind(this);
		this.pomakniUStranuObjekt = this.pomakniUStranuObjekt.bind(this);
		this.rotirajObjekt = this.rotirajObjekt.bind(this);
		this.provjeriRotacijuObjekt = this.provjeriRotacijuObjekt.bind(this);
		this.sljedeciRandomObjekt = this.sljedeciRandomObjekt.bind(this);
		this.provjeriPuneLinije = this.provjeriPuneLinije.bind(this);
		this.animirajPuneLinije = this.animirajPuneLinije.bind(this);
		this.ugradiObjekt = this.ugradiObjekt.bind(this);
		this.projecirajObjekt = this.projecirajObjekt.bind(this);
		this.autorepeatFun = this.autoRepeatFun.bind(this);
		this.autorepeatFun1 = this.autoRepeatFun1.bind(this);
		this.inicirajPocetakIgre = this.inicirajPocetakIgre.bind(this);
		this.provjeriMogucnostInicijalizacije = this.provjeriMogucnostInicijalizacije.bind(this);
		this.gameOver = this.gameOver.bind(this);
	}
	
	componentDidMount() {
		//this._div.style.backgroundColor = "red";
		for (let i = 0; i < 240; i++) {
			let el = document.createElement("div");
			el.classList.add("polje");
			//el.style.backgroundColor = "red";
			this._div.appendChild(el);
		}
		
		document.addEventListener("keydown", this.pritisakGumba);
        document.addEventListener("keyup", this.pritisakGumbaUp);
		
		this.zvuk = new Zvuk();
		//this.engine();
		
		//this.promijeniPolje([[0, 5, 1], [1, 5, 2], [2, 5, 0], [3, 5, 3], [4, 5, 4], [5, 5, 5], [6, 5, 6], [7, 5, 7]]);
	}
	
	componentWillUnmount() {
		alert("unmountam");
		document.removeEventListener("keydown", this.pritisakGumba);
        document.removeEventListener("keyup", this.pritisakGumbaUp);
	}
	
	componentDidUpdate(prevProps, prevState) {
		//console.log("funkcija componentDidUpdate je pokrenuta");	
		for (let i = 0; i < 240; i++) {
			if (prevState.stanja[Math.floor(i/12)][i%12] != this.state.stanja[Math.floor(i/12)][i%12]) {
				//console.log("upravo mjenjamo " + (i%12) + " / " + Math.floor(i/12));
				switch (this.state.stanja[Math.floor(i/12)][i%12]) {
					case (-1):
					    dodajStilove(this._div.children[i], {borderColor:"green"});   // ovo je za slucaj projekcije
					    break;
					case (0):
				        dodajStilove(this._div.children[i], {borderColor:"#111111", backgroundColor:"#000000", animationName:null, animationDuration:null}); // crna, prazno polje
				        break;
				    case (1):
				        dodajStilove(this._div.children[i], {borderColor:"#111111", backgroundColor:"#db1107"}); // crvena, za kvadrat
				        break;
				    case (2):
				        dodajStilove(this._div.children[i], {borderColor:"#111111", backgroundColor:"#d97d04"});  // smeda, za liniju
				        break;
				    case (3):
				        dodajStilove(this._div.children[i], {borderColor:"#111111", backgroundColor:"#09e2e6"});  // svjetlo plava, za munju
				        break;
				    case (4):
				        dodajStilove(this._div.children[i], {borderColor:"#111111", backgroundColor:"#29d91c"});  // zelena, za obrnutu munju
				        break;    
				    case (5):
				        dodajStilove(this._div.children[i], {borderColor:"#111111", backgroundColor:"#0422ba"});   // tamno plava, za L-shape
				        break;
				    case (6):
				        dodajStilove(this._div.children[i], {borderColor:"#111111", backgroundColor:"#cc0eb9"});  // roza, za obrnuti L-shape
				        break;
				    case (7):
				        dodajStilove(this._div.children[i], {borderColor:"#111111", backgroundColor:"#d4d124"});   // zuta, za T-shape
				        break;
				    case (8):   //  slucaj animacije polja kojeg ponistavamo, u slucaju da je linija puna
				        dodajStilove(this._div.children[i], {borderColor:"#111111", animationName:"animacija", animationDuration:"0.5s"});
				        break;
				    default:
				        alert("Error, krivi input");
				}
			}
		}
	  	
		//console.log("previous:" + prevState.stanja);
		
	}
	
	
	render() {
		return (
		    <div id="okvir">
		        <div id="el1">
		            <NextDisplay sljedeci={this.state.nextObjects} br={this.state.brSljedecihObjekata}/>
		        </div>
		        <div ref={(e) => {this._div = e}} id="display">
		        </div>
		        <div id="el">
		            <BrDisplay naslov="Score:" broj={this.state.score}/>
		            <BrDisplay naslov="Level:" broj={this.state.level}/>
		            <BrDisplay naslov="Lines:" broj={this.state.brLinija}/>
		            <Gumb klik={this.engine}/>
		        </div>
		        <GameOverDisplay bodovi={this.state.score} startButton={this.engine} show={this.state.showGameOver}/>
		    </div>
		)
	}
	
	inicirajPocetakIgre() {
		setTimeout(() => {
			for (let i = 0; i < this.state.brSljedecihObjekata; i++) {
		        this.sljedeciRandomObjekt();
		    }
		    if (this.state.brSljedecihObjekata == 0) {
				this.sljedeciRandomObjekt();
			}
			
		    this.setState({level: 1, brLinija: 0, score: 0, showGameOver: false, stanja: inicirajPolje(20, 12, 0)});
		    this.inicirajObjekt(this.state.nextObjects[0]);  // I-shape, kvadrat, munja, obrnuta_munja, L-shape, obrL-shape, T-shape
		    this.sljedeciRandomObjekt();
		    this.vrijeme = 500;
	    }, 10);
	}
	
	engine() {
		
		this.inicirajPocetakIgre();
		
		this.engineRef = setInterval(() => {
			if (this.provjeriDoljeObjekt()) {
				this.spustiObjekt();
			} else {
				this.zvuk.pusti(3);
				this.ugradiObjekt();
			}
			
			
			
			}, this.vrijeme);

	    
		
		if (false) {
		setTimeout(() => {
		//	this.spustiObjekt()
		this.nacrtajObjekt({tip: "kvadrat", koordX: 0, koordY: 18, orijentacija: 1, sw: true});
		    this.nacrtajObjekt({tip: "kvadrat", koordX: 2, koordY: 18, orijentacija: 1, sw: true});
		    this.nacrtajObjekt({tip: "kvadrat", koordX: 4, koordY: 18, orijentacija: 1, sw: true});
		    this.nacrtajObjekt({tip: "kvadrat", koordX: 6, koordY: 18, orijentacija: 1, sw: true});
		    this.nacrtajObjekt({tip: "kvadrat", koordX: 8, koordY: 18, orijentacija: 1, sw: true});
			}, 3);
        }			
	}
	
	gameOver() {
		//alert("GAME OVER!!!");
		clearTimeout(this.engineRef);
		setTimeout(() => {this.zvuk.pusti(4)}, 170);
		this.setState({showGameOver: true});
	}
	
	sljedeciRandomObjekt() {
		var noviNext = [...this.state.nextObjects];
		noviNext.push(["I-shape", "kvadrat", "munja", "obrnuta_munja", "L-shape", "obrL-shape", "T-shape"][Math.floor(Math.random()*7)]);
		//noviNext.push("T-shape");
		if (noviNext.length > this.state.brSljedecihObjekata   &&  noviNext.length > 1)  noviNext.shift();
		this.setState({nextObjects: noviNext});
	}
	
	spustiObjekt() {
		//console.log("spustam objekt");
		if (this.provjeriDoljeObjekt()) {
			//console.log("MOZE");
		    var noviObjekt = {...this.state.objekt};
		    this.nacrtajObjekt({...noviObjekt, sw: false});
		    noviObjekt.koordY += 1;
		
		    this.nacrtajObjekt({...noviObjekt, sw: true});
		    this.setState({objekt: noviObjekt});
		} else {
			//console.log("ne moze");
		}
	}
	
	brzoSpustiObjekt() {
		var noviObjekt = {...this.state.objekt};
		this.nacrtajObjekt({...noviObjekt, sw: false});
		while (this.provjeriDoljeObjekt(noviObjekt.koordX, noviObjekt.koordY, noviObjekt.tip, noviObjekt.orijentacija)) {
		//provjeriDoljeObjekt(KoordX, KoordY, Tip, Orijentacija) 
		//objekt: {tip: null, koordX: null, koordY: null, orijentacija: null}	
		    noviObjekt.koordY += 1;
		}
		this.zvuk.pusti(2);
		this.nacrtajObjekt({...noviObjekt, sw: true});
		this.setState({objekt: noviObjekt});
		this.ugradiObjekt();
	}
	
	projecirajObjekt() {  // ova funkcija crta projekciju objekta na dnu displaya
		if (this.state.projekcijaSw) {
			//console.log("POKRENUO si projekciju objekta");
			var noviObjekt = null;
			if (this.state.projekcija.tip !== null) {
				noviObjekt = {...this.state.projekcija};
		        this.nacrtajObjekt({...noviObjekt, sw: false, sw1: true});
		        //console.log("if pokrenut");		
			}
		    var noviObjekt = {...this.state.objekt};	
			while (this.provjeriDoljeObjekt(noviObjekt.koordX, noviObjekt.koordY, noviObjekt.tip, noviObjekt.orijentacija)) {
		        noviObjekt.koordY += 1;
		    }
		    this.nacrtajObjekt({...noviObjekt, sw: true, sw1: true});
		    this.setState({projekcija: noviObjekt});
		}
		
	}
	
	
	rotirajObjekt(sw) {   // za sw true rotiraj u obrnutom smjeru od kazaljke na satu, za false/faulty/nepostojeci rotiraj u smjeru kazaljke na satu
		if (this.provjeriRotacijuObjekt(sw)) {
		    var {koordX, koordY, tip, orijentacija} = {...this.state.objekt};
		    var noviObjekt = {...this.state.objekt};
		    this.nacrtajObjekt({...noviObjekt, sw: false});  
		    switch (tip) {
				case "I-shape":
			    case "munja":  
			    case "obrnuta_munja":  
			        if (orijentacija == 1) {
			            noviObjekt.orijentacija = 2;	    
			        } else {
					    noviObjekt.orijentacija = 1;
				    }
		            break;
		        case "L-shape":
		        case "obrL-shape":  
		        case "T-shape":  
		            if (sw) {
						if (orijentacija > 1) {
							orijentacija -= 1;
						} else {
							orijentacija = 4;
						}
					} else {
		                if (orijentacija < 4) {
						    orijentacija += 1;
					    } else {
						    orijentacija = 1;
					    }
				    }
					noviObjekt.orijentacija = orijentacija;
		            break;
		        case "kvadrat":  // nikada se ne javlja zato sto provjeriRotacijuObjekt za njega vraca false
		            break;
		        default:
		            alert("Kod rotacije imas zadan pogresan tip");
		    }
		    
		    this.zvuk.pusti(0);
		    this.nacrtajObjekt({...noviObjekt, sw: true});
		    this.setState({objekt: noviObjekt});
		    this.projecirajObjekt();
		}
	}
	
	pomakniUStranuObjekt(sww) {  // za sw='l' pomice na lijevo objekt, za 'd' na desno
		if (this.provjeriStranuObjekt(sww)) {
			var noviObjekt = {...this.state.objekt};
		    this.nacrtajObjekt({...noviObjekt, sw: false});
		    if (sww == 'l') { 
				noviObjekt.koordX -= 1;
			} else {
				noviObjekt.koordX += 1;
			}
			this.zvuk.pusti(1);
		    this.nacrtajObjekt({...noviObjekt, sw: true});
		    this.setState({objekt: noviObjekt});
		    this.projecirajObjekt();
		} 
	}
	
	provjeriRotacijuObjekt(sw) {  // za sw false/faulty/nepostojeci provjeravas rotaciju u smjeru kazaljke na satu, za true u smjeru suprotnom od kazaljke na satu
		var {koordX, koordY, tip, orijentacija} = {...this.state.objekt};
		if (sw) {
			//console.log("truthy");
			tip += "-suprotni";
		} else {
			//console.log("faulty");
		}
		switch (tip) {
			case ("I-shape"):
			case ("I-shape-suprotni"):
			    if (orijentacija == 1) {
					if (koordY <= 17 && (koordY == 0  ||  this.state.stanja[koordY-1][koordX] <= 0) && this.state.stanja[koordY+1][koordX] <= 0 && this.state.stanja[koordY+2][koordX] <= 0) return true;
					return false;
				} else {
					if (koordX == 0 || koordX >= 10) return false;
					if (this.state.stanja[koordY][koordX-1] > 0 || this.state.stanja[koordY][koordX+1] > 0 || this.state.stanja[koordY][koordX+2] > 0) return false;
					return true;
				}
			    break;
			case ("kvadrat"):
			case ("kvadrat-suprotni"):
			    return false;
			case ("munja"):
			case ("munja-suprotni"):
			    if (orijentacija == 1) {
					if ( (koordY == 0  ||  this.state.stanja[koordY-1][koordX] <= 0) && this.state.stanja[koordY+1][koordX+1] <= 0) return true;
					return false;
				} else {
					if (koordX == 0) return false;
					if (this.state.stanja[koordY+1][koordX-1] > 0 || this.state.stanja[koordY+1][koordX] > 0) return false;
					return true;
				}
			    break;
			case ("obrnuta_munja"):
			case ("obrnuta_munja-suprotni"):
			    if (orijentacija == 1) {
					if ( (koordY == 0  ||  this.state.stanja[koordY-1][koordX] <= 0) && this.state.stanja[koordY+1][koordX-1] <= 0) return true;
					return false;
				} else {
					if (koordX >= 11) return false;
					if (this.state.stanja[koordY+1][koordX+1] > 0 || this.state.stanja[koordY+1][koordX] > 0) return false;
					return true;
				}
			    break;
			case ("L-shape"):
			    switch (orijentacija) {
					case (1):
					    if (  (koordY == 0  ||  (this.state.stanja[koordY-1][koordX-1] <= 0 && this.state.stanja[koordY-1][koordX] <= 0 )  )  && this.state.stanja[koordY+1][koordX] <= 0) return true;
					    return false;
					    break;
					case (2):
					    if (koordX <= 10 && (koordY == 0 || this.state.stanja[koordY-1][koordX+1] <= 0)  && this.state.stanja[koordY][koordX+1] <= 0 && this.state.stanja[koordY][koordX-1] <= 0) return true;
					    return false;
					    break;
					case (3):
					    if (koordY <= 18 && (koordY == 0 || this.state.stanja[koordY-1][koordX] <= 0)  && this.state.stanja[koordY+1][koordX] <= 0 && this.state.stanja[koordY+1][koordX+1] <= 0) return true;
					    return false;
					    break;
					case (4):
					    if (koordX >= 1 && this.state.stanja[koordY+1][koordX-1] <= 0 && this.state.stanja[koordY][koordX-1] <= 0 && this.state.stanja[koordY][koordX+1] <= 0) return true;
					    return false;
					    break;
					default:
					    alert("pogresna orijentacija L-shapea");
				}
			    break;
			case ("L-shape-suprotni"):
			    switch (orijentacija) {
					case (1):
					    if ( (koordY == 0 || this.state.stanja[koordY-1][koordX] <= 0)  && this.state.stanja[koordY+1][koordX] <= 0 && this.state.stanja[koordY+1][koordX+1] <= 0) return true;
					    return false;
					    break;
					case (2):
					    if (koordX <= 10 && this.state.stanja[koordY+1][koordX-1] <= 0 && this.state.stanja[koordY][koordX-1] <= 0 && this.state.stanja[koordY][koordX+1] <= 0) return true;
					    return false;
					    break;
					case (3):
					    if (koordY <= 18 && (koordY == 0  ||  (this.state.stanja[koordY-1][koordX-1] <= 0 && this.state.stanja[koordY-1][koordX] <= 0 )  )  && this.state.stanja[koordY+1][koordX] <= 0) return true;
					    return false;
					    break;
					case (4):
					    if (koordX >= 1 && (koordY == 0 || this.state.stanja[koordY-1][koordX+1] <= 0)  && this.state.stanja[koordY][koordX+1] <= 0 && this.state.stanja[koordY][koordX-1] <= 0) return true;
					    return false;
					    break;
					default:
					    alert("pogresna orijentacija L-shapea");
				}
			    break;
			case ("obrL-shape"):
			    switch (orijentacija) {
					case (1):
					    if (  (koordY == 0 || this.state.stanja[koordY-1][koordX] <= 0)  && this.state.stanja[koordY+1][koordX] <= 0 && this.state.stanja[koordY+1][koordX-1] <= 0) return true;
					    return false;
					    break;
					case (2):
					    if (koordX <= 10 && (koordY == 0 || this.state.stanja[koordY-1][koordX-1] <= 0)  && this.state.stanja[koordY][koordX-1] <= 0 && this.state.stanja[koordY][koordX+1] <= 0) return true;
					    return false;
					    break;
					case (3):
					    if (koordY <= 18 && (koordY == 0 || (this.state.stanja[koordY-1][koordX] <= 0 && this.state.stanja[koordY-1][koordX+1] <= 0) ) && this.state.stanja[koordY+1][koordX] <= 0) return true;
					    return false;
					    break;
					case (4):
					    if (koordX >= 1 && this.state.stanja[koordY][koordX-1] <= 0 && this.state.stanja[koordY][koordX+1] <= 0 && this.state.stanja[koordY+1][koordX+1] <= 0) return true;
					    return false;
					    break;
					default:
					    alert("pogresna orijentacija L-shapea");
				}
			    break;
			case ("obrL-shape-suprotni"):
			    switch (orijentacija) {
					case (1):
					    if ( (koordY == 0 || (this.state.stanja[koordY-1][koordX] <= 0 && this.state.stanja[koordY-1][koordX+1] <= 0) ) && this.state.stanja[koordY+1][koordX] <= 0) return true;
					    return false;
					    break;
					case (2):
					    if (koordX <= 10 && this.state.stanja[koordY][koordX-1] <= 0 && this.state.stanja[koordY][koordX+1] <= 0 && this.state.stanja[koordY+1][koordX+1] <= 0) return true;
					    return false;
					    break;
					case (3):
					    if (koordY <= 18  &&  (koordY == 0 || this.state.stanja[koordY-1][koordX] <= 0)  && this.state.stanja[koordY+1][koordX] <= 0 && this.state.stanja[koordY+1][koordX-1] <= 0) return true;
					    return false;
					    break;
					case (4):
					    if (koordX >= 1 && (koordY == 0 || this.state.stanja[koordY-1][koordX-1] <= 0)  && this.state.stanja[koordY][koordX-1] <= 0 && this.state.stanja[koordY][koordX+1] <= 0) return true;
					    return false;
					    break;
					default:
					    alert("pogresna orijentacija L-shapea");
				}
			    break;
			case ("T-shape"):
			    switch (orijentacija) {
					case (1):
					    if (koordY == 0 || this.state.stanja[koordY-1][koordX] <= 0)  return true;
					    return false;
					    break;
					case (2):
					    if (koordX <= 10 && this.state.stanja[koordY][koordX+1] <= 0)  return true;
					    return false;
					    break;
					case (3):
					    if (koordY <= 18 && this.state.stanja[koordY+1][koordX] <= 0)  return true;
					    return false;
					    break;
					case (4):
					    if (koordX >= 1 && this.state.stanja[koordY][koordX-1] <= 0)  return true;
					    return false;
					    break;
					default:
					    alert("pogresna orijentacija L-shapea");
				}
			    break;
			case ("T-shape-suprotni"):    
			    switch (orijentacija) {
					case (1):
					    if (koordY == 0 || this.state.stanja[koordY-1][koordX] <= 0)  return true;
					    return false;
					    break;
					case (2):
					    if (koordX <= 10 && this.state.stanja[koordY][koordX+1] <= 0)  return true;
					    return false;
					    break;
					case (3):
					    if (koordY <= 18 && this.state.stanja[koordY+1][koordX] <= 0)  return true;
					    return false;
					    break;
					case (4):
					    if (koordX >= 1 && this.state.stanja[koordY][koordX-1] <= 0)  return true;
					    return false;
					    break;
					default:
					    alert("pogresna orijentacija L-shapea");
				}
			    break;
			default:
			    alert("cini se da imas los tip");
		}
	}
	
	provjeriStranuObjekt(sw) { // za sw='l' provjerava da li se objekt moze pomaknuti na lijevo, za 'd' na desno
	    var {koordX, koordY, tip, orijentacija} = {...this.state.objekt};
	    if (sw == 'l') {
			switch (tip) {
			    case ('I-shape'):
			        if (orijentacija == 1) {
						if (koordX > 1 && this.state.stanja[koordY][koordX-2] <= 0) return true;
						return false;
					} else {
						if (koordX > 0 && (koordY == 0 || this.state.stanja[koordY-1][koordX-1] <= 0) && this.state.stanja[koordY][koordX-1] <= 0 && this.state.stanja[koordY+1][koordX-1] <= 0 && this.state.stanja[koordY+2][koordX-1] <= 0) return true;
						return false;
					}
			        break;
			    case ('kvadrat'):
			        if (koordX > 0 && this.state.stanja[koordY][koordX-1] <= 0 && this.state.stanja[koordY+1][koordX-1] <= 0) return true;
					return false;
			        break;
			    case ('munja'):
			        if (orijentacija == 1) {
						if (koordX > 1 && this.state.stanja[koordY+1][koordX-2] <= 0 && this.state.stanja[koordY][koordX-1] <= 0) return true;
						return false;
					} else {
						if (koordX > 0 && (koordY == 0 || this.state.stanja[koordY-1][koordX-1] <= 0) && this.state.stanja[koordY][koordX-1] <= 0 && this.state.stanja[koordY+1][koordX] <= 0) return true;
						return false;
					}
			        break;
			    case ('obrnuta_munja'):
			        if (orijentacija == 1) {
						if (koordX > 1 && this.state.stanja[koordY][koordX-2] <= 0 && this.state.stanja[koordY+1][koordX-1] <= 0) return true;
						return false;
					} else {
						if (koordX > 1 && (koordY == 0 || this.state.stanja[koordY-1][koordX-1] <= 0) && this.state.stanja[koordY][koordX-2] <= 0 && this.state.stanja[koordY+1][koordX-2] <= 0) return true;
						return false;
					}
			        break;
			    case ('L-shape'):
			        switch (orijentacija) {
					    case (1):
					        if (koordX > 1 && this.state.stanja[koordY][koordX-2] <= 0 && this.state.stanja[koordY+1][koordX-2] <= 0) return true;
						    return false;
					        break;	
					    case (2):
					        if (koordX > 1 &&  (koordY == 0 || this.state.stanja[koordY-1][koordX-2] <= 0)  && this.state.stanja[koordY][koordX-1] <= 0 && this.state.stanja[koordY+1][koordX-1] <= 0) return true;
						    return false;
					        break;
					    case (3):
					        if (koordX > 1 && (koordY == 0 || this.state.stanja[koordY-1][koordX] <= 0) && this.state.stanja[koordY][koordX-2] <= 0) return true;
					        return false;
					        break;
					    case (4):
					        if (koordX > 0 && (koordY == 0 || this.state.stanja[koordY-1][koordX-1] <= 0)  && this.state.stanja[koordY][koordX-1] <= 0 && this.state.stanja[koordY+1][koordX-1] <= 0) return true;
						    return false;
					        break;
					    default:
					        alert("nesto1 je krivo sa orijentacijom");
					}
			        break;
			    case ('obrL-shape'):
			        switch (orijentacija) {
					    case (1):
					        if (koordX > 1 && this.state.stanja[koordY][koordX-2] <= 0 && this.state.stanja[koordY+1][koordX] <= 0) return true;
						    return false;
					        break;	
					    case (2):
					        if (koordX > 1 &&  (koordY == 0 || this.state.stanja[koordY-1][koordX-1] <= 0)  && this.state.stanja[koordY][koordX-1] <= 0 && this.state.stanja[koordY+1][koordX-2] <= 0) return true;
						    return false;
					        break;
					    case (3):
					        if (koordX > 1 && (koordY == 0 || this.state.stanja[koordY-1][koordX-2] <= 0) && this.state.stanja[koordY][koordX-2] <= 0) return true;
					        return false;
					        break;
					    case (4):
					        if (koordX > 0 && (koordY == 0 || this.state.stanja[koordY-1][koordX-1] <= 0)  && this.state.stanja[koordY][koordX-1] <= 0 && this.state.stanja[koordY+1][koordX-1] <= 0) return true;
						    return false;
					        break;
					    default:
					        alert("nesto1 je krivo sa orijentacijom");
					}
			        break;
			    case ('T-shape'):
			        switch (orijentacija) {
					    case (1):
					        if (koordX > 1 && this.state.stanja[koordY][koordX-2] <= 0 && this.state.stanja[koordY+1][koordX-1] <= 0) return true;
						    return false;
					        break;	
					    case (2):
					        if (koordX > 1 &&  (koordY == 0 || this.state.stanja[koordY-1][koordX-1] <= 0)  && this.state.stanja[koordY][koordX-2] <= 0 && this.state.stanja[koordY+1][koordX-1] <= 0) return true;
						    return false;
					        break;
					    case (3):
					        if (koordX > 1 && (koordY == 0 || this.state.stanja[koordY-1][koordX-1] <= 0) && this.state.stanja[koordY][koordX-2] <= 0) return true;
					        return false;
					        break;
					    case (4):
					        if (koordX > 0 && (koordY == 0 || this.state.stanja[koordY-1][koordX-1] <= 0)  && this.state.stanja[koordY][koordX-1] <= 0 && this.state.stanja[koordY+1][koordX-1] <= 0) return true;
						    return false;
					        break;
					    default:
					        alert("nesto1 je krivo sa orijentacijom");
					}
			        break;
			    default:
			        alert('Pogreska, ne postoji tip');	
			}
		} else {  // provjeravamo za desni pomak
			switch (tip) {
			    case ('I-shape'):
			        if (orijentacija == 1) {
						if (koordX < 9 && this.state.stanja[koordY][koordX+3] <= 0) return true;
						return false;
					} else {
						if (koordX < 11 && (koordY == 0 || this.state.stanja[koordY-1][koordX+1] <= 0) && this.state.stanja[koordY][koordX+1] <= 0 && this.state.stanja[koordY+1][koordX+1] <= 0 && this.state.stanja[koordY+2][koordX+1] <= 0) return true;
						return false;
					}
			        break;
			    case ('kvadrat'):
			        if (koordX < 10 && this.state.stanja[koordY][koordX+2] <= 0 && this.state.stanja[koordY+1][koordX+2] <= 0) return true;
					return false;
			        break;
			    case ('munja'):
			        if (orijentacija == 1) {
						if (koordX < 10 && this.state.stanja[koordY][koordX+2] <= 0 && this.state.stanja[koordY+1][koordX+1] <= 0) return true;
						return false;
					} else {
						if (koordX < 10 && (koordY == 0 || this.state.stanja[koordY-1][koordX+1] <= 0) && this.state.stanja[koordY][koordX+2] <= 0 && this.state.stanja[koordY+1][koordX+2] <= 0) return true;
						return false;
					}
			        break;
			    case ('obrnuta_munja'):
			        if (orijentacija == 1) {
						if (koordX < 10 && this.state.stanja[koordY][koordX+1] <= 0 && this.state.stanja[koordY+1][koordX+2] <= 0) return true;
						return false;
					} else {
						if (koordX < 11 && (koordY == 0 || this.state.stanja[koordY-1][koordX+1] <= 0) && this.state.stanja[koordY][koordX+1] <= 0 && this.state.stanja[koordY+1][koordX] <= 0) return true;
						return false;
					}
			        break;
			    case ('L-shape'):
			        switch (orijentacija) {
					    case (1):
					        if (koordX < 10 && this.state.stanja[koordY][koordX+2] <= 0 && this.state.stanja[koordY+1][koordX] <= 0) return true;
						    return false;
					        break;	
					    case (2):
					        if (koordX < 11 &&  (koordY == 0 || this.state.stanja[koordY-1][koordX+1] <= 0)  && this.state.stanja[koordY][koordX+1] <= 0 && this.state.stanja[koordY+1][koordX+1] <= 0) return true;
						    return false;
					        break;
					    case (3):
					        if (koordX < 10 && (koordY == 0 || this.state.stanja[koordY-1][koordX+2] <= 0) && this.state.stanja[koordY][koordX+2] <= 0) return true;
					        return false;
					        break;
					    case (4):
					        if (koordX < 10 &&  (koordY == 0 || this.state.stanja[koordY-1][koordX+1] <= 0)  && this.state.stanja[koordY][koordX+1] <= 0 && this.state.stanja[koordY+1][koordX+2] <= 0) return true;
						    return false;
					        break;
					    default:
					        alert("nesto1 je krivo sa orijentacijom");
					}
			        break;
			    case ('obrL-shape'):
			        switch (orijentacija) {
					    case (1):
					        if (koordX < 10 && this.state.stanja[koordY][koordX+2] <= 0 && this.state.stanja[koordY+1][koordX+2] <= 0) return true;
						    return false;
					        break;	
					    case (2):
					        if (koordX < 11 &&  (koordY == 0 || this.state.stanja[koordY-1][koordX+1] <= 0)  && this.state.stanja[koordY][koordX+1] <= 0 && this.state.stanja[koordY+1][koordX+1] <= 0) return true;
						    return false;
					        break;
					    case (3):
					        if (koordX < 10 && (koordY == 0 || this.state.stanja[koordY-1][koordX] <= 0) && this.state.stanja[koordY][koordX+2] <= 0) return true;
					        return false;
					        break;
					    case (4):
					        if (koordX < 10 &&  (koordY == 0 || this.state.stanja[koordY-1][koordX+2] <= 0)  && this.state.stanja[koordY][koordX+1] <= 0 && this.state.stanja[koordY+1][koordX+1] <= 0) return true;
						    return false;
					        break;
					    default:
					        alert("nesto1 je krivo sa orijentacijom");
					}
			        break;
			    case ('T-shape'):
			        switch (orijentacija) {
					    case (1):
					        if (koordX < 10 && this.state.stanja[koordY][koordX+2] <= 0 && this.state.stanja[koordY+1][koordX+1] <= 0) return true;
						    return false;
					        break;	
					    case (2):
					        if (koordX < 11 &&  (koordY == 0 || this.state.stanja[koordY-1][koordX+1] <= 0)  && this.state.stanja[koordY][koordX+1] <= 0 && this.state.stanja[koordY+1][koordX+1] <= 0) return true;
						    return false;
					        break;
					    case (3):
					        if (koordX < 10 && (koordY == 0 || this.state.stanja[koordY-1][koordX+1] <= 0) && this.state.stanja[koordY][koordX+2] <= 0) return true;
					        return false;
					        break;
					    case (4):
					        if (koordX < 10 && (koordY == 0 || this.state.stanja[koordY-1][koordX+1] <= 0)  && this.state.stanja[koordY][koordX+2] <= 0 && this.state.stanja[koordY+1][koordX+1] <= 0) return true;
						    return false;
					        break;
					    default:
					        alert("nesto1 je krivo sa orijentacijom");
					}
			        break;
			    default:
			        alert('Pogreska, ne postoji tip');	
			}
		}	
	}
	
	provjeriDoljeObjekt(KoordX, KoordY, Tip, Orijentacija) {  // vraca true ako se moze objekt pomaknuti prema dolje
		
		if (typeof KoordX == "undefined") {
			var {koordX, koordY, tip, orijentacija} = {...this.state.objekt};
			//console.log("nedefiniran je tip");
		} else {
		    var [koordX, koordY, tip, orijentacija] = [KoordX, KoordY, Tip, Orijentacija];
		    //console.log("ppodaci: " + koordX + " / " + koordY + " / " + tip + " / " + orijentacija);
		}
		switch (tip) {
			case "I-shape":
                if (koordY >= 19) return false;
                if (orijentacija == 1) {
			        if (this.state.stanja[koordY+1][koordX-1] <= 0 && this.state.stanja[koordY+1][koordX] <= 0 && this.state.stanja[koordY+1][koordX+1] <= 0 && this.state.stanja[koordY+1][koordX+2] <= 0) return true;
			        return false;
		        } else {
			        if (koordY >= 17) return false;
			        if (this.state.stanja[koordY+3][koordX] <= 0) return true;
			        return false;
		        }
		        break;
		    case "kvadrat":
		        if (koordY >= 18) return false;
		        if (this.state.stanja[koordY+2][koordX] <= 0 && this.state.stanja[koordY+2][koordX+1] <= 0) return true;
		        return false;
		    case "munja":
		        if (koordY >= 18) return false;
		        if (orijentacija == 1) {
			        if (this.state.stanja[koordY+2][koordX-1] <= 0 && this.state.stanja[koordY+2][koordX] <= 0 && this.state.stanja[koordY+1][koordX+1] <= 0) return true;
			        return false;
		        } else { 
			        if (this.state.stanja[koordY+1][koordX] <= 0 && this.state.stanja[koordY+2][koordX+1] <= 0) return true;
			        return false;
		        }
		        break;
		    case "obrnuta_munja":
		        if (koordY >= 18) return false;
		        if (orijentacija == 1) {
			        if (this.state.stanja[koordY+1][koordX-1] <= 0 && this.state.stanja[koordY+2][koordX] <= 0 && this.state.stanja[koordY+2][koordX+1] <= 0) return true;
			        return false;
		        } else { 
			        if (this.state.stanja[koordY+2][koordX-1] <= 0 && this.state.stanja[koordY+1][koordX] <= 0) return true;
			        return false;
		        }
		        break;
		    case "L-shape":
		        switch (orijentacija) {
					case 1:
					    if (koordY >= 18) return false;
					    if (this.state.stanja[koordY+2][koordX-1] <= 0 && this.state.stanja[koordY+1][koordX] <= 0 && this.state.stanja[koordY+1][koordX+1] <= 0) return true;
			            return false;
					    break;
					case 2:
					    if (koordY >= 18) return false;
					    if (this.state.stanja[koordY][koordX-1] <= 0 && this.state.stanja[koordY+2][koordX] <= 0) return true;
					    break;
					case 3:
					    if (koordY >= 19) return false;
					    if (this.state.stanja[koordY+1][koordX-1] <= 0 && this.state.stanja[koordY+1][koordX] <= 0 && this.state.stanja[koordY+1][koordX+1] <= 0) return true;
					    break;
					case 4:
					    if (koordY >= 18) return false;
					    if (this.state.stanja[koordY+2][koordX] <= 0 && this.state.stanja[koordY+2][koordX+1] <= 0) return true;
					    break;
					default:
					    alert("pogresna orijentacija");
				}
		        break;
		    case "obrL-shape":
		        switch (orijentacija) {
					case 1:
					    if (koordY >= 18) return false;
					    if (this.state.stanja[koordY+1][koordX-1] <= 0 && this.state.stanja[koordY+1][koordX] <= 0 && this.state.stanja[koordY+2][koordX+1] <= 0) return true;
			            return false;
					    break;
					case 2:
					    if (koordY >= 18) return false;
					    if (this.state.stanja[koordY+2][koordX-1] <= 0 && this.state.stanja[koordY+2][koordX] <= 0) return true;
					    break;
					case 3:
					    if (koordY >= 19) return false;
					    if (this.state.stanja[koordY+1][koordX-1] <= 0 && this.state.stanja[koordY+1][koordX] <= 0 && this.state.stanja[koordY+1][koordX+1] <= 0) return true;
					    break;
					case 4:
					    if (koordY >= 18) return false;
					    if (this.state.stanja[koordY+2][koordX] <= 0 && this.state.stanja[koordY][koordX+1] <= 0) return true;
					    break;
					default:
					    alert("pogresna orijentacija");
				}
		        break;
		    case "T-shape":
		        switch (orijentacija) {
					case 1:
					    if (koordY >= 18) return false;
					    if (this.state.stanja[koordY+1][koordX-1] <= 0 && this.state.stanja[koordY+2][koordX] <= 0 && this.state.stanja[koordY+1][koordX+1] <= 0) return true;
			            return false;
					    break;
					case 2:
					    if (koordY >= 18) return false;
					    if (this.state.stanja[koordY+1][koordX-1] <= 0 && this.state.stanja[koordY+2][koordX] <= 0) return true;
					    break;
					case 3:
					    if (koordY >= 19) return false;
					    if (this.state.stanja[koordY+1][koordX-1] <= 0 && this.state.stanja[koordY+1][koordX] <= 0 && this.state.stanja[koordY+1][koordX+1] <= 0) return true;
					    break;
					case 4:
					    if (koordY >= 18) return false;
					    if (this.state.stanja[koordY+2][koordX] <= 0 && this.state.stanja[koordY+1][koordX+1] <= 0) return true;
					    break;
					default:
					    alert("pogresna orijentacija");
				}
		        break;
		    default:
		        alert("cini se da imas pogresan tip u provjeri " + tip);
		}
	}

	
	nacrtajObjekt({tip, koordX, koordY, orijentacija, sw, sw1}) {
		//ova funkcija za sw true crta objekt dane orijentacije i danog tipa i koordinata, za false brise
		//za sw1=true crta projekciju, za false/faulty crta obican objekt
		var vr = 0;
		if (sw1) {
			if (sw) {
			    vr = -1;
			} else {
				vr = 0;
			}
		}
		//console.log("ucitane vrijednosti: "+ tip + " / " + koordX  + " / " + koordY + " / " + orijentacija  + " / " +sw);
		switch (tip) {
			case "I-shape":
			    if (sw && !sw1) vr = 2;
		   	    if (orijentacija == 1) {
					var elementi = [[koordX-1, koordY, vr],[koordX, koordY, vr],[koordX+1, koordY, vr],[koordX+2, koordY, vr]];
				} else {
					var elementi = [[koordX, koordY-1, vr],[koordX, koordY, vr],[koordX, koordY+1, vr],[koordX, koordY+2, vr]];
				}
				break;
			case "kvadrat":
			    if (sw && !sw1) vr = 1;
			    var elementi = [[koordX, koordY, vr],[koordX+1, koordY, vr],[koordX, koordY+1, vr],[koordX+1, koordY+1, vr]];
			    break;
			case "munja":
			    if (sw && !sw1) vr = 3;
		   	    if (orijentacija == 1) {
					var elementi = [[koordX-1, koordY+1, vr],[koordX, koordY+1, vr],[koordX, koordY, vr],[koordX+1, koordY, vr]];
				} else {
					var elementi = [[koordX, koordY-1, vr],[koordX, koordY, vr],[koordX+1, koordY, vr],[koordX+1, koordY+1, vr]];
				}
				break;
			case "obrnuta_munja":
			    if (sw && !sw1) vr = 4;
		   	    if (orijentacija == 1) {
					var elementi = [[koordX-1, koordY, vr],[koordX, koordY, vr],[koordX, koordY+1, vr],[koordX+1, koordY+1, vr]];
				} else {
					var elementi = [[koordX, koordY-1, vr],[koordX, koordY, vr],[koordX-1, koordY, vr],[koordX-1, koordY+1, vr]];
				}
				break;
		    case "L-shape":
		        if (sw && !sw1) vr = 5;
		        switch (orijentacija) {
					case 1:
					    var elementi = [[koordX-1, koordY+1, vr],[koordX-1, koordY, vr],[koordX, koordY, vr],[koordX+1, koordY, vr]];
					    break;
					case 2:
					    var elementi = [[koordX-1, koordY-1, vr],[koordX, koordY-1, vr],[koordX, koordY, vr],[koordX, koordY+1, vr]];
					    break;
					case 3:
					    var elementi = [[koordX-1, koordY, vr],[koordX, koordY, vr],[koordX+1, koordY, vr],[koordX+1, koordY-1, vr]];
					    break;
					case 4:
					    var elementi = [[koordX, koordY-1, vr],[koordX, koordY, vr],[koordX, koordY+1, vr],[koordX+1, koordY+1, vr]];
					    break;
					default:
					    alert("pogreska u tipu kod crtanja");    
				}
				break;
			case "obrL-shape":
		        if (sw && !sw1) vr = 6;
		        switch (orijentacija) {
					case 1:
					    var elementi = [[koordX-1, koordY, vr],[koordX, koordY, vr],[koordX+1, koordY, vr],[koordX+1, koordY+1, vr]];
					    break;
					case 2:
					    var elementi = [[koordX-1, koordY+1, vr],[koordX, koordY+1, vr],[koordX, koordY, vr],[koordX, koordY-1, vr]];
					    break;
					case 3:
					    var elementi = [[koordX-1, koordY-1, vr],[koordX-1, koordY, vr],[koordX, koordY, vr],[koordX+1, koordY, vr]];
					    break;
					case 4:
					    var elementi = [[koordX, koordY+1, vr],[koordX, koordY, vr],[koordX, koordY-1, vr],[koordX+1, koordY-1, vr]];
					    break;
					default:
					    alert("pogreska u tipu kod crtanja");    
				}
				break;
		    case "T-shape":
		        if (sw && !sw1) vr = 7;
		        switch (orijentacija) {
					case 1:
					    var elementi = [[koordX-1, koordY, vr],[koordX, koordY, vr],[koordX+1, koordY, vr],[koordX, koordY+1, vr]];
					    break;
					case 2:
					    var elementi = [[koordX-1, koordY, vr],[koordX, koordY, vr],[koordX, koordY-1, vr],[koordX, koordY+1, vr]];
					    break;
					case 3:
					    var elementi = [[koordX-1, koordY, vr],[koordX, koordY, vr],[koordX+1, koordY, vr],[koordX, koordY-1, vr]];
					    break;
					case 4:
					    var elementi = [[koordX, koordY-1, vr],[koordX, koordY, vr],[koordX, koordY+1, vr],[koordX+1, koordY, vr]];
					    break;
					default:
					    alert("pogreska u tipu kod crtanja");    
				}
				break;
			default:
			    alert("cini se da imas pogresan tip za crtanje " + tip);
		}
	
		if (sw1) {
			if (sw) {
			    elementi = elementi.filter((el) => {if (this.state.stanja[el[1]][el[0]] <= 0) return true; return false;});
			    //console.log("elementi koje pises:" + elementi);
			} else {
				elementi = elementi.filter((el) => {if (this.state.stanja[el[1]][el[0]] <= 0) return true; return false;});
				//console.log("elementi koje brises:" + elementi);
			}
		}
		this.promijeniPolje(elementi);
	}
	
	inicirajObjekt(tip) {
		switch (tip) {
			case "I-shape":
			    if (! this.provjeriMogucnostInicijalizacije([[4,0],[5,0],[6,0],[7,0]])) {
					this.gameOver();
					break;
				}
		        var noviObjekt = {tip: "I-shape", koordX: 5, koordY: 0, orijentacija: 1};
		        this.promijeniPolje([[4,0,2],[5,0,2],[6,0,2],[7,0,2]]);
		        this.setState({objekt: noviObjekt});
		        break;
		    case "kvadrat":
		        if (! this.provjeriMogucnostInicijalizacije([[5,0],[6,0],[5,1],[6,1]])) {
					this.gameOver();
					break;
				}
		        var noviObjekt = {tip: "kvadrat", koordX: 5, koordY: 0, orijentacija: 1};
		        this.promijeniPolje([[5,0,1],[6,0,1],[5,1,1],[6,1,1]]);
		        this.setState({objekt: noviObjekt});
		        break;    
		    case "munja":
		        if (! this.provjeriMogucnostInicijalizacije([[5,0],[6,0],[5,1],[4,1]])) {
					this.gameOver();
					break;
				}
		        var noviObjekt = {tip: "munja", koordX: 5, koordY: 0, orijentacija: 1};
		        this.promijeniPolje([[5,0,3],[6,0,3],[5,1,3],[4,1,3]]);
		        this.setState({objekt: noviObjekt});
		        break;    
		    case "obrnuta_munja":
		        if (! this.provjeriMogucnostInicijalizacije([[4,0],[5,0],[5,1],[6,1]])) {
					this.gameOver();
					break;
				}
		        var noviObjekt = {tip: "obrnuta_munja", koordX: 5, koordY: 0, orijentacija: 1};
		        this.promijeniPolje([[4,0,4],[5,0,4],[5,1,4],[6,1,4]]);
		        this.setState({objekt: noviObjekt});
		        break;   
		    case "L-shape":
		        if (! this.provjeriMogucnostInicijalizacije([[4,1],[4,0],[5,0],[6,0]])) {
					this.gameOver();
					break;
				}
		        var noviObjekt = {tip: "L-shape", koordX: 5, koordY: 0, orijentacija: 1};
		        this.promijeniPolje([[4,1,5],[4,0,5],[5,0,5],[6,0,5]]);
		        this.setState({objekt: noviObjekt});
		        break;   
		    case "obrL-shape":
		        if (! this.provjeriMogucnostInicijalizacije([[4,0],[5,0],[6,0],[6,1]])) {
					this.gameOver();
					break;
				}
		        var noviObjekt = {tip: "obrL-shape", koordX: 5, koordY: 0, orijentacija: 1};
		        this.promijeniPolje([[4,0,6],[5,0,6],[6,0,6],[6,1,6]]);
		        this.setState({objekt: noviObjekt});
		        break;    
		    case "T-shape":
		        if (! this.provjeriMogucnostInicijalizacije([[4,0],[5,0],[6,0],[5,1]])) {
					this.gameOver();
					break;
				}
		        var noviObjekt = {tip: "T-shape", koordX: 5, koordY: 0, orijentacija: 1};
		        this.promijeniPolje([[4,0,7],[5,0,7],[6,0,7],[5,1,7]]);
		        this.setState({objekt: noviObjekt});
		        break;        
		    default:
		        alert("pogreska sa unosom tipa");
		}
		this.projecirajObjekt();
	}
	
	promijeniPolje(podaci) {
		// ova funkcija uzima polje elemenata i mjenja stanje aplikacije. svaki element je polje 3 integera, 
		//[x, y, vr], pri cemu su x, y, koordinate, a vr je vrijednost boje.
		var rez = JSON.parse(JSON.stringify(this.state.stanja));
		for (let el of podaci) {
			if (el[1] >= 0 && el[1] <= 19 && el[0] >= 0 && el[0] <= 11) {
		        rez[el[1]][el[0]] = el[2];
		        //console.log("zamijena " + el[0] + ", " + el[1] + " - " + el[2]);
		    }
		}
		this.setState({stanja: rez});
	}
	
	provjeriMogucnostInicijalizacije(podaci) {
		// ova funkcija sluzi za provjeru da li je moguce inicijalizirati objekt. ako nije moguce vraca false 
		// sto znaci da je igra moguca, inace vraca true
		for (let el of podaci) {
			if (el[1] >= 0 && el[1] <= 19 && el[0] >= 0 && el[0] <= 11) {
		        if (this.state.stanja[el[1]][el[0]] > 0)  return false;
		    }
		}
		return true;
		
	}
	
	provjeriPuneLinije() {
		// ova funkcija pregledava redove displaya, i vraca polje redova koji su puni
		var rez = [];
		for (let i = 0; i < 20; i++) {
			let sw = true;
			for (let j = 0; j < 12; j++) {
				if (this.state.stanja[i][j] <= 0) {
					sw = false;
					break;
				}
			}
			if (sw)  rez.push(i);
		}
		return rez;
	}
	
	animirajPuneLinije(linije) {
		var pp = [];
		console.log("krenula animacije");
		for (let i = 0; i < linije.length; i++) {
			for (let j = 0; j < 12; j++) {
				pp.push([j, linije[i], 8]);
			}
		}
		console.log("krenula animacije " + pp);
		this.promijeniPolje(pp);
		this.zvuk.pusti(5);
		pp =  pp.map((el) => {return [el[0], el[1], 0]});
		
		setTimeout(()=>{
		    this.promijeniPolje(pp);
		    this.urusiPuneLinije(linije);	
			}, 500);
	}
	
	urusiPuneLinije(linije) {
		this.nacrtajObjekt({...this.state.objekt, sw: false});
		this.nacrtajObjekt({...this.state.projekcija, sw: false, sw1: true});
		var rez = JSON.parse(JSON.stringify(this.state.stanja));
		var redci = [];
		for (let i = linije.length-1; i > -1; i--) {
			rez.splice(linije[i],1);
			console.log("uklonio sam liniju " + linije[i]);
			redci.push([0,0,0,0,0,0,0,0,0,0,0,0]);
		}
		rez = redci.concat(rez);
		
		var brlin = this.state.brLinija;
		brlin += linije.length;
		var sco = this.state.score;
		sco += izracunajScore(this.state.level, this.state.score, linije.length);
		var lev = Math.floor(brlin / 10) + 1;
		this.vrijeme = 500 * 0.85**(lev-1);
		
		this.setState({stanja: rez, score: sco, brLinija: brlin, level: lev});
		this.nacrtajObjekt({...this.state.objekt, sw: true});
		this.projecirajObjekt();
		
		function izracunajScore(level, score, brlinija) {
            switch (brlinija) {
                case (1):
                    var baza = 40;
                    break;
                case (2):
                    var baza = 100;
                    break;
                case (3):
                    var baza = 300;
                    break;
                case (4):
                    var baza = 1200;
                    break;
           }
           //console.log("proracun " + level + " / " + baza + "");
           return level * baza;
       }
	}
	
	ugradiObjekt() {
		console.log("pune linije: " + this.provjeriPuneLinije());
	    let rr = this.provjeriPuneLinije();
		if (rr.length != 0)  this.animirajPuneLinije(rr);
			    
	    this.inicirajObjekt(this.state.nextObjects[0]);  // I-shape, kvadrat, munja, obrnuta_munja, L-shape, obrL-shape, T-shape
		this.sljedeciRandomObjekt();
	}
	
	autoRepeatFun(fun, arg) {
		fun(arg);
		this.ref1 = setTimeout(() => {
				this.autoRepeatFun(fun, arg);
			}, this.autoRepeat);
	}
	
	autoRepeatFun1(fun, arg) {
		fun(arg);
		this.ref2 = setTimeout(() => {
				this.autoRepeatFun1(fun, arg);
			}, this.autoRepeatV);
	}
	
	pritisakGumba(ev) {
		ev.preventDefault();
		console.log("upravo si pritisnuo gumb " + ev.code);
		switch (ev.code) {
			case "ArrowDown":
			    //this.spustiObjekt();
			    if (this.vertikalniPomak == "n") {
					this.vertikalniPomak = "d";
			        this.spustiObjekt();
			        this.ref2 = setTimeout(() => {
						this.autoRepeatFun1(this.spustiObjekt, "");
					}, this.autoDelayV);
				}
			    
			    break;
			case "ArrowLeft":
			    if (this.horizontalniPomak == "n") {
					this.horizontalniPomak = "l";
			        this.pomakniUStranuObjekt("l");
			        this.ref1 = setTimeout(() => {
						this.autoRepeatFun(this.pomakniUStranuObjekt, "l");
					}, this.autoDelay);
				}
			    break;
			case "ArrowRight":
			    if (this.horizontalniPomak == "n") {
					this.horizontalniPomak = "r";
			        this.pomakniUStranuObjekt("r");
			        this.ref1 = setTimeout(() => {
						this.autoRepeatFun(this.pomakniUStranuObjekt, "r");
					}, this.autoDelay);
				}
			    break;
			case "ArrowUp":
			    if (this.rotirajSw) {
					this.rotirajSw = false;
			        this.rotirajObjekt();    
				}
			    break;
			case "KeyZ":
			    if (this.rotirajSw) {
					this.rotirajSw = false;
			        this.rotirajObjekt(true);    
				}
			    break;
			case "KeyD":
			    this.ugradiObjekt();
		        break;
		    case "Space":
		        this.brzoSpustiObjekt();
		        break;
		    case "KeyG":
			    this.gameOver();
			    break;
		}
	}
	
	pritisakGumbaUp(ev) {
		console.log("upravo si otpustio gumb " + ev.code);
		switch (ev.code) {
			case "ArrowDown":
			    if (this.vertikalniPomak == "d") {
					this.vertikalniPomak = "n";
			        clearTimeout(this.ref2);
				}
			    break;  
			case "ArrowLeft":
			    if (this.horizontalniPomak == "l") {
					this.horizontalniPomak = "n";
			        clearTimeout(this.ref1);
				}
			    break;    
			case "ArrowRight":
			    if (this.horizontalniPomak == "r") {
					this.horizontalniPomak = "n";
			        clearTimeout(this.ref1);
				}
			    break;
			case "ArrowUp":
			    if (!this.rotirajSw)  this.rotirajSw = true;
			    break;
			case "KeyZ":
			    if (!this.rotirajSw)  this.rotirajSw = true;
			    break;
		}
	}
}


ReactDOM.render(
    <Aplikacija/>,
    document.querySelector("#root")
)


