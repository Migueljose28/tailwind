window.onload = function() {
  setTimeout(function() {
      document.body.style.opacity = 1;
  }, 1000); // Atraso de 1 segundo
};








document.getElementById("loginForm").addEventListener("submit", async function (event) {
  event.preventDefault(); // Impede o envio tradicional do formulário
  
  const formData = new URLSearchParams();
  formData.append("username", document.getElementById("nomeForm").value);
  formData.append("password", document.getElementById("senhaForm").value);
 

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/token/", {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData
      });
  
      if (!response.ok) {
        throw new Error("Usuário inexistente ou senha incorreta");
      }
  
      const data = await response.json();
  
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        console.log("Token salvo:", localStorage.getItem("token"));
        window.location.href = "main.html";
      } else {
        throw new Error("Token não recebido. Verifique o servidor.");
      }
  
    } catch (error) {
      console.error("Erro:", error.message);
      document.getElementById("alert").innerHTML = error.message;
      document.getElementById("box-alert").style.display = "flex";
    }
  }
  
  );


 
  // Função para fazer login e obter o token
  const loginAndGetToken = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username:  nome,  // Nome de usuário que você criou
          password: senha,    // Senha
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const token = data.access_token;
        console.log('Token gerado:', token);
  
        // Agora que você tem o token, pode usá-lo para acessar rotas protegidas
        getProtectedData(token);
      } else {
        const errorData = await response.json();
        console.log('Erro ao obter token:', errorData);
      }
    } catch (error) {
      console.error('Erro na requisição de login:', error);
    }
  };



function close_box_message(){
    document.getElementById("box-alert").style.display = "none";
}


document.getElementById("exibirpassword").addEventListener("click", function () {
  event.preventDefault();
  const passwordField = document.getElementById("senhaForm");
  if (passwordField.type === "password") {
      passwordField.type = "text";
      this.innerHTML = `<svg class="size-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
      <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
      <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
      <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
  </svg>`;
  } else {
      passwordField.type = "password";
      this.innerHTML = `<svg  class="size-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
  <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
</svg>
`;
}});
