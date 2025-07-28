from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
from dotenv import load_dotenv
import os

# Cargar variables de entorno desde el archivo .env
load_dotenv()

app = Flask(__name__)
CORS(app)

# Función para conectarse a la base de datos PostgreSQL
def get_db_connection():
    conn = psycopg2.connect(
        dbname=os.getenv('DB_NAME'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        host=os.getenv('DB_HOST'),
        port=os.getenv('DB_PORT')
    )
    conn.set_client_encoding('UTF8')
    return conn

@app.route('/')
def home():
    return jsonify({'mensaje': 'Bienvenido a StockMaster API'})

@app.route('/productos', methods=['GET'])
def get_productos():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT id, nombre, stock FROM productos')
        rows = cur.fetchall()
        cur.close()
        conn.close()

        productos = [{'id': r[0], 'nombre': r[1], 'stock': r[2]} for r in rows]
        return jsonify(productos)

    except Exception as e:
        print("ERROR AL CONSULTAR PRODUCTOS:", e)
        return jsonify({'error': str(e)}), 500

@app.route('/productos', methods=['POST'])
def add_producto():
    try:
        data = request.get_json()
        nombre = data['nombre']
        stock = data['stock']

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('INSERT INTO productos (nombre, stock) VALUES (%s, %s) RETURNING id', (nombre, stock))
        new_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()

        return jsonify({'id': new_id, 'nombre': nombre, 'stock': stock})

    except Exception as e:
        print("ERROR AL AGREGAR PRODUCTO:", e)
        return jsonify({'error': str(e)}), 500

@app.route('/productos/<int:id>', methods=['PUT'])
def update_producto(id):
    try:
        data = request.get_json()
        nuevo_stock = data['stock']

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('UPDATE productos SET stock = %s WHERE id = %s RETURNING id, nombre, stock', (nuevo_stock, id))
        updated = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()

        if updated:
            return jsonify({'id': updated[0], 'nombre': updated[1], 'stock': updated[2]})
        else:
            return jsonify({'error': 'Producto no encontrado'}), 404

    except Exception as e:
        print("ERROR AL ACTUALIZAR PRODUCTO:", e)
        return jsonify({'error': str(e)}), 500

@app.route('/productos/<int:id>', methods=['DELETE'])
def delete_producto(id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('DELETE FROM productos WHERE id = %s', (id,))
        conn.commit()
        cur.close()
        conn.close()

        return jsonify({'mensaje': 'Producto eliminado correctamente'})

    except Exception as e:
        print("ERROR AL ELIMINAR PRODUCTO:", e)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
