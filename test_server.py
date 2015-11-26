from bottle import route, run, static_file

@route('/hello')
def hello():
    return "Hello World!"

@route('')
def index():
	return static_file("index.html", root="./")

@route('<file:path>')
def js_serve(file):
	return static_file(file, root="./")

run(host='localhost', port=8080, debug=True)