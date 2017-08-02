function PagamentoDAOComp(connection){
  this._connection = connection
}

PagamentoDAOComp.prototype.salva = function(pagamento,callback){
  this._connection.query('INSERT INTO pagamentos SET ?', pagamento, callback)
}

PagamentoDAOComp.prototype.lista = function(callback){
  this._connection.query('select * from pagamentos', callback)
}

PagamentoDAOComp.prototype.buscaPorId = function(id,callback){
  this._connection.query('select * from pagamentos where id = ?', [id], callback)
}

module.exports = function(){
  return PagamentoDAOComp;
}
