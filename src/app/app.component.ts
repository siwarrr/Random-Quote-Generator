import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'RandomQuote';
  quote: string = '';
  author: string = '';
  colors: string[] = ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f39c12', '#16a085', '#34495e']

  constructor(private renderer: Renderer2){}

  ngOnInit() {
    this.fetchNewQuote();
  }

  async fetchNewQuote() {
    try {
      const response = await fetch('assets/quotes.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const quotes = await response.json();
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      this.quote = randomQuote.text;
      this.author = randomQuote.author || 'Unknown';
      this.changeColor();
    } catch (error) {
      console.error('Error retrieving quote:', error);
      this.quote = 'Failed to fetch a quote';
      this.author = '';
    }
  }

  changeColor() {
    const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];

    this.renderer.setStyle(document.getElementById('body'), 'background-color', randomColor);
    this.renderer.setStyle(document.getElementById('text'), 'color', randomColor);
    this.renderer.setStyle(document.getElementById('author'), 'color', randomColor);
    this.renderer.setStyle(document.getElementById('tweet-quote'), 'background-color', randomColor);
    this.renderer.setStyle(document.getElementById('new-quote'), 'background-color', randomColor)
  }

}
