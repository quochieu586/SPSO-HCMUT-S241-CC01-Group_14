# A. Project Branches

In this repository, we develop two versions: **backend-free version** (branch `main`) and **fully-implemtented application** (branch `SPSS-Backend-Available-Version`).

## Backend-free application 

- We use hardcode for the logic's implementation. 
- This version is avaiable in the branch `main` in this project. This is the default branch in this project.

## Fully-implemtented application

- In this version, along with this Frontend application, you need to start our Backend application, which is avaiable in [CC01-Group-14-Backend](https://github.com/NhtJm/SPSO-HCMUT-S241-CC01-Group_14/tree/main).
- This version is avaiable in the branch `SPSS-Backend-Available-Version`, where to need to use `git checkout` and `pull` code for this branch.
- Please follow the detail tutorial of the repository in [README.md](https://github.com/NhtJm/SPSO-HCMUT-S241-CC01-Group_14/blob/main/README.md) to run the program. 
- You need to wait for Backend successfully connect to MongoDB to use its service.

# B. How to run the application ?

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

After cloning the repo, to run the web, please make sure you have `npm` installation already.

## Running Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `serve -s build`

Runs the optimization version of app after `npm run build`.\
The page need to be re-built to see the changes you make, hence, it is used for final review but not for coding phrase.