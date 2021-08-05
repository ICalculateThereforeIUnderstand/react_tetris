class Zvuk {
	constructor(volume=1) {
		this.volume = volume;
		
		this.volume = this.logVolume(volume)/100;
		
		this.zvukovi = ["zvuk_rotacija.mp3", "zvuk_vertikalni_pomak1.mp3", "zvuk_brzog_pada.mp3", "zvuk_pada.mp3", "zvuk_game_over.mp3", "zvuk_ponistenja_retka.mp3", "zvuk_brzog_pada.mp3", "zvuk_rotacija1.mp3", "zvuk_pada1.mp3", "zvuk_game_over1.mp3"];
		this.zvukovi = this.zvukovi.map((el) => (this.ucitaj_zvuk(el)));
        //console.log("zvukovi: " + this.zvukovi[0]());
        this.pusti = this.pusti.bind(this);
        
	}
	
	logVolume(x) {
		if (x == 0) return 0;
		return Math.exp(5.116 * (x-0.1));
	}
	
	pusti(broj) {
		this.zvukovi[broj]();
	}
	
	ucitaj_zvuk(file) {
        var count = 0;
        var br = 10;
        var polje = [];
        var a = null;
        for (var i = 0; i < br; i++) {
			a = new Audio(file);
			a.volume = this.volume;
            polje.push(a);
        }
    
        function fun() {
            polje[count%br].play();
            count++;
        }
        return fun;
    }
	
}

export default Zvuk;
