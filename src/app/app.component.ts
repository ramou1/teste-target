import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.carregarFaturamento();
  }


  //Questão 2
  numero: number = 0;
  mensagem: string = '';

  verificarFibonacci() {
    const pertence = this.isFibonacci(this.numero);
    this.mensagem = pertence
      ? `O número ${this.numero} pertence à sequência de Fibonacci.`
      : `O número ${this.numero} não pertence à sequência de Fibonacci.`;
  }

  isFibonacci(num: number): boolean {
    if (num < 0) return false;
    let a = 0;
    let b = 1;
    while (a <= num) {
      if (a === num) return true;
      [a, b] = [b, a + b];
    }
    return false;
  }

  // Questão 3
  faturamentoMensal: any[] = [];
  menorFaturamento: number = 0;
  maiorFaturamento: number = 0;
  diasAcimaMedia: number = 0;

  carregarFaturamento() {
    this.http.get<any[]>('assets/dados.json').subscribe(data => {
      this.faturamentoMensal = data;
    });
  }

  calcularFaturamento() {
    const diasUteis = this.faturamentoMensal.filter((item) => item.valor > 0);
    const totalFaturamento = diasUteis.reduce((acc, curr) => acc + curr.valor, 0);
    const mediaFaturamento = totalFaturamento / diasUteis.length;

    this.menorFaturamento = Math.min(...diasUteis.map((item) => item.valor));
    this.maiorFaturamento = Math.max(...diasUteis.map((item) => item.valor));
    this.diasAcimaMedia = diasUteis.filter((item) => item.valor > mediaFaturamento).length;
  }

  // Questão 4
  faturamento: any[] = [
    { estado: 'SP', valor: 67836.43 },
    { estado: 'RJ', valor: 36678.66 },
    { estado: 'MG', valor: 29229.88 },
    { estado: 'ES', valor: 27165.48 },
    { estado: 'Outros', valor: 19849.53 },
  ];

  calcularPercentual() {
    const total = this.faturamento.reduce((acc, curr) => acc + curr.valor, 0);
    return this.faturamento.map(estado => ({
      ...estado, percentual: (estado.valor / total) * 100
    }));
  }

  // Questão 5
  string: string = '';
  resultado: string = '';

  inverterString() {
    this.resultado = '';
    for (let i = this.string.length - 1; i >= 0; i--) {
      this.resultado += this.string[i];
    }
  }
}
