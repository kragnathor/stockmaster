from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Base de datos temporal (en memoria)
productos = [
    {'id': 1, 'nombre': 'Azúcar 1 kg', 'stock': 25},
    {'id': 2, 'nombre': 'Harina 1 kg', 'stock': 15},
    {'id': 3, 'nombre': 'Arroz 1 kg', 'stock': 30}
]

@app.route('/')
def home():
    return jsonify({'mensaje': 'Bienvenido a StockMaster API'})

@app.route('/productos', methods=['GET'])
def get_productos():
    return jsonify(productos)

@app.route('/productos', methods=['POST'])
def crear_producto():
    nuevo = request.get_json()
    nuevo['id'] = max(p['id'] for p in productos) + 1 if productos else 1
    productos.append(nuevo)
    return jsonify(nuevo), 201

@app.route('/productos/<int:id>', methods=['PUT'])
def editar_producto(id):
    data = request.get_json()
    for producto in productos:
        if producto['id'] == id:
            producto['nombre'] = data.get('nombre', producto['nombre'])
            producto['stock'] = data.get('stock', producto['stock'])
            return jsonify(producto)
    return jsonify({'error': 'Producto no encontrado'}), 404

@app.route('/productos/<int:id>', methods=['DELETE'])
def eliminar_producto(id):
    global productos
    productos = [p for p in productos if p['id'] != id]
    return jsonify({'mensaje': f'Producto {id} eliminado'})

if __name__ == '__main__':
    app.run(debug=True)

