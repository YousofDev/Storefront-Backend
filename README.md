### StoreFrontBackend Project

### Scripts

- Dev: 'npm run dev'
- Build: 'npm run build'
- Start: 'npm run start'
- Tests: 'npm run test'
- Lint: 'npm run lint'
- Fix: 'npm run fix'
- Format: 'npm run format'
- Remove Build Folder: 'npm run clean'
- Migration Dev Up: 'npm run mdevup'
- Migration Dev Down: 'npm run mdevdown'
- Migration Test Up: 'npm run mtestup'
- Migration Test Down: 'npm run mtestdown'

### Backend Ports:

- Server will run on PORT<3000> => http://localhost:3000/
- Database will run on PORT<5432> => postgresql://localhost:5432

### Steps To Setup the Project Correctly:

## 1- Create Two Postgres Database:

- First Database For development => Name: storefrontbackend
- Second Database For Testing => Name: storefrontbackendtest
- User: postgres
- Password: 1234

## 2- Install Nodejs Dependencies:

- Dependencies Installation: npm install
- DevDependencies Installation: npm install --save-dev

## 3- Run Migrations For Development:

- For Creating Tables: npm run mdevup
- For Drop Tables: npm run mdevdown

## 4- Starting The Application:

- Dev Mode: npm run dev
- Build Mode: npm run start

## 5- Runing Tests:

- npm run test
