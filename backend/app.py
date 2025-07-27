from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
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

@app.route('/productos')
def get_productos():
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)  # devuelve dicts en vez de tuplas
        cur.execute('SELECT id, nombre, stock FROM productos')
        productos = cur.fetchall()
        cur.close()
        conn.close()

        return jsonify(productos)

    except Exception as e:
        print("ERROR AL CONSULTAR PRODUCTOS:", e)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
