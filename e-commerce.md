# Livraria Maria

## Integrantes do Grupo
- Nome: Matheus Miranda ferreira

## URL de acesso ao repositório de código-fonte
- Repositório encontra-se na pasta .zip anexada


---

# Sumário
1. [Introdução](#introdução)  
2. [Objetivos do Projeto](#objetivos-do-projeto)  
   2.1 [Objetivos Funcionais](#objetivos-funcionais)  
   2.2 [Objetivos Não-Funcionais](#objetivos-não-funcionais)  
3. [Casos de Uso](#casos-de-uso)  
   3.1 [Diagrama de Casos de Uso](#diagrama-de-casos-de-uso)  
   3.2 [Descrição detalhada dos Casos de Uso](#descrição-detalhada-dos-casos-de-uso)  
4. [Protótipos de Tela](#protótipos-de-tela)  
5. [Modelo de Domínio](#modelo-de-domínio)  
6. [Diagramas de Classes](#diagramas-de-classes)  
7. [Diagramas de Sequência](#diagramas-de-sequência)  
8. [Conclusão](#conclusão)  
9. [Referências](#referências)  

---

# Lista de Figuras
- Figura 1 – Diagrama de Casos de Uso  
- Figura 2 – Protótipos de Tela  
- Figura 3 – Modelo de Domínio  
- Figura 4 – Diagrama de Classes  
- Figura 5 – Diagramas de Sequência  

# Lista de Tabelas
- Tabela 1 – Entidades, atributos e relacionamentos do sistema  

---

# Introdução
O projeto **Livraria Maria** tem como objetivo desenvolver um sistema de gerenciamento de uma livraria digital, incluindo funcionalidades para clientes, administradores e integração com serviços externos de pagamento e entrega.

---

# Objetivos do Projeto

## Objetivos Funcionais
- Permitir que clientes realizem cadastro e login no sistema.  
- Permitir que clientes façam pedidos de livros.  
- Permitir que clientes façam avaliações de produtos.  
- Permitir que administradores gerenciem produtos e categorias.  
- Gerenciar pagamentos e entregas de pedidos.  

## Objetivos Não-Funcionais
- Sistema seguro, garantindo proteção dos dados dos clientes.  
- Sistema responsivo, funcionando em desktops e dispositivos móveis.  
- Alta disponibilidade e confiabilidade.  
- Interface intuitiva e de fácil uso.  

---

# Casos de Uso


## Diagrama de Casos de Uso
Anexado no arquivo .zip


## Descrição detalhada dos Casos de Uso
| Caso de Uso       | Ator Principal      | Descrição                                 | Fluxo Principal                                      | Fluxo Alternativo                   |
|------------------|-------------------|-------------------------------------------|----------------------------------------------------|------------------------------------|
| Fazer Pedido      | Cliente           | O cliente seleciona produtos e finaliza um pedido | 1. Cliente seleciona produtos → 2. Confirma pedido → 3. Sistema registra pedido | Cliente cancela pedido antes de confirmar |
| Avaliar Produto   | Cliente           | Cliente envia avaliação de produto        | 1. Cliente seleciona produto → 2. Submete avaliação | Avaliação inválida (nota fora do intervalo) |
| Gerenciar Produtos| Administrador     | Administrador adiciona, edita ou remove produtos | 1. Administrador acessa painel → 2. Seleciona ação → 3. Sistema atualiza cadastro | Produto com dados incompletos |
| Processar Pagamento | Sistema de Pagamento | Sistema realiza pagamento do pedido       | 1. Cliente envia dados de pagamento → 2. Sistema confirma → 3. Sistema atualiza pedido | Pagamento recusado |
| Entregar Pedido   | Transportadora    | Transportadora registra entrega           | 1. Pedido enviado → 2. Cliente recebe confirmação | Entrega atrasada |

---

# Protótipos de Tela
- Tela de login/cadastro  
- Tela de listagem de produtos  
- Tela de detalhe do produto  
- Tela de carrinho e finalização de pedido  
- Tela de administração (painel do administrador)  

Exemplo de inserção de imagem:  
`![Protótipo Tela Login](caminho/tela_login.png)`

---

# Modelo de Domínio
Tabela das entidades:

| **Classe**       | **Atributos principais**                          | **Relacionamentos**                     |
|-----------------|--------------------------------------------------|----------------------------------------|
| Cliente          | id, nome, email, senha, endereço                 | Faz Pedido, Avalia Produto             |
| Produto          | id, nome, descrição, preço, estoque              | Pertence a Categoria, Recebe Avaliação |
| Categoria        | id, nome                                         | Agrupa Produtos                         |
| Pedido           | id, data, status, total                          | Feito por Cliente, Contém Itens         |
| ItemPedido       | quantidade, subtotal                              | Refere-se a Produto                     |
| Pagamento        | id, tipo, status, data                            | Relacionado a Pedido                    |
| Entrega          | id, status, data prevista, transportadora        | Relacionada a Pedido                    |
| Avaliação        | nota, comentário                                 | Feita por Cliente, Refere-se a Produto |
| Administrador    | id, nome, email                                  | Gerencia Produtos e Categorias          |

Exemplo de diagrama de domínio:  
`![Modelo de Domínio](caminho/modelo_dominio.png)`

---

# Diagramas de Classes

- O diagrama de classes representa todas as entidades do sistema, seus atributos, métodos e relacionamentos.

-Anexado no arquivo .zip

> **Descrição resumida do diagrama de classes:**
> - **Cliente:** id, nome, email, senha, endereço; métodos: realizarPedido(), avaliarProduto().  
> - **Produto:** id, nome, descrição, preço, estoque; métodos: atualizarEstoque(), calcularDesconto().  
> - **Categoria:** id, nome; métodos: adicionarProduto(), removerProduto().  
> - **Pedido:** id, data, status, total; métodos: calcularTotal(), atualizarStatus().  
> - **ItemPedido:** quantidade, subtotal; métodos: calcularSubtotal().  
> - **Pagamento:** id, tipo, status, data; métodos: processarPagamento(), atualizarStatus().  
> - **Entrega:** id, status, dataPrevista, transportadora; métodos: atualizarStatusEntrega().  
> - **Avaliação:** nota, comentário; métodos: publicarAvaliação().  
> - **Administrador:** id, nome, email; métodos: gerenciarProdutos(), gerenciarCategorias().  

---

# Diagramas de Sequência

- Abaixo estão os diagramas de sequência para os fluxos principais do sistema. Substitua os caminhos pelas imagens finais.

### Login
Anexado no arquivo .zip

### Pedido
Anexado no arquivo .zip

### Pagamento
Anexado no arquivo .zip

### Avaliação de Produto
Anexado no arquivo .zip

### Entrega
Anexado no arquivo .zip


> **Observação:**  
> Cada diagrama de sequência mostra a interação entre atores e objetos do sistema para cada fluxo principal, seguindo a ordem temporal das mensagens.

---

# Conclusão

- O sistema **Livraria Maria** foi desenvolvido com foco em atender tanto os clientes quanto os administradores, garantindo funcionalidades de cadastro, pedidos, pagamentos, avaliações e entrega de produtos.  
- **Pontos fortes:**  
  - Estrutura clara e modular.  
  - Facilidade de uso para clientes e administradores.  
  - Integração com serviços externos de pagamento e entrega.  
- **Sugestões de melhorias futuras:**  
  - Implementar notificações por email ou SMS para status de pedidos.  
  - Adicionar sistema de recomendações baseado em histórico de compras e avaliações.  
  - Desenvolver painel de análise de vendas e comportamento dos clientes.

---

# Referências

- PlantUML: [https://plantuml.com/](https://plantuml.com/)   
- Markdown Preview Enhanced: [https://shd101wyy.github.io/markdown-preview-enhanced/](https://shd101wyy.github.io/markdown-preview-enhanced/)  
- Material de apoio do Mackenzie – disciplina de Sistemas de Informação  

