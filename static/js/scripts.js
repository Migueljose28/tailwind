// Selecionar o botão, o sidebar e o conteúdo
const sidebarToggle = document.getElementById('sidebar_button');
const sidebar = document.getElementById('sidebar-multi-level-sidebar');

sidebarToggle.addEventListener('click', (event) => {
  sidebar.classList.toggle('-translate-x-full');
});
document.addEventListener('click', (event) => {
  if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
    sidebar.classList.add('-translate-x-full');
  }
});


//Dorpdown banco_de_talento
document.getElementById("dropdown-button_banco_de_talento").addEventListener("click", () => {
    const dropdown = document.getElementById("dropdown_banco_de_talento");
    dropdown.classList.toggle("hidden");
  });
  








async function verificarAutenticacao() {
  const token = localStorage.getItem("token"); // Obtém o token do localStorage
  
  if (!token) {
    //alert("Você precisa fazer login!");
    //window.location.href = "login.html"; // Redireciona para a página de login
    return;
  }

  // Verificar se o token é válido (opcional, recomendado)
  try {
    const response = await fetch("http://127.0.0.1:8000/auth/protected", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error("Token inválido");
    }

    console.log("Usuário autenticado!");
  } catch (error) {
    //alert("Sessão expirada. Faça login novamente.");
    localStorage.removeItem("token");
    window.location.href = "login.html"; // Redireciona para login
  }
}




function logout(){
  
  localStorage.removeItem("token");
  window.location.href = "login.html"; 
}

// Chama a função quando a página carregar
window.onload = verificarAutenticacao;


let valor = 0;
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';
var pdfDoc = null;
var totalPages = 0;
var container = document.getElementById('pdf-container');
var pdf = "pdf"

function atualizarValor(valor) {
 document.getElementById('displayValor').textContent = valor;
  limpandoContainer()
 
  loadPDF(`/static/${pdf}/${valor}.pdf`);
};

function valueByinput() {
    value = document.getElementById("imput_value").value;
    if (value  == 'NaN' ){
         valor = 0;
        
    }else{
         valor = parseInt(value);  // Atualiza a variável 'valor' com o valor do textarea
     }
      atualizarValor(valor)  // Exibe o valor atualizado
 };
 
// Função para carregar o PDF
function loadPDF(pdfUrl) {
 
  pdfjsLib.getDocument(pdfUrl).promise.then(function(pdfDoc_) {
    pdfDoc = pdfDoc_;
    totalPages = pdfDoc.numPages;
    renderPages(totalPages); // Começar a renderizar todas as páginas
  });
};




// Função para renderizar todas as páginas corretamente
function renderPages(totalPages) {
  // Renderiza as páginas da primeira até a última
  for (var i = 1; i <= totalPages; i+=1) {
     renderPage(i); // Renderiza a página i
}
};

// Função para renderizar uma página individualmente
function renderPage(pageNum) {
  pdfDoc.getPage(pageNum).then(function(page) {
    var canvas = document.createElement('canvas'); // Cria um canvas para cada página
    var ctx = canvas.getContext('2d');
    var viewport = page.getViewport({ scale: 1.2 }); // Ajuste de escala
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Renderiza a página no canvas
    var renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    page.render(renderContext).promise.then(function() {
      // Adiciona o canvas ao container após renderizar
      container.appendChild(canvas);
    });
  });
};

function limpandoContainer() {
  container.innerHTML = '';
};


// Função para diminuir
function decrementar() {
if (valor == 0) {
        valor = 0;}
else{
 valor -= 1;
}
 atualizarValor(valor);
};

function incrementar() {
 valor += 1;
 atualizarValor(valor);

};


// Bloquear o clique direito no canvas
document.getElementById('pdf-container').addEventListener('contextmenu', function(event) {
    event.preventDefault();  // Impede a ação padrão (abrir o menu de contexto)
    return false;
   });
   
   document.addEventListener("keydown", function(event) {
       if (event.ctrlKey && event.key === "p") {
         event.preventDefault(); // Impede a ação padrão
         alert("A impressão desta página foi desativada!");
       }
     });

     document.getElementById("select").addEventListener("change", function () {
        const valorSelecionado = this.value;
        const textoSelecionado = this.options[this.selectedIndex].text;

        if (valorSelecionado === "1") {
           pdf = "pdf"
            return pdf;
        } else if (valorSelecionado === "3") {
           
            return null;
        } else if (valorSelecionado === "4") {
            pdf = "CS CLUB"
            return pdf



        } else if (valorSelecionado === "5") {
            console.log("Sair selecionado, retornando null.");
            return logout();
        }});

        document.addEventListener("DOMContentLoaded", function(){
          valor = 0;
          atualizarValor(valor);
     })
     