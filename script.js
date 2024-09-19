
class ArquivoCSV {
    constructor(nome, dados) {
      this.nome = nome;
      this.dados = dados;
    }
  
    lerDados() {
      const csvArray = this.dados.split('\n').map((row) => row.split(','));
      const headers = csvArray.shift();
  
      console.log(`Dados do arquivo ${this.nome}:`);
      console.log(csvArray);
  
      return csvArray;
    }
  }
  
  class LeitorCSV {
    constructor(arquivoCSV) {
      this.arquivoCSV = arquivoCSV;
    }
  
    lerArquivo() {
      const reader = new FileReader();
  
      reader.onload = () => {
        const csvData = reader.result;
        const arquivo = new ArquivoCSV(this.arquivoCSV.name, csvData);
        const dados = arquivo.lerDados();
  
        // Adiciona os dados ao elemento correspondente
        switch (this.arquivoCSV.name) {
          case 'livros-1.csv':
            document.getElementById('livros-data').innerHTML = '';
            dados.forEach((row) => {
              document.getElementById('livros-data').innerHTML += `${row.join(', ')}<br>`;
            });
            break;
          case 'autores.csv':
            document.getElementById('autores-data').innerHTML = '';
            dados.forEach((row) => {
              document.getElementById('autores-data').innerHTML += `${row.join(', ')}<br>`;
            });
            break;
          case 'estudantes.csv':
            document.getElementById('estudantes-data').innerHTML = '';
            dados.forEach((row) => {
              document.getElementById('estudantes-data').innerHTML += `${row.join(', ')}<br>`;
            });
            break;
          case 'emprestimo.csv':
            document.getElementById('emprestimos-data').innerHTML = '';
            dados.forEach((row) => {
              document.getElementById('emprestimos-data').innerHTML += `${row.join(', ')}<br>`;
            });
            break;
          default:
            console.log('Arquivo não reconhecido');
        }
      };
  
      reader.readAsText(this.arquivoCSV);
    }
  }
  
  document.getElementById('formCSV').addEventListener('submit', (e) => {
    e.preventDefault();
    const arquivoCSV = document.getElementById('arquivoCSV').files[0];
    const leitorCSV = new LeitorCSV(arquivoCSV);
    leitorCSV.lerArquivo();
  });
  document.getElementById('arquivoCSV').addEventListener('change', function() {
    const fileName = this.files.length > 0 ? this.files[0].name : 'Nenhum arquivo selecionado';
    const label = document.getElementById('fileLabel');
    label.textContent = fileName;

    if (this.files.length > 0) {
        label.classList.add('selected');
    } else {
        label.classList.remove('selected');
    }
});

document.getElementById('formCSV').addEventListener('submit', function(event) {
    event.preventDefault();

    console.log("Arquivo enviado!");

    const inputFile = document.getElementById('arquivoCSV');
    const label = document.getElementById('fileLabel');

    inputFile.value = ''; 
    label.textContent = 'Escolher arquivo';
    label.classList.remove('selected');
});