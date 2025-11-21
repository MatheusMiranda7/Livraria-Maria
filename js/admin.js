// js/admin.js — versão SEM gráficos e com busca/edição totalmente funcional
document.addEventListener("DOMContentLoaded", () => {

    // ----- ELEMENTOS -----
    const tabelaProdutos = document.getElementById("tabelaProdutos");
    const buscaInput = document.getElementById("buscaInput");
    const precoMinInput = document.getElementById("precoMin");
    const precoMaxInput = document.getElementById("precoMax");
    const btnFiltrar = document.getElementById("btnFiltrar");
    const btnOpenModal = document.getElementById("btnOpenModal");
    const btnReset = document.getElementById("btnReset");

    const modal = document.getElementById("modalProduto");
    const modalTitulo = document.getElementById("modalTitulo");
    const inputNome = document.getElementById("inputNome");
    const inputPreco = document.getElementById("inputPreco");
    const btnSalvar = document.getElementById("btnSalvar");
    const btnCancelar = document.getElementById("btnCancelar");


    // ----- CARREGA PRODUTOS -----
    let produtos = JSON.parse(localStorage.getItem("produtos"));

    // Se não existir lista ainda → cria os 50 livros
    if (!Array.isArray(produtos) || produtos.length === 0) {
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

    function salvarProdutos() {
        localStorage.setItem("produtos", JSON.stringify(produtos));
        window.dispatchEvent(new CustomEvent("produtosUpdated"));
    }


    // ----- RENDERIZAÇÃO -----
    function gerarLinha(prod) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${prod.id}</td>
            <td>${prod.nome}</td>
            <td>R$ ${prod.preco.toFixed(2)}</td>
            <td>
                <button class="btn-edit" data-id="${prod.id}">Editar</button>
                <button class="btn-delete" data-id="${prod.id}">Excluir</button>
            </td>
        `;
        return tr;
    }

    function renderTabela(lista = produtos) {
        tabelaProdutos.innerHTML = "";
        lista.forEach(p => tabelaProdutos.appendChild(gerarLinha(p)));
    }


    // ----- FILTROS -----
    function aplicarFiltros() {
        let lista = [...produtos];

        const termo = buscaInput.value.trim().toLowerCase();
        const min = Number(precoMinInput.value);
        const max = Number(precoMaxInput.value);

        if (termo) {
            lista = lista.filter(p => p.nome.toLowerCase().includes(termo));
        }
        if (!isNaN(min)) {
            lista = lista.filter(p => p.preco >= min);
        }
        if (!isNaN(max)) {
            lista = lista.filter(p => p.preco <= max);
        }

        renderTabela(lista);
    }


    // ----- BOTÕES -----
    btnFiltrar.addEventListener("click", aplicarFiltros);

    btnOpenModal.addEventListener("click", () => {
        modalTitulo.textContent = "Adicionar Produto";
        inputNome.value = "";
        inputPreco.value = "";
        modal.dataset.editId = "";
        modal.style.display = "flex";
    });

    btnCancelar.addEventListener("click", () => {
        modal.style.display = "none";
    });


    // ----- EDITAR / EXCLUIR -----
    tabelaProdutos.addEventListener("click", (e) => {
        const id = Number(e.target.dataset.id);

        if (e.target.classList.contains("btn-edit")) {
            const p = produtos.find(prod => prod.id === id);

            modal.dataset.editId = id;
            modalTitulo.textContent = "Editar Produto";
            inputNome.value = p.nome;
            inputPreco.value = p.preco;
            modal.style.display = "flex";

        } else if (e.target.classList.contains("btn-delete")) {
            if (!confirm("Excluir este produto?")) return;

            produtos = produtos.filter(p => p.id !== id);
            salvarProdutos();
            aplicarFiltros();
        }
    });


    // ----- SALVAR (NOVO OU EDITADO) -----
    btnSalvar.addEventListener("click", () => {
        const nome = inputNome.value.trim();
        const preco = Number(inputPreco.value);

        if (!nome || isNaN(preco) || preco <= 0) {
            alert("Preencha nome e preço válidos.");
            return;
        }

        const editId = modal.dataset.editId;

        if (editId) {
            const p = produtos.find(prod => prod.id === Number(editId));
            p.nome = nome;
            p.preco = Number(preco.toFixed(2));
        } else {
            const novoId = produtos.length ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
            produtos.push({
                id: novoId,
                nome,
                preco: Number(preco.toFixed(2))
            });
        }

        salvarProdutos();
        modal.style.display = "none";
        aplicarFiltros();
    });


    // ----- RESET -----
    btnReset.addEventListener("click", () => {
        if (!confirm("Resetar para 50 livros padrão?")) return;

        produtos = [];
        for (let i = 1; i <= 50; i++) {
            produtos.push({
                id: i,
                nome: `Livro ${i}`,
                preco: Number((Math.random() * 80 + 20).toFixed(2))
            });
        }

        salvarProdutos();
        aplicarFiltros();
    });


    // ----- SINCRONIZAR COM OUTRAS PÁGINAS -----
    window.addEventListener("produtosUpdated", () => {
        produtos = JSON.parse(localStorage.getItem("produtos"));
        aplicarFiltros();
    });

    window.addEventListener("storage", () => {
        produtos = JSON.parse(localStorage.getItem("produtos"));
        aplicarFiltros();
    });

    aplicarFiltros();
});
