import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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

  string: string = '';
  resultado: string = '';

  inverterString() {
    this.resultado = '';
    for (let i = this.string.length - 1; i >= 0; i--) {
      this.resultado += this.string[i];
    }
  }
}
