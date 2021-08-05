  
window.onload = function () {
  const btn_submit = document.querySelector('.btn-success-form');
  const ajax = new XMLHttpRequest();

  const isCompoundName = (name) => {
    return name.trim().split(' ').length > 1;
  }

  const isValidEmail = (email) => {
    const verify = /\S+@\S+\.\S+/;
    return verify.test(email);
  }

  const salvarCliente = async ({nome, email}) => {
    const dadosRequisicao = new Request("https://api.programandosolucoes.com/doc/despachante/criar", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({nome, email}),
    });
    try {
      const response = await fetch(dadosRequisicao);
      response.json().then((result) => {
        if (response.status === 200) {
          return alert(result.sucess);
        }
        return alert(result.error);
      });
    } catch (erro) {
      console.log(erro);
      alert(erro);
    }
  };
  
  btn_submit.addEventListener('click', function () {
    const nome = document.querySelector('.nome').value;
    const email = document.querySelector('.email').value;

    if(!isCompoundName(nome)){
      return alert('O nome inserido é inválido')
    }
    if(!isValidEmail(email)){
      return alert('O email inserido é inválido')
    }    
    salvarCliente({nome, email});
  });
}