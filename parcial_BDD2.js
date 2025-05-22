db.cafes.insertMany([
    {_id: 1, tipo: 'espresso', ingredientes: ['vainilla-canela', 'chocolate', 'caramelo'], peso: 100,
        intensidad: 'baja', precio: [{efectivo: 500, trajeta: 550}], leche: true,
        tostador: {localidad: 'San justo', nombre: 'Lucila', cuit: 2546739201}
    },
    {_id: 2, tipo: 'filtrado', ingredientes: ['chocolate'], peso: 150, 
        intensidad: 'alta', precio: [{efectivo: 400, trajeta: 450}], leche: true,
        tostador: {localidad: 'San juan', nombre: 'Micaela', cuit: 2544909201}
    },
    {_id: 3, tipo:'cold brew', ingredientes: ['caramelo'], peso: 130,
        intensidad: 'baja', precio: [{efectivo: 300, trajeta: 350}], leche: true,
        tostador: {localidad: 'Palermo', nombre: 'Valeria', cuit: 2500739201}
    },
    {_id: 4, tipo: 'descafeinado', ingredientes: ['vainilla-canela'], peso: 200,
        intensidad: 'media', precio: [{efectivo: 600, trajeta: 650}], leche: false,
        tostador: {localidad: 'Caballito', nombre: 'Claudia', cuit: 3146739201}
    },
    {_id: 5, tipo: 'espresso', ingredientes: ['chocolate', 'caramelo'], peso: 110, 
        intensidad: 'alta', precio: [{efectivo: 410, trajeta: 460}], leche: true,
        tostador: {localidad: 'Belgrano', nombre: 'Paula', cuit: 2540239201}
    },
    {_id: 6, tipo: 'filtrado', ingredientes: ['chocolate', 'caramelo'], peso: 210, 
        intensidad: 'baja', precio: [{efectivo: 500, trajeta: 550}], leche: true,
        tostador: {localidad: 'San justo', nombre: 'Carla', cuit: 2046739201}
    },
    {_id: 7, tipo: 'cold brew', ingredientes: ['caramelo'], peso: 250,
        intensidad: 'media', precio: [{efectivo: 540, trajeta: 590}], leche: true,
        tostador: {localidad: 'Lugano', nombre: 'Cirila', cuit: 2246731001}
    },
    {_id: 8, tipo: 'descafeinado', ingredientes: ['vainilla-canela'], peso: 220, 
        intensidad: 'alta', precio: [{efectivo: 900, trajeta: 910}], leche: true,
        tostador: {localidad: 'Soldati', nombre: 'Maria', cuit: 946739201}
    },
    {_id: 9, tipo: 'espresso', ingredientes: ['chocolate'], peso: 180, 
        intensidad: 'baja', precio: [{efectivo: 500, trajeta: 550}], leche: true,
        tostador: {localidad: 'Lugano', nombre: 'Flor', cuit: 2096739201}
    },
    {_id: 10, tipo: 'descafeinado', ingredientes: ['vainilla-canela', 'chocolate', 'caramelo'], peso: 190,
        intensidad: 'media', precio: [{efectivo: 100, trajeta: 150}], leche: false,
        tostador: {localidad: 'San justo', nombre: 'Luis', cuit: 254673921}
    }
])
//1. Crear el script .js con la creación de la base de datos y las colecciones.
//2. Buscar cuántos cafés contienen chocolate entre sus ingredientes.
db.cafes.find({ingredientes: 'chocolate'})

//3. Buscar cuántos cafés son de tipo “cold brew”· y contienen “vainilla” entre sus ingredientes.
db.cafes.find({tipo: 'cold brew', ingredientes: 'vainilla-canela'})

//4. Listar tipo y peso de los cafés que tienen una intensidad “media”.
db.cafes.find({intensidad: 'media'}, {_id:0, tipo: 1, peso:1})

//5. Obtener tipo, peso e intensidad de los cafés cuyo peso se encuentre entre 200 y 260 inclusive.
db.cafes.find({peso: {$gte: 200, $lte: 260}}, {_id:0, tipo:1, peso:1, intensidad:1})

//6. Mostrar los cafés que fueron tostados en localidades que contengan “san”, permitiendo buscar por “san” y que se muestren también los de “santos”, “san justo”, etc. Ordenar el resultado por peso de manera descendente.
db.cafes.find({'tostador.localidad': /san/i}, {_id:0, tipo:1, peso:1}).sort({peso:-1})

//7. Mostrar la sumar del peso de cada tipo de Café.
db.cafes.aggregate([{$group: { _id: '$tipo', total_peso: {$sum: '$peso'}}}])

//8. Agregar el ingrediente “whisky” todos los cafés cuya intensidad es alta.
db.cafes.updateMany({intensidad: 'alta'}, {$push: {ingredientes: 'wisky'}})

//9. Sumarle 10 al peso de los cafés cuyo peso se encuentre entre 200 y 260 inclusive.
db.cafes.updateMany({peso: {$gte: 200, $lte: 260}}, {$inc: {peso: 10}})

//10. Eliminar los cafés cuyo peso sea menor o igual a 210.
db.cafes.deleteMany({peso: {$lte: 210}})
