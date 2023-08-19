# ShopZone
:credit_card: Online shop made with TypeScript and Django Rest Framework

git clone https://github.com/agustfricke/ShopZone.git
cd ShopZone/ShopZone

python3 -m venv env
source env/bin/activate

pip install -r requirements.txt

python3 manage.py migrate

mkdir dist
mkdir dist/static

python3 manage.py createsuperuser
python3 manage.py runserver

cd frontend
npm i
npm run dev

http://localhost:5173/


