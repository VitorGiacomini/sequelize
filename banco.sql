create table usuarios(
	usuario_id serial,
	usuario_nickname varchar(30) not null,
	usuario_nome varchar(100) not null,
	primary key(usuario_id)
);