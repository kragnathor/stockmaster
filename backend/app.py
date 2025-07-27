from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return jsonify({'mensaje': 'Bienvenido a StockMaster API'})

@app.route('/productos')
def get_productos():
    productos = [
        {'id': 1, 'nombre': 'Azúcar 1 kg', 'stock': 25},
        {'id': 2, 'nombre': 'Harina 1 kg', 'stock': 15},
        {'id': 3, 'nombre': 'Arroz 1 kg', 'stock': 30}
    ]
    return jsonify(productos)

if __name__ == '__main__':
    app.run(debug=True)
