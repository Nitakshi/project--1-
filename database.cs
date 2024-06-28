using System;
using System.Data.SqlClient;

namespace DatabaseCreationExample
{
    class Program
    {
        static void Main(string[] args)
        {
            string connectionString = "Server=your_server_name;Integrated Security=true;"; // Adjust your connection string
            string databaseName = "ShopEasy";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                // Create Database
                string createDbQuery = $"CREATE DATABASE {databaseName}";
                using (SqlCommand createDbCommand = new SqlCommand(createDbQuery, connection))
                {
                    createDbCommand.ExecuteNonQuery();
                    Console.WriteLine("Database created successfully.");
                }

                // Connect to the newly created database
                connection.ChangeDatabase(databaseName);

                // Create a table
                string createTableQuery = @"
                    CREATE TABLE Products (
                        Id INT PRIMARY KEY IDENTITY(1,1),
                        Name NVARCHAR(100) NOT NULL,
                        Price DECIMAL(18, 2) NOT NULL,
                        Quantity INT NOT NULL
                    )";

                using (SqlCommand createTableCommand = new SqlCommand(createTableQuery, connection))
                {
                    createTableCommand.ExecuteNonQuery();
                    Console.WriteLine("Table created successfully.");
                }
            }
        }
    }
}
