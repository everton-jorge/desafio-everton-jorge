class CaixaDaLanchonete {

  constructor() {
    this.cardapio = {
      cafe: { valor: 3.0 },
      chantily: { valor: 1.5, principal: 'cafe' },
      suco: { valor: 6.2 },
      sanduiche: { valor: 6.5 },
      queijo: { valor: 2.0, principal: 'sanduiche' },
      salgado: { valor: 7.25 },
      combo1: { valor: 9.5 },
      combo2: { valor: 7.5 },
    };

    this.pagamentos = {
      dinheiro: { taxa: 0, desconto: 5 },
      credito: { taxa: 3, desconto: 0 },
      debito: { taxa: 0, desconto: 0 },
    }
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    if (!itens.length) return "Não há itens no carrinho de compra!";

    const carrinho = itens.map((item) => {
      const [codigo, quantidade] = item.split(',');
      return { codigo, quantidade };
    });

    let valorTotal = 0;

    for (const itemCarrinho of carrinho) {

      if (itemCarrinho.quantidade == 0) return "Quantidade inválida!";
      if (!this.cardapio[itemCarrinho.codigo]) return "Item inválido!";

      const codigoPrincipal = this.cardapio[itemCarrinho.codigo]?.principal;
      const itemPrincipalEstaNoCarinho = carrinho.find(i => i.codigo == codigoPrincipal);

      if (codigoPrincipal && !itemPrincipalEstaNoCarinho)
        return "Item extra não pode ser pedido sem o principal";

      valorTotal += this.cardapio[itemCarrinho.codigo].valor * itemCarrinho.quantidade;
    }

    const pagamento = this.pagamentos[metodoDePagamento];
    if (!pagamento) return "Forma de pagamento inválida!";

    const { desconto, taxa } = pagamento;

    const valorDesconto = desconto / 100 * valorTotal;
    const valorTaxa = taxa / 100 * valorTotal;

    valorTotal = valorTotal + valorTaxa - valorDesconto;

    return `R$ ${valorTotal.toFixed(2)}`.replace('.', ',');
  }
}

export { CaixaDaLanchonete };
