quotes = {
  changeQuotebtn:document.querySelector(".change-quote"),
  quoteEl:document.querySelector(".quote"),
  authorEl:document.querySelector(".author"),
  dbQuotes:[],
  
  getQuotes() {
    const quotes = 'db.json';
    fetch(quotes)
      .then(res => res.json())
      .then(data => { 
        this.dbQuotes=data;
        //console.log(this.dbQuotes);
        this.viewQuotes();
      });
  },

  viewQuotes(){
    const quote = this.dbQuotes[Math.floor(Math.random()*this.dbQuotes.length)];
    this.quoteEl.innerHTML=quote.text;
    this.authorEl.innerHTML=quote.author;
    return quote
  },

  init(){
    this.getQuotes();
    this.changeQuotebtn.onclick=()=>this.viewQuotes();
  }
}

quotes.init();
