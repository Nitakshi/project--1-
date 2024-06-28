-- Create the database
CREATE DATABASE ShopEasy;
GO

-- Use the newly created database
USE ShopEasy;
GO

-- Create the Products table
CREATE TABLE Products (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Price DECIMAL(18, 2) NOT NULL,
    Quantity INT NOT NULL
);
GO
