// js/catalogo.js
document.addEventListener("DOMContentLoaded", () => {

    const produtosDiv = document.getElementById("produtos");

    // -----------------------------
    // CARREGAR PRODUTOS (sem recriar se já existirem)
    // -----------------------------
    function carregarProdutos() {
        let produtos = JSON.parse(localStorage.getItem("produtos"));

        // Se não existir nada no localStorage → cria os 50 livros padrão
        if (!Array.isArray(produtos)) {
            produtos = [];
            for (let i = 1; i <= 50; i++) {
                produtos.push({
                    id: i,
                    nome: `Livro ${i}`,
                    preco: Number((Math.random() * 80 + 20).toFixed(2))
                });
            }
            localStorage.setItem("produtos", JSON.stringify(produtos));
        }

        return produtos;
    }

    // Evita quebra de HTML
    function escapeHtml(str) {
        return String(str).replace(/[&<>"]/g, (c) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;'
        }[c]));
    }

    // -----------------------------
    // RENDERIZAR CATÁLOGO
    // -----------------------------
    function renderizarCatalogo() {
        const produtos = carregarProdutos();
        produtosDiv.innerHTML = "";

        produtos.forEach(prod => {
            const card = document.createElement("div");
            card.classList.add("produto-card");

            card.innerHTML = `
                <h3>${escapeHtml(prod.nome)}</h3>
                <p class="preco">R$ ${Number(prod.preco).toFixed(2)}</p>
                <button class="btn-add" data-id="${prod.id}">Adicionar ao Carrinho</button>
            `;

            produtosDiv.appendChild(card);
        });
    }

    // -----------------------------
    // ADICIONAR AO CARRINHO
    // -----------------------------
    produtosDiv.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-add")) {
            const id = Number(e.target.dataset.id);
            const produtos = carregarProdutos();
            const produto = produtos.find(p => p.id === id);

            if (!produto) return alert("Produto não encontrado.");

            let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

            carrinho.push({
                id: produto.id,
                nome: produto.nome,
                preco: Number(produto.preco)
            });

            localStorage.setItem("carrinho", JSON.stringify(carrinho));
            window.dispatchEvent(new CustomEvent('carrinhoUpdated'));

            alert(`"${produto.nome}" adicionado ao carrinho!`);
        }
    });

    // -----------------------------
    // ATUALIZA EM TEMPO REAL QUANDO ADMIN ALTERA
    // -----------------------------
    window.addEventListener('produtosUpdated', renderizarCatalogo);

    window.addEventListener('storage', (e) => {
        if (e.key === 'produtos') renderizarCatalogo();
    });

    // Inicializa catálogo
    renderizarCatalogo();
});
