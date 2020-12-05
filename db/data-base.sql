CREATE TABLE clientes(
    id INT GENERATED ALWAYS AS IDENTITY,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    correo TEXT NOT NULL,
    telefono TEXT,
    cedula INT,

 PRIMARY KEY(id)
);

CREATE TABLE empresas(
    id INT GENERATED ALWAYS AS IDENTITY,
    nombre TEXT NOT NULL,
    nit TEXT NOT NULL,
    telefono TEXT NOT NULL,
    correo TEXT NOT NULL,
    clienteId INT NOT NULL,

    PRIMARY KEY(id),
    CONSTRAINT fk_cliente FOREIGN KEY(clienteId) REFERENCES clientes(id)
);

CREATE TABLE usuarios(
    id INT GENERATED ALWAYS AS IDENTITY,
    usuario TEXT NOT NULL,
    contrasena TEXT NOT NULL,
    correo TEXT NOT NULL,
    empresaId INT NOT NULL,

    PRIMARY KEY(id),
    CONSTRAINT fk_empresa FOREIGN KEY(empresaId) REFERENCES empresas(id)
);

CREATE TABLE parking(
    id INT GENERATED ALWAYS AS IDENTITY,
    id_empresa INT NOT NULL,
    nombre TEXT NOT NULL,
    direccion TEXT NOT NULL,
    correo TEXT NOT NULL,
    logo TEXT NOT NULL,

    PRIMARY KEY(id),
    CONSTRAINT fk_cliente FOREIGN KEY(id_empresa) REFERENCES empresas(id)
);
CREATE TABLE vehicles(
    id INT GENERATED ALWAYS AS IDENTITY,
    vehicle INT NOT NULL,
    placa TEXT NOT NULL,
    fecha DATE NOT NULL,
    hour TIME NOT NULL,
    hour2 TIME,
    total INT NOT NULL DEFAULT 0,
    comentario TEXT,
    pay boolean NOT NULL,
    
    PRIMARY KEY(id)
);

CREATE TABLE transports( 
    id INT GENERATED ALWAYS AS IDENTITY,
    vehicle TEXT NOT NULL,

    PRIMARY KEY(id)
);

CREATE TABLE tariffs(
    id INT GENERATED ALWAYS AS IDENTITY,
    id_transport INT NOT NULL,
    fraccion INT NOT NULL,
    half INT NOT NULL,
    hour INT NOT NULL,

    PRIMARY KEY(id),
    CONSTRAINT fk_transport FOREIGN KEY(id_transport) REFERENCES transports(id)
);


INSERT INTO transports(vehicle) VALUES('Automovil');
INSERT INTO transports(vehicle) VALUES('Motocicleta');
INSERT INTO transports(vehicle) VALUES('Otro');

INSERT INTO tariffs(id_transport, fraccion, half, hour) VALUES(1, 1000, 1500, 2500);


select * from vehicles
where fecha > now() - interval '26 week';

select * from vehicles
where fecha > now() - interval '4 week';

select * from vehicles
where fecha = current_date;