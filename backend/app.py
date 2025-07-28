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


# ---------- Rutas para Gestión de Ventas ----------

@app.route('/ventas', methods=['GET'])
def obtener_ventas():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT id, producto_id, cantidad, fecha, total FROM ventas')
        rows = cur.fetchall()
        cur.close()
        conn.close()

        ventas = [{
            'id': r[0],
            'producto_id': r[1],
            'cantidad': r[2],
            'fecha': r[3],
            'total': float(r[4])
        } for r in rows]
        return jsonify(ventas)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/ventas/<int:id>', methods=['GET'])
def obtener_venta(id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT id, producto_id, cantidad, fecha, total FROM ventas WHERE id = %s', (id,))
        row = cur.fetchone()
        cur.close()
        conn.close()

        if row:
            venta = {
                'id': row[0],
                'producto_id': row[1],
                'cantidad': row[2],
                'fecha': row[3],
                'total': float(row[4])
            }
            return jsonify(venta)
        else:
            return jsonify({'error': 'Venta no encontrada'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/ventas', methods=['POST'])
def crear_venta():
    try:
        data = request.get_json()
        producto_id = data['producto_id']
        cantidad = data['cantidad']
        fecha = data['fecha']
        total = data['total']

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            'INSERT INTO ventas (producto_id, cantidad, fecha, total) VALUES (%s, %s, %s, %s) RETURNING id',
            (producto_id, cantidad, fecha, total)
        )
        nueva_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()

        return jsonify({'id': nueva_id}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/ventas/<int:id>', methods=['PUT'])
def actualizar_venta(id):
    try:
        data = request.get_json()
        producto_id = data['producto_id']
        cantidad = data['cantidad']
        fecha = data['fecha']
        total = data['total']

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            'UPDATE ventas SET producto_id = %s, cantidad = %s, fecha = %s, total = %s WHERE id = %s',
            (producto_id, cantidad, fecha, total, id)
        )
        conn.commit()
        cur.close()
        conn.close()

        return jsonify({'mensaje': 'Venta actualizada correctamente'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/ventas/<int:id>', methods=['DELETE'])
def eliminar_venta(id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('DELETE FROM ventas WHERE id = %s', (id,))
        conn.commit()
        cur.close()
        conn.close()

        return jsonify({'mensaje': 'Venta eliminada correctamente'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ---------- Rutas para Gestión de Proveedores ----------

@app.route('/proveedores', methods=['GET'])
def obtener_proveedores():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT id, nombre, contacto, telefono, email FROM proveedores')
        rows = cur.fetchall()
        cur.close()
        conn.close()

        proveedores = [{
            'id': r[0],
            'nombre': r[1],
            'contacto': r[2],
            'telefono': r[3],
            'email': r[4]
        } for r in rows]
        return jsonify(proveedores)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/proveedores', methods=['POST'])
def crear_proveedor():
    try:
        data = request.get_json()
        nombre = data['nombre']
        contacto = data['contacto']
        telefono = data['telefono']
        email = data['email']

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            'INSERT INTO proveedores (nombre, contacto, telefono, email) VALUES (%s, %s, %s, %s) RETURNING id',
            (nombre, contacto, telefono, email)
        )
        nuevo_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()

        return jsonify({'id': nuevo_id}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/proveedores/<int:id>', methods=['PUT'])
def actualizar_proveedor(id):
    try:
        data = request.get_json()
        nombre = data['nombre']
        contacto = data['contacto']
        telefono = data['telefono']
        email = data['email']

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            'UPDATE proveedores SET nombre = %s, contacto = %s, telefono = %s, email = %s WHERE id = %s',
            (nombre, contacto, telefono, email, id)
        )
        conn.commit()
        cur.close()
        conn.close()

        return jsonify({'mensaje': 'Proveedor actualizado correctamente'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/proveedores/<int:id>', methods=['DELETE'])
def eliminar_proveedor(id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('DELETE FROM proveedores WHERE id = %s', (id,))
        conn.commit()
        cur.close()
        conn.close()

        return jsonify({'mensaje': 'Proveedor eliminado correctamente'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)