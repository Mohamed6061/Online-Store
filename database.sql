-- cat database.sql | C:\xampp\mysql\bin\mysql.exe -uroot ==> run this command
-- Create the database
-- Drop DATABASE online_store;
CREATE DATABASE online_store;

-- Use the database
USE online_store;

-- Create the Users table
CREATE TABLE Users (
    id INT NOT NULL AUTO_INCREMENT ,
    name VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(150) NOT NULL ,
    PRIMARY KEY (id)
);

-- Create the Products table
CREATE TABLE Products (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(200),
    PRIMARY KEY (id)
);

-- Create the Orders table
CREATE TABLE Orders (
    id INT NOT NULL AUTO_INCREMENT,
    userId INT NOT NULL,
    status VARCHAR(20) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
);
-- Create the Order Items table
CREATE TABLE OrderItems (
    id INT NOT NULL AUTO_INCREMENT,
    orderId INT NOT NULL,
    productId INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (orderId) REFERENCES orders(id),
    FOREIGN KEY (productId) REFERENCES products(id)
);
