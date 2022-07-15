let quotes = {
  changeQuotebtn: document.querySelector(".change-quote"),
  quoteEl: document.querySelector(".quote"),
  authorEl: document.querySelector(".author"),
  dbQuotes: [],

  getQuotes(url = "db.json") {
    const quotes = url;
    fetch(quotes)
      .then((res) => res.json())
      .then((data) => {
        this.dbQuotes = data;
        //console.log(this.dbQuotes);
        this.viewQuotes();
      });
  },

  viewQuotes() {
    const quote =
      this.dbQuotes[Math.floor(Math.random() * this.dbQuotes.length)];
    this.quoteEl.innerHTML = quote.text;
    this.authorEl.innerHTML = quote.author;
    return quote;
  },

  init(url = "db.json") {
    this.getQuotes(url);
    this.changeQuotebtn.onclick = () => this.viewQuotes();
  },
};
