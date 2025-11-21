document.addEventListener("DOMContentLoaded", () => {
    const listaCarrinhoDiv = document.getElementById("listaCarrinho");
    const totalSpan = document.getElementById("totalCompra");
    const btnFinalizar = document.getElementById("btnFinalizar");

    // Carrega o carrinho
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    function atualizarCarrinho() {
        listaCarrinhoDiv.innerHTML = "";

        if (carrinho.length === 0) {
            listaCarrinhoDiv.innerHTML = "<p>Seu carrinho está vazio.</p>";
            totalSpan.textContent = "0,00";
            return;
        }

        let total = 0;

        carrinho.forEach((item, index) => {
            // Aceita nome ou título
            const nomeLivro = item.nome || item.titulo || "Livro sem nome";

            // Aceita preco ou valor
            const precoLivro = parseFloat(item.preco || item.valor || 0);

            total += precoLivro;

            const div = document.createElement("div");
            div.classList.add("carrinho-item");

            div.innerHTML = `
                <p><strong>${nomeLivro}</strong></p>
                <p>R$ ${precoLivro.toFixed(2)}</p>
                <button class="btn-remover" data-index="${index}">Remover</button>
            `;

            listaCarrinhoDiv.appendChild(div);
        });

        totalSpan.textContent = total.toFixed(2);
    }

    // Remover item
    listaCarrinhoDiv.addEventListener("click", (event) => {
        if (event.target.classList.contains("btn-remover")) {
            const index = event.target.getAttribute("data-index");
            carrinho.splice(index, 1);

            localStorage.setItem("carrinho", JSON.stringify(carrinho));
            atualizarCarrinho();
        }
    });

    // Finalizar compra
    btnFinalizar.addEventListener("click", () => {
        if (carrinho.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }

        alert("Compra finalizada com sucesso! Obrigado pela preferência.");

        localStorage.removeItem("carrinho");
        carrinho = [];

        atualizarCarrinho();
    });

    atualizarCarrinho();
});
