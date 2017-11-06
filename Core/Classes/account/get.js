var m = function (__account, __db_client, __cb){
	if(!__account.is_admin) delete(__account.is_admin);
	// response
	__cb(__account);
}


module.exports = m;