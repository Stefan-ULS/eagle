from flask import Flask, render_template
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('homepage.html')

@app.route('/eagles-team')
def team_page():
    API_URL = 'http://127.0.0.1:5000/api/users'
    API_KEY_USER_DATA = "API_987654321" 
    API_USER_HEADER = {
        "Authorization": API_KEY_USER_DATA
    }
    try:
        get_users_data = requests.get(API_URL, headers=API_USER_HEADER)
        if get_users_data.status_code != 200:
            return f"Error fetching users data: Status code {get_users_data.status_code}", 500
        users_data = get_users_data.json()
        print(users_data)
    except requests.RequestException as e:
        return f"Error fetching user data: {e}", 500
    
    return render_template('team.html', team=users_data)


if __name__ == '__main__':
    app.run( debug=True, port=8080)
